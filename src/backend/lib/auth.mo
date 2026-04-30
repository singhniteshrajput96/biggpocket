import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import AuthTypes "../types/auth";
import LoanTypes "../types/loans";
import Common "../types/common";

module {
  public func generateOTP(
    mobile : Text,
    otps : Map.Map<Text, AuthTypes.OTPEntry>,
    now : Common.Timestamp
  ) : Text {
    // 6-digit pseudo-random: use abs(now) mod 900000 + 100000 to guarantee 6 digits
    // CRITICAL: use Nat.toText — NOT debug_show, which inserts underscores like "568_230"
    let seed = Int.abs(now) % 900000 + 100000;
    let code = seed.toText();
    otps.add(mobile, { mobile; otp = code; created_at = now });
    code
  };

  public func validateOTP(
    mobile : Text,
    otp : Text,
    otps : Map.Map<Text, AuthTypes.OTPEntry>
  ) : Bool {
    // OTPs are stored as plain digits only — direct equality check
    // Strip any accidental non-digit chars from input for safety
    let digitsOnly = func(s : Text) : Text {
      s.foldLeft("", func(acc : Text, c : Char) : Text {
        if (c >= '0' and c <= '9') { acc # Text.fromChar(c) } else { acc }
      })
    };
    switch (otps.get(mobile)) {
      case (?entry) { entry.otp == digitsOnly(otp) };
      case null { false };
    }
  };

  public func generateToken(userId : Common.UserId, now : Common.Timestamp) : Common.Token {
    // CRITICAL: use Nat.toText / Int.toText — NOT debug_show, which inserts underscores
    "tok_" # userId.toText() # "_" # Int.abs(now).toText()
  };

  public func resolveSession(
    token : Common.Token,
    sessions : Map.Map<Common.Token, AuthTypes.Session>
  ) : ?AuthTypes.Session {
    sessions.get(token)
  };

  public func findOrCreateUser(
    mobile : Text,
    users : List.List<AuthTypes.User>,
    nextId : Nat,
    now : Common.Timestamp
  ) : (AuthTypes.User, Bool) {
    switch (users.find(func(u : AuthTypes.User) : Bool { Text.equal(u.mobile_number, mobile) })) {
      case (?existing) { (existing, false) };
      case null {
        let newUser : AuthTypes.User = {
          id = nextId;
          name = "User " # mobile;
          mobile_number = mobile;
          role = #user;
          user_type = "internal";   // default all new users to internal
          created_at = now;
        };
        users.add(newUser);
        (newUser, true)
      };
    }
  };

  // Returns the user if token is valid and user has admin role, else #err
  public func requireAdmin(
    token : Common.Token,
    sessions : Map.Map<Common.Token, AuthTypes.Session>,
    users : List.List<AuthTypes.User>
  ) : { #ok : AuthTypes.User; #err : Text } {
    switch (sessions.get(token)) {
      case null { #err("Invalid or expired session") };
      case (?session) {
        switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, session.userId) })) {
          case null { #err("User not found") };
          case (?user) {
            switch (user.role) {
              case (#admin) { #ok(user) };
              case (#user) { #err("Access denied: admin role required") };
            }
          };
        }
      };
    }
  };

  // Returns the user if token is valid, else #err
  public func requireUser(
    token : Common.Token,
    sessions : Map.Map<Common.Token, AuthTypes.Session>,
    users : List.List<AuthTypes.User>
  ) : { #ok : AuthTypes.User; #err : Text } {
    switch (sessions.get(token)) {
      case null { #err("Invalid or expired session") };
      case (?session) {
        switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, session.userId) })) {
          case null { #err("User not found") };
          case (?user) { #ok(user) };
        }
      };
    }
  };

  // Strips mobile_number — safe for public API exposure; includes user_type
  public func toPublicUser(user : AuthTypes.User) : AuthTypes.PublicUser {
    { id = user.id; name = user.name; role = user.role; user_type = user.user_type }
  };

  // Returns all users without mobile numbers
  public func getAllPublicUsers(users : List.List<AuthTypes.User>) : [AuthTypes.PublicUser] {
    users.map<AuthTypes.User, AuthTypes.PublicUser>(func(u) { toPublicUser(u) }).toArray()
  };

  // Returns a single user without mobile number
  public func getUserById(id : Nat, users : List.List<AuthTypes.User>) : ?AuthTypes.PublicUser {
    switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, id) })) {
      case (?u) { ?toPublicUser(u) };
      case null { null };
    }
  };

  // Update a user's type (internal/external). Requires admin token.
  public func adminUpdateUserType(
    token : Common.Token,
    userId : Nat,
    userType : Text,
    sessions : Map.Map<Common.Token, AuthTypes.Session>,
    users : List.List<AuthTypes.User>
  ) : { #ok : AuthTypes.PublicUser; #err : Text } {
    switch (requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        if (not (Text.equal(userType, "internal") or Text.equal(userType, "external"))) {
          return #err("Invalid user_type: must be 'internal' or 'external'")
        };
        switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, userId) })) {
          case null { #err("User not found") };
          case (?_) {
            users.mapInPlace(func(u : AuthTypes.User) : AuthTypes.User {
              if (Nat.equal(u.id, userId)) { { u with user_type = userType } } else { u }
            });
            switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, userId) })) {
              case (?updated) { #ok(toPublicUser(updated)) };
              case null { #err("User not found after update") };
            }
          };
        }
      };
    }
  };

  // Delete a user. Requires admin token and NO active loan assignments.
  public func adminDeleteUser(
    token : Common.Token,
    userId : Nat,
    sessions : Map.Map<Common.Token, AuthTypes.Session>,
    users : List.List<AuthTypes.User>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>
  ) : { #ok : (); #err : Text } {
    switch (requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        // Prevent deleting self (the admin performing this action)
        switch (sessions.get(token)) {
          case null { #err("Invalid or expired session") };
          case (?session) {
            if (Nat.equal(session.userId, userId)) {
              return #err("Cannot delete your own account")
            };
            // Verify user exists
            switch (users.find(func(u : AuthTypes.User) : Bool { Nat.equal(u.id, userId) })) {
              case null { #err("User not found") };
              case (?_) {
                // Check for active loan assignments
                let hasActiveAssignments = switch (loanAssignments.find(
                  func(a : LoanTypes.LoanAssignment) : Bool { Nat.equal(a.user_id, userId) }
                )) {
                  case (?_) { true };
                  case null { false };
                };
                if (hasActiveAssignments) {
                  #err("Cannot delete user with active loan assignments. Please reassign or remove their loans first.")
                } else {
                  // Filter the users list to remove the target user, then replace in-place
                  let usersFiltered = users.filter(
                    func(u : AuthTypes.User) : Bool { not Nat.equal(u.id, userId) }
                  );
                  users.clear();
                  users.append(usersFiltered);
                  #ok(())
                }
              };
            }
          };
        }
      };
    }
  };
};
