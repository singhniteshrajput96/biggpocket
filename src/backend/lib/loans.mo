import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import AuthTypes "../types/auth";
import LoanTypes "../types/loans";
import Common "../types/common";

module {
  public let STAGE_NAMES : [Text] = [
    "Documentation",
    "Sent to Bank",
    "Login Done",
    "PD (Personal Discussion)",
    "Credit & Valuation",
    "Recommended for Loan",
    "Sanctioned",
    "Disbursement",
    "Post Disbursement Documentation",
    "Payout Received"
  ];

  public func createLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    nextId : Nat,
    applicantName : Text,
    bankName : Text,
    loanType : Text,
    loanAmount : Nat,
    userId : ?Common.UserId,
    now : Common.Timestamp,
    distributionPartner : Text,
    coApplicantName : Text,
    employmentType : Text,
    income : Nat,
    propertyType : Text,
    propertyValue : Nat
  ) : LoanTypes.LoanApplication {
    let loan : LoanTypes.LoanApplication = {
      id = nextId;
      user_id = userId;
      applicant_name = applicantName;
      loan_amount = loanAmount;
      bank_name = bankName;
      loan_type = loanType;
      current_stage = 0;
      is_active = true;
      created_at = now;
      updated_at = now;
      distribution_partner = distributionPartner;
      co_applicant_name = coApplicantName;
      employment_type = employmentType;
      income = income;
      property_type = propertyType;
      property_value = propertyValue;
      is_rejected = false;
      rejection_reason = "";
      rejection_stage = 0;
    };
    loans.add(loan);
    loan
  };

  public func updateStage(
    loans : List.List<LoanTypes.LoanApplication>,
    history : List.List<LoanTypes.LoanStageHistory>,
    nextHistoryId : Nat,
    loanId : Nat,
    stageIndex : Nat,
    remarks : Text,
    showRemarks : Bool,
    adminId : Common.UserId,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case (?idx) {
        let loan = loans.at(idx);
        let stageName = if (stageIndex < STAGE_NAMES.size()) {
          STAGE_NAMES[stageIndex]
        } else {
          "Unknown Stage"
        };
        loans.put(idx, { loan with current_stage = stageIndex; updated_at = now });
        history.add({
          id = nextHistoryId;
          loan_id = loanId;
          stage_index = stageIndex;
          stage_name = stageName;
          remarks;
          show_remarks_to_user = showRemarks;
          updated_by_admin_id = adminId;
          timestamp = now;
        });
        true
      };
      case null { false };
    }
  };

  public func updateLoanDetails(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    applicantName : Text,
    bankName : Text,
    loanType : Text,
    loanAmount : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case (?idx) {
        let loan = loans.at(idx);
        loans.put(idx, {
          loan with
          applicant_name = applicantName;
          bank_name = bankName;
          loan_type = loanType;
          loan_amount = loanAmount;
          updated_at = now;
        });
        true
      };
      case null { false };
    }
  };

  // Backward-compatible single-user assign (by mobile) — updates user_id on the loan record
  public func assignUser(
    loans : List.List<LoanTypes.LoanApplication>,
    users : List.List<AuthTypes.User>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    nextAssignmentIdRef : [var Nat],
    loanId : Nat,
    mobile : Text,
    now : Common.Timestamp
  ) : Bool {
    switch (users.find(func(u : AuthTypes.User) : Bool { Text.equal(u.mobile_number, mobile) })) {
      case (?user) {
        switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
          case (?idx) {
            let loan = loans.at(idx);
            loans.put(idx, { loan with user_id = ?user.id; updated_at = now });
            // Also add to many-to-many table (idempotent — skip if already assigned)
            let alreadyAssigned = loanAssignments.find(
              func(a : LoanTypes.LoanAssignment) : Bool {
                Nat.equal(a.loan_id, loanId) and Nat.equal(a.user_id, user.id)
              }
            );
            switch (alreadyAssigned) {
              case null {
                loanAssignments.add({
                  id = nextAssignmentIdRef[0];
                  loan_id = loanId;
                  user_id = user.id;
                  assigned_at = now;
                });
                nextAssignmentIdRef[0] += 1;
              };
              case (?_) {};
            };
            true
          };
          case null { false };
        }
      };
      case null { false };
    }
  };

  // Many-to-many: replace all assignments for a loan with the given user_ids
  public func assignUsersToLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    nextAssignmentIdRef : [var Nat],
    loanId : Nat,
    userIds : [Nat],
    now : Common.Timestamp
  ) : Bool {
    switch (loans.find(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case null { false };
      case (?_) {
        // Remove all existing assignments for this loan
        let kept = loanAssignments.filter(
          func(a : LoanTypes.LoanAssignment) : Bool { not Nat.equal(a.loan_id, loanId) }
        );
        loanAssignments.clear();
        loanAssignments.append(kept);
        // Add new assignments
        for (uid in userIds.values()) {
          loanAssignments.add({
            id = nextAssignmentIdRef[0];
            loan_id = loanId;
            user_id = uid;
            assigned_at = now;
          });
          nextAssignmentIdRef[0] += 1;
        };
        true
      };
    }
  };

  // Many-to-many: add a single user to a loan (idempotent)
  public func addUserToLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    nextAssignmentIdRef : [var Nat],
    loanId : Nat,
    userId : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.find(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case null { false };
      case (?_) {
        let alreadyAssigned = loanAssignments.find(
          func(a : LoanTypes.LoanAssignment) : Bool {
            Nat.equal(a.loan_id, loanId) and Nat.equal(a.user_id, userId)
          }
        );
        switch (alreadyAssigned) {
          case (?_) { true }; // already assigned, no-op
          case null {
            loanAssignments.add({
              id = nextAssignmentIdRef[0];
              loan_id = loanId;
              user_id = userId;
              assigned_at = now;
            });
            nextAssignmentIdRef[0] += 1;
            true
          };
        }
      };
    }
  };

  // Many-to-many: remove a single user from a loan
  public func removeUserFromLoan(
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    loanId : Nat,
    userId : Nat
  ) : Bool {
    let sizeBefore = loanAssignments.size();
    let kept = loanAssignments.filter(
      func(a : LoanTypes.LoanAssignment) : Bool {
        not (Nat.equal(a.loan_id, loanId) and Nat.equal(a.user_id, userId))
      }
    );
    loanAssignments.clear();
    loanAssignments.append(kept);
    loanAssignments.size() < sizeBefore
  };

  // Returns all user_ids assigned to a loan
  public func getAssignedUsers(
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    loanId : Nat
  ) : [Nat] {
    loanAssignments
      .filter(func(a : LoanTypes.LoanAssignment) : Bool { Nat.equal(a.loan_id, loanId) })
      .map<LoanTypes.LoanAssignment, Nat>(func(a) = a.user_id)
      .toArray()
  };

  // Add a document to a loan
  public func addDocument(
    documents : List.List<LoanTypes.Document>,
    nextDocumentIdRef : [var Nat],
    loanId : Nat,
    fileUrl : Text,
    fileName : Text,
    fileSize : Nat,
    uploadedBy : Nat,
    now : Common.Timestamp
  ) : LoanTypes.Document {
    let doc : LoanTypes.Document = {
      id = nextDocumentIdRef[0];
      loan_id = loanId;
      file_url = fileUrl;
      file_name = fileName;
      file_size = fileSize;
      uploaded_by = uploadedBy;
      uploaded_at = now;
    };
    documents.add(doc);
    nextDocumentIdRef[0] += 1;
    doc
  };

  // Delete a document by id
  public func deleteDocument(
    documents : List.List<LoanTypes.Document>,
    docId : Nat
  ) : Bool {
    let sizeBefore = documents.size();
    let kept = documents.filter(func(d : LoanTypes.Document) : Bool { not Nat.equal(d.id, docId) });
    documents.clear();
    documents.append(kept);
    documents.size() < sizeBefore
  };

  // Get all documents for a loan
  public func getDocumentsForLoan(
    documents : List.List<LoanTypes.Document>,
    loanId : Nat
  ) : [LoanTypes.Document] {
    documents
      .filter(func(d : LoanTypes.Document) : Bool { Nat.equal(d.loan_id, loanId) })
      .toArray()
  };

  // Set rejection flag on a loan
  public func rejectLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    reason : Text,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case (?idx) {
        let loan = loans.at(idx);
        loans.put(idx, {
          loan with
          is_rejected = true;
          rejection_reason = reason;
          rejection_stage = loan.current_stage;
          updated_at = now;
        });
        true
      };
      case null { false };
    }
  };

  // Clear rejection flag on a loan
  public func unrejectLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case (?idx) {
        let loan = loans.at(idx);
        loans.put(idx, {
          loan with
          is_rejected = false;
          rejection_reason = "";
          rejection_stage = 0;
          updated_at = now;
        });
        true
      };
      case null { false };
    }
  };

  public func softDelete(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) })) {
      case (?idx) {
        let loan = loans.at(idx);
        loans.put(idx, { loan with is_active = false; updated_at = now });
        true
      };
      case null { false };
    }
  };

  public func getLoanWithHistory(
    loan : LoanTypes.LoanApplication,
    history : List.List<LoanTypes.LoanStageHistory>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>
  ) : LoanTypes.LoanWithHistory {
    let loanHistory = history
      .filter(func(h : LoanTypes.LoanStageHistory) : Bool { Nat.equal(h.loan_id, loan.id) })
      .toArray();
    let sorted = loanHistory.sort(
      func(a : LoanTypes.LoanStageHistory, b : LoanTypes.LoanStageHistory) : Order.Order = Int.compare(a.timestamp, b.timestamp)
    );
    let assignedUserIds = getAssignedUsers(loanAssignments, loan.id);
    { loan; history = sorted; assigned_user_ids = assignedUserIds }
  };

  public func getLoansForUser(
    loans : List.List<LoanTypes.LoanApplication>,
    history : List.List<LoanTypes.LoanStageHistory>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    userId : Common.UserId
  ) : [LoanTypes.LoanWithHistory] {
    // Include loans where user_id matches OR user is in many-to-many assignments
    loans
      .filter(func(l : LoanTypes.LoanApplication) : Bool {
        if (not l.is_active) { return false };
        let directAssign = switch (l.user_id) {
          case (?uid) { Nat.equal(uid, userId) };
          case null { false };
        };
        if (directAssign) { return true };
        // Check many-to-many table
        switch (loanAssignments.find(
          func(a : LoanTypes.LoanAssignment) : Bool {
            Nat.equal(a.loan_id, l.id) and Nat.equal(a.user_id, userId)
          }
        )) {
          case (?_) { true };
          case null { false };
        }
      })
      .map<LoanTypes.LoanApplication, LoanTypes.LoanWithHistory>(
        func(l : LoanTypes.LoanApplication) : LoanTypes.LoanWithHistory {
          getLoanWithHistory(l, history, loanAssignments)
        }
      )
      .toArray()
  };

  public func getAllLoans(
    loans : List.List<LoanTypes.LoanApplication>,
    history : List.List<LoanTypes.LoanStageHistory>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    page : Nat,
    pageSize : Nat,
    search : Text,
    stageFilter : ?Nat,
    assignedUserFilter : ?Nat
  ) : LoanTypes.PaginatedLoans {
    let searchLower = search.toLower();
    let filtered = loans.filter(func(l : LoanTypes.LoanApplication) : Bool {
      if (not l.is_active) { return false };
      let matchesStage = switch (stageFilter) {
        case (?stage) { Nat.equal(l.current_stage, stage) };
        case null { true };
      };
      if (not matchesStage) { return false };
      // Filter by assigned user (many-to-many)
      let matchesUser = switch (assignedUserFilter) {
        case (?uid) {
          let directMatch = switch (l.user_id) {
            case (?u) { Nat.equal(u, uid) };
            case null { false };
          };
          if (directMatch) { true } else {
            switch (loanAssignments.find(
              func(a : LoanTypes.LoanAssignment) : Bool {
                Nat.equal(a.loan_id, l.id) and Nat.equal(a.user_id, uid)
              }
            )) {
              case (?_) { true };
              case null { false };
            }
          }
        };
        case null { true };
      };
      if (not matchesUser) { return false };
      if (searchLower.size() == 0) { return true };
      let nameMatch = l.applicant_name.toLower().contains(#text searchLower);
      let bankMatch = l.bank_name.toLower().contains(#text searchLower);
      nameMatch or bankMatch
    });

    let total = filtered.size();
    let effectivePageSize = if (pageSize == 0) { 10 } else { pageSize };
    let startIdx = if (page <= 1) { 0 } else { (page - 1 : Nat) * effectivePageSize };

    let allFiltered = filtered.toArray();
    let arrSize = allFiltered.size();
    let start = if (startIdx >= arrSize) { arrSize } else { startIdx };
    let endIdx = if (start + effectivePageSize > arrSize) { arrSize } else { start + effectivePageSize };

    let pageItems = allFiltered.sliceToArray(start, endIdx);

    let withHistory = pageItems.map(
      func(l : LoanTypes.LoanApplication) : LoanTypes.LoanWithHistory {
        getLoanWithHistory(l, history, loanAssignments)
      }
    );

    { loans = withHistory; total; page; pageSize = effectivePageSize }
  };

  public func getDashboardStats(
    loans : List.List<LoanTypes.LoanApplication>,
    history : List.List<LoanTypes.LoanStageHistory>
  ) : LoanTypes.DashboardStats {
    let activeLoans = loans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.is_active });
    let total = activeLoans.size();

    // Stage breakdown: count per stage
    let breakdown : [(Nat, Text, Nat)] = Array.tabulate(
      STAGE_NAMES.size(),
      func(i) {
        let count = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.current_stage, i) }).size();
        (i, STAGE_NAMES[i], count)
      }
    );

    // Recent activity: last 10 history entries sorted desc
    let allHistory = history.toArray();
    let histSize = allHistory.size();
    let sortedDesc = allHistory.sort(
      func(a : LoanTypes.LoanStageHistory, b : LoanTypes.LoanStageHistory) : Order.Order = Int.compare(b.timestamp, a.timestamp)
    );
    let recentCount = if (histSize < 10) { histSize } else { 10 };
    let recent = sortedDesc.sliceToArray(0, recentCount);

    // Conversion metrics
    let totalFloat = if (total == 0) { 1.0 } else { total.toFloat() };

    // active: loans at stages 0-7 (not yet fully disbursed), not rejected
    let activeLoanCount = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.current_stage <= 7 and not l.is_rejected }).size();

    // sanctioned: loans at stage 6+
    let sanctionedCount = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.current_stage >= 6 }).size();
    let sanctioned_percent = sanctionedCount.toFloat() / totalFloat * 100.0;

    // disbursed: loans at stage 7+
    let disbursedCount = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.current_stage >= 7 }).size();
    let disbursement_percent = disbursedCount.toFloat() / totalFloat * 100.0;

    // dropoff: loans in early stages (0-2) as % of total
    let dropoffCount = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.current_stage <= 2 }).size();
    let dropoff_rate = dropoffCount.toFloat() / totalFloat * 100.0;

    // rejected: loans with is_rejected flag set
    let rejectedCount = activeLoans.filter(func(l : LoanTypes.LoanApplication) : Bool { l.is_rejected }).size();

    {
      total_loans = total;
      active_loans = activeLoanCount;
      disbursed_count = disbursedCount;
      sanctioned_count = sanctionedCount;
      rejected_loans = rejectedCount;
      stage_breakdown = breakdown;
      recent_activity = recent;
      sanctioned_percent;
      disbursement_percent;
      dropoff_rate;
    }
  };
};
