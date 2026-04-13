import List "mo:core/List";
import Map "mo:core/Map";
import AuthTypes "types/auth";
import LoanTypes "types/loans";
import Common "types/common";
import AuthMixin "mixins/auth-api";
import LoansMixin "mixins/loans-api";



actor {
  let users = List.empty<AuthTypes.User>();
  let sessions = Map.empty<Common.Token, AuthTypes.Session>();
  let otps = Map.empty<Text, AuthTypes.OTPEntry>();
  let nextUserIdRef : [var Nat] = [var 1];

  let loans = List.empty<LoanTypes.LoanApplication>();
  let loanHistory = List.empty<LoanTypes.LoanStageHistory>();
  let loanAssignments = List.empty<LoanTypes.LoanAssignment>();
  let documents = List.empty<LoanTypes.Document>();
  let nextLoanIdRef : [var Nat] = [var 1];
  let nextHistoryIdRef : [var Nat] = [var 1];
  let nextAssignmentIdRef : [var Nat] = [var 1];
  let nextDocumentIdRef : [var Nat] = [var 1];

  // Pre-seed admin user: mobile 9999999999, role #admin
  do {
    let adminUser : AuthTypes.User = {
      id = 0;
      name = "Admin";
      mobile_number = "9999999999";
      role = #admin;
      created_at = 0;
    };
    users.add(adminUser);
  };

  include AuthMixin(users, sessions, otps, nextUserIdRef);
  include LoansMixin(users, sessions, loans, loanHistory, loanAssignments, documents, nextLoanIdRef, nextHistoryIdRef, nextAssignmentIdRef, nextDocumentIdRef);
};
