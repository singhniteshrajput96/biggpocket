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
    propertyValue : Nat,
    requiredAmount : Nat,
    sanctionAmount : Nat,
    disbursedAmount : Nat
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
      required_amount = requiredAmount;
      sanction_amount = sanctionAmount;
      disbursed_amount = disbursedAmount;
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

  // Extended updateLoanDetails — now accepts all UpdateLoanInput fields including financials
  public func updateLoanDetails(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    input : LoanTypes.UpdateLoanInput,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and l.is_active })) {
      case null { false };
      case (?idx) {
        let loan = loans.at(idx);
        let updated : LoanTypes.LoanApplication = {
          loan with
          applicant_name     = switch (input.applicant_name)     { case (?v) v; case null loan.applicant_name };
          loan_amount        = switch (input.loan_amount)        { case (?v) v; case null loan.loan_amount };
          bank_name          = switch (input.bank_name)          { case (?v) v; case null loan.bank_name };
          loan_type          = switch (input.loan_type)          { case (?v) v; case null loan.loan_type };
          distribution_partner = switch (input.distribution_partner) { case (?v) v; case null loan.distribution_partner };
          co_applicant_name  = switch (input.co_applicant_name)  { case (?v) v; case null loan.co_applicant_name };
          employment_type    = switch (input.employment_type)    { case (?v) v; case null loan.employment_type };
          income             = switch (input.income)             { case (?v) v; case null loan.income };
          property_type      = switch (input.property_type)      { case (?v) v; case null loan.property_type };
          property_value     = switch (input.property_value)     { case (?v) v; case null loan.property_value };
          required_amount    = switch (input.required_amount)    { case (?v) v; case null loan.required_amount };
          sanction_amount    = switch (input.sanction_amount)    { case (?v) v; case null loan.sanction_amount };
          disbursed_amount   = switch (input.disbursed_amount)   { case (?v) v; case null loan.disbursed_amount };
          updated_at = now;
        };
        loans.put(idx, updated);
        true
      };
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

  // Restore a soft-deleted loan (set is_active = true)
  public func restoreLoan(
    loans : List.List<LoanTypes.LoanApplication>,
    loanId : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (loans.findIndex(func(l : LoanTypes.LoanApplication) : Bool { Nat.equal(l.id, loanId) and not l.is_active })) {
      case (?idx) {
        let loan = loans.at(idx);
        loans.put(idx, { loan with is_active = true; updated_at = now });
        true
      };
      case null { false };
    }
  };

  // Get all soft-deleted loans
  public func getDeletedLoans(
    loans : List.List<LoanTypes.LoanApplication>,
    history : List.List<LoanTypes.LoanStageHistory>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>
  ) : [LoanTypes.LoanWithHistory] {
    loans
      .filter(func(l : LoanTypes.LoanApplication) : Bool { not l.is_active })
      .map<LoanTypes.LoanApplication, LoanTypes.LoanWithHistory>(
        func(l : LoanTypes.LoanApplication) : LoanTypes.LoanWithHistory {
          getLoanWithHistory(l, history, loanAssignments)
        }
      )
      .toArray()
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
    var total = 0;
    var active = 0;
    var disbursed = 0;
    var sanctioned = 0;
    var rejected = 0;
    var totalDisbursedAmount = 0;
    var totalSanctionedAmount = 0;

    // Stage counts: mutable array indexed by stage
    let stageCount : Nat = STAGE_NAMES.size();
    let stageCounts : [var Nat] = Array.tabulate(stageCount, func _ = 0).toVarArray();

    for (l in loans.values()) {
      if (l.is_active) {
        total += 1;
        if (l.is_rejected) {
          rejected += 1;
        } else {
          active += 1;
          if (l.current_stage >= 7) { disbursed += 1 };
          if (l.current_stage >= 6) { sanctioned += 1 };
          if (l.current_stage < stageCount) {
            stageCounts[l.current_stage] += 1;
          };
          totalDisbursedAmount += l.disbursed_amount;
          totalSanctionedAmount += l.sanction_amount;
        };
      };
    };

    let stage_breakdown : [(Nat, Text, Nat)] = Array.tabulate<(Nat, Text, Nat)>(
      stageCount,
      func(i : Nat) : (Nat, Text, Nat) { (i, STAGE_NAMES[i], stageCounts[i]) }
    );

    // Recent activity: last 10 history entries sorted descending by timestamp
    let allHistory = history.toArray();
    let sorted = allHistory.sort(
      func(a : LoanTypes.LoanStageHistory, b : LoanTypes.LoanStageHistory) : Order.Order =
        Int.compare(b.timestamp, a.timestamp)
    );
    let recentSize = if (sorted.size() < 10) sorted.size() else 10;
    let recent_activity = sorted.sliceToArray(0, recentSize);

    let totalF : Float = total.toFloat();
    let sanctioned_percent : Float = if (total == 0) 0.0 else
      (sanctioned.toFloat() / totalF) * 100.0;
    let disbursement_percent : Float = if (total == 0) 0.0 else
      (disbursed.toFloat() / totalF) * 100.0;
    let remaining : Nat = if (disbursed > total) 0 else (total - disbursed : Nat);
    let dropoff_rate : Float = if (total == 0) 0.0 else
      (remaining.toFloat() / totalF) * 100.0;

    {
      total_loans = total;
      active_loans = active;
      disbursed_count = disbursed;
      sanctioned_count = sanctioned;
      rejected_loans = rejected;
      stage_breakdown;
      recent_activity;
      sanctioned_percent;
      disbursement_percent;
      dropoff_rate;
      total_disbursed_amount = totalDisbursedAmount;
      total_sanctioned_amount = totalSanctionedAmount;
    }
  };

  // Get user-specific dashboard stats — restricted to loans assigned to userId
  public func getUserDashboardStats(
    loans : List.List<LoanTypes.LoanApplication>,
    loanAssignments : List.List<LoanTypes.LoanAssignment>,
    userId : Common.UserId
  ) : LoanTypes.UserDashboardStats {
    let userLoans = loans.filter(func(l : LoanTypes.LoanApplication) : Bool {
      if (not l.is_active) { return false };
      let directAssign = switch (l.user_id) {
        case (?uid) { Nat.equal(uid, userId) };
        case null { false };
      };
      if (directAssign) { return true };
      switch (loanAssignments.find(
        func(a : LoanTypes.LoanAssignment) : Bool {
          Nat.equal(a.loan_id, l.id) and Nat.equal(a.user_id, userId)
        }
      )) {
        case (?_) { true };
        case null { false };
      }
    });

    var totalValue = 0;
    var activeCount = 0;
    var totalDisbursed = 0;
    var totalSanctioned = 0;
    let stageCount : Nat = STAGE_NAMES.size();
    let stageCounts : [var Nat] = Array.tabulate(stageCount, func _ = 0).toVarArray();

    for (l in userLoans.values()) {
      totalValue += l.loan_amount;
      if (not l.is_rejected) {
        activeCount += 1;
        if (l.current_stage < stageCount) {
          stageCounts[l.current_stage] += 1;
        };
        totalDisbursed += l.disbursed_amount;
        totalSanctioned += l.sanction_amount;
      };
    };

    let stage_breakdown : [(Text, Nat)] = Array.tabulate<(Text, Nat)>(
      stageCount,
      func(i : Nat) : (Text, Nat) { (STAGE_NAMES[i], stageCounts[i]) }
    );

    let allLoans = userLoans.toArray();
    let recentSize = if (allLoans.size() < 5) allLoans.size() else 5;
    let recent_loans = allLoans.sliceToArray(0, recentSize);

    {
      total_loans = userLoans.size();
      total_value = totalValue;
      active_loans = activeCount;
      stage_breakdown;
      recent_loans;
      total_disbursed_amount = totalDisbursed;
      total_sanctioned_amount = totalSanctioned;
    }
  };
};
