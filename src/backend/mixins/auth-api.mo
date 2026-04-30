import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import LoanTypes "../types/loans";
import Common "../types/common";

mixin (
  users : List.List<AuthTypes.User>,
  sessions : Map.Map<Common.Token, AuthTypes.Session>,
  otps : Map.Map<Text, AuthTypes.OTPEntry>,
  nextUserIdRef : [var Nat],
  loanAssignments : List.List<LoanTypes.LoanAssignment>
) {
  public func sendOTP(mobile : Text) : async Text {
    let now = Time.now();
    let code = AuthLib.generateOTP(mobile, otps, now);
    // Simulated OTP — return it directly (no SMS gateway)
    code
  };

  public func adminCreateUser(
    token : Text,
    name : Text,
    mobile : Text,
    role : Text
  ) : async {
    #ok : AuthTypes.PublicUser;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        // Check for duplicate mobile
        switch (users.find(func(u : AuthTypes.User) : Bool { Text.equal(u.mobile_number, mobile) })) {
          case (?_) { #err("A user with this mobile number already exists") };
          case null {
            let now = Time.now();
            let userRole : Common.Role = if (Text.equal(role, "admin")) { #admin } else { #user };
            let newUser : AuthTypes.User = {
              id = nextUserIdRef[0];
              name = name;
              mobile_number = mobile;
              role = userRole;
              user_type = "internal";   // all newly created users default to internal
              created_at = now;
            };
            users.add(newUser);
            nextUserIdRef[0] += 1;
            #ok(AuthLib.toPublicUser(newUser))
          };
        }
      };
    }
  };

  public func adminGetAllUsers(token : Text) : async {
    #ok : [AuthTypes.PublicUser];
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) { #ok(AuthLib.getAllPublicUsers(users)) };
    }
  };

  public func adminGetUserById(token : Text, user_id : Nat) : async {
    #ok : ?AuthTypes.PublicUser;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) { #ok(AuthLib.getUserById(user_id, users)) };
    }
  };

  public func adminUpdateAdminMobile(token : Text, new_mobile : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(admin)) {
        // Ensure new_mobile is not already taken by another user
        switch (users.find(func(u : AuthTypes.User) : Bool {
          Text.equal(u.mobile_number, new_mobile) and not (u.id == admin.id)
        })) {
          case (?_) { #err("Mobile number already in use by another user") };
          case null {
            users.mapInPlace(func(u : AuthTypes.User) : AuthTypes.User {
              if (u.id == admin.id) {
                { u with mobile_number = new_mobile }
              } else { u }
            });
            #ok("Mobile number updated successfully")
          };
        }
      };
    }
  };

  // Update a user's type: "internal" or "external" (admin only)
  public func adminUpdateUserType(token : Text, userId : Nat, userType : Text) : async {
    #ok : AuthTypes.PublicUser;
    #err : Text;
  } {
    AuthLib.adminUpdateUserType(token, userId, userType, sessions, users)
  };

  // Delete a user — blocked if user has any active loan assignments
  public func adminDeleteUser(token : Text, userId : Nat) : async {
    #ok : ();
    #err : Text;
  } {
    AuthLib.adminDeleteUser(token, userId, sessions, users, loanAssignments)
  };

  public func verifyOTP(mobile : Text, otp : Text) : async {
    #ok : { token : Common.Token; userId : Common.UserId; role : Text; name : Text };
    #err : Text;
  } {
    if (not AuthLib.validateOTP(mobile, otp, otps)) {
      return #err("Invalid OTP");
    };
    let now = Time.now();
    let (user, isNew) = AuthLib.findOrCreateUser(mobile, users, nextUserIdRef[0], now);
    if (isNew) {
      nextUserIdRef[0] += 1;
    };
    otps.remove(mobile);
    let token = AuthLib.generateToken(user.id, now);
    sessions.add(token, { token; userId = user.id });
    let roleText = switch (user.role) {
      case (#admin) { "admin" };
      case (#user) { "user" };
    };
    #ok({ token; userId = user.id; role = roleText; name = user.name })
  };
};
