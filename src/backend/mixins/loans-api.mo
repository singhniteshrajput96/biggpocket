import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import AuthLib "../lib/auth";
import LoanLib "../lib/loans";
import AuthTypes "../types/auth";
import LoanTypes "../types/loans";
import Common "../types/common";

mixin (
  users : List.List<AuthTypes.User>,
  sessions : Map.Map<Common.Token, AuthTypes.Session>,
  loans : List.List<LoanTypes.LoanApplication>,
  loanHistory : List.List<LoanTypes.LoanStageHistory>,
  loanAssignments : List.List<LoanTypes.LoanAssignment>,
  documents : List.List<LoanTypes.Document>,
  nextLoanIdRef : [var Nat],
  nextHistoryIdRef : [var Nat],
  nextAssignmentIdRef : [var Nat],
  nextDocumentIdRef : [var Nat]
) {
  public func getMyLoans(token : Text) : async {
    #ok : [LoanTypes.LoanWithHistory];
    #err : Text;
  } {
    switch (AuthLib.requireUser(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        #ok(LoanLib.getLoansForUser(loans, loanHistory, loanAssignments, user.id))
      };
    }
  };

  public func getLoanById(token : Text, loanId : Nat) : async {
    #ok : LoanTypes.LoanWithHistory;
    #err : Text;
  } {
    switch (AuthLib.requireUser(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        switch (loans.find(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
          case null { #err("Loan not found") };
          case (?loan) {
            let canAccess = switch (user.role) {
              case (#admin) { true };
              case (#user) {
                // Check direct assignment
                let direct = switch (loan.user_id) {
                  case (?uid) { Nat.equal(uid, user.id) };
                  case null { false };
                };
                if (direct) { true } else {
                  // Check many-to-many
                  switch (loanAssignments.find(
                    func(a : LoanTypes.LoanAssignment) : Bool {
                      Nat.equal(a.loan_id, loanId) and Nat.equal(a.user_id, user.id)
                    }
                  )) {
                    case (?_) { true };
                    case null { false };
                  }
                }
              };
            };
            if (not canAccess) {
              #err("Access denied")
            } else {
              #ok(LoanLib.getLoanWithHistory(loan, loanHistory, loanAssignments))
            }
          };
        }
      };
    }
  };

  public func adminCreateLoan(
    token : Text,
    applicantName : Text,
    bankName : Text,
    loanType : Text,
    loanAmount : Nat,
    mobile : Text,
    distributionPartner : Text,
    coApplicantName : Text,
    employmentType : Text,
    income : Nat,
    propertyType : Text,
    propertyValue : Nat
  ) : async { #ok : Nat; #err : Text } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(admin)) {
        let now = Time.now();
        let userId : ?Common.UserId = if (mobile.size() > 0) {
          switch (users.find(func(u : AuthTypes.User) : Bool { Text.equal(u.mobile_number, mobile) })) {
            case (?u) { ?u.id };
            case null { null };
          }
        } else { null };
        let loan = LoanLib.createLoan(
          loans, nextLoanIdRef[0], applicantName, bankName, loanType, loanAmount,
          userId, now, distributionPartner, coApplicantName, employmentType,
          income, propertyType, propertyValue
        );
        nextLoanIdRef[0] += 1;
        // Create initial stage history entry
        loanHistory.add({
          id = nextHistoryIdRef[0];
          loan_id = loan.id;
          stage_index = 0;
          stage_name = LoanLib.STAGE_NAMES[0];
          remarks = "Loan created";
          show_remarks_to_user = true;
          updated_by_admin_id = admin.id;
          timestamp = now;
        });
        nextHistoryIdRef[0] += 1;
        // If user found, also add many-to-many assignment
        switch (userId) {
          case (?uid) {
            loanAssignments.add({
              id = nextAssignmentIdRef[0];
              loan_id = loan.id;
              user_id = uid;
              assigned_at = now;
            });
            nextAssignmentIdRef[0] += 1;
          };
          case null {};
        };
        #ok(loan.id)
      };
    }
  };

  public func adminUpdateStage(
    token : Text,
    loanId : Nat,
    stageIndex : Nat,
    remarks : Text,
    showRemarks : Bool
  ) : async { #ok : (); #err : Text } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(admin)) {
        if (stageIndex > 9) {
          return #err("Invalid stage index: must be 0-9")
        };
        let now = Time.now();
        let success = LoanLib.updateStage(loans, loanHistory, nextHistoryIdRef[0], loanId, stageIndex, remarks, showRemarks, admin.id, now);
        if (success) {
          nextHistoryIdRef[0] += 1;
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  public func adminGetAllLoans(
    token : Text,
    page : Nat,
    pageSize : Nat,
    search : Text,
    stageFilter : ?Nat,
    assignedUserFilter : ?Nat
  ) : async {
    #ok : LoanTypes.PaginatedLoans;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let effectivePage = if (page == 0) { 1 } else { page };
        #ok(LoanLib.getAllLoans(loans, loanHistory, loanAssignments, effectivePage, pageSize, search, stageFilter, assignedUserFilter))
      };
    }
  };

  // Backward-compatible single user assign by mobile
  public func adminAssignUser(token : Text, loanId : Nat, mobile : Text) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.assignUser(loans, users, loanAssignments, nextAssignmentIdRef, loanId, mobile, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found or user with that mobile does not exist")
        }
      };
    }
  };

  // Assign multiple users to a loan (replaces all existing assignments)
  public func adminAssignMultipleUsers(token : Text, loanId : Nat, userIds : [Nat]) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.assignUsersToLoan(loans, loanAssignments, nextAssignmentIdRef, loanId, userIds, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  // Add a single user to a loan
  public func adminAddUserToLoan(token : Text, loanId : Nat, userId : Nat) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.addUserToLoan(loans, loanAssignments, nextAssignmentIdRef, loanId, userId, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  // Remove a single user from a loan
  public func adminRemoveUserFromLoan(token : Text, loanId : Nat, userId : Nat) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let removed = LoanLib.removeUserFromLoan(loanAssignments, loanId, userId);
        if (removed) {
          #ok(())
        } else {
          #err("Assignment not found")
        }
      };
    }
  };

  // Get documents for a loan (admin)
  public func adminGetLoanDocuments(token : Text, loanId : Nat) : async {
    #ok : [LoanTypes.Document];
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        #ok(LoanLib.getDocumentsForLoan(documents, loanId))
      };
    }
  };

  // Add a document to a loan (admin)
  public func adminAddDocument(token : Text, input : LoanTypes.UploadDocumentInput) : async {
    #ok : LoanTypes.Document;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(admin)) {
        let now = Time.now();
        let doc = LoanLib.addDocument(
          documents, nextDocumentIdRef,
          input.loan_id, input.file_url, input.file_name, input.file_size,
          admin.id, now
        );
        #ok(doc)
      };
    }
  };

  // Delete a document (admin)
  public func adminDeleteDocument(token : Text, docId : Nat) : async {
    #ok : Bool;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        #ok(LoanLib.deleteDocument(documents, docId))
      };
    }
  };

  // Reject a loan (admin)
  public func adminRejectLoan(token : Text, loanId : Nat, reason : Text) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.rejectLoan(loans, loanId, reason, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  // Unreject a loan (admin)
  public func adminUnrejectLoan(token : Text, loanId : Nat) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.unrejectLoan(loans, loanId, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  public func adminDeleteLoan(token : Text, loanId : Nat) : async {
    #ok : ();
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.softDelete(loans, loanId, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  public func adminGetDashboardStats(token : Text) : async {
    #ok : LoanTypes.DashboardStats;
    #err : Text;
  } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        #ok(LoanLib.getDashboardStats(loans, loanHistory))
      };
    }
  };

  public func adminUpdateLoan(
    token : Text,
    loanId : Nat,
    applicantName : Text,
    bankName : Text,
    loanType : Text,
    loanAmount : Nat
  ) : async { #ok : (); #err : Text } {
    switch (AuthLib.requireAdmin(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let now = Time.now();
        let success = LoanLib.updateLoanDetails(loans, loanId, applicantName, bankName, loanType, loanAmount, now);
        if (success) {
          #ok(())
        } else {
          #err("Loan not found")
        }
      };
    }
  };

  // User: get documents for their own loan
  public func getLoanDocuments(token : Text, loanId : Nat) : async {
    #ok : [LoanTypes.Document];
    #err : Text;
  } {
    switch (AuthLib.requireUser(token, sessions, users)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        // Verify user has access to this loan
        switch (loans.find(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
          case null { #err("Loan not found") };
          case (?loan) {
            let canAccess = switch (user.role) {
              case (#admin) { true };
              case (#user) {
                let direct = switch (loan.user_id) {
                  case (?uid) { Nat.equal(uid, user.id) };
                  case null { false };
                };
                if (direct) { true } else {
                  switch (loanAssignments.find(
                    func(a : LoanTypes.LoanAssignment) : Bool {
                      Nat.equal(a.loan_id, loanId) and Nat.equal(a.user_id, user.id)
                    }
                  )) {
                    case (?_) { true };
                    case null { false };
                  }
                }
              };
            };
            if (not canAccess) {
              #err("Access denied")
            } else {
              #ok(LoanLib.getDocumentsForLoan(documents, loanId))
            }
          };
        }
      };
    }
  };
};
