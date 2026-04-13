import Common "common";

module {
  public type LoanApplication = {
    id : Nat;
    user_id : ?Common.UserId;
    applicant_name : Text;
    loan_amount : Nat;
    bank_name : Text;
    loan_type : Text;
    current_stage : Nat;
    is_active : Bool;
    created_at : Common.Timestamp;
    updated_at : Common.Timestamp;
    // Extended fields
    distribution_partner : Text;
    co_applicant_name : Text;
    employment_type : Text;   // "Salary" or "Business"
    income : Nat;
    property_type : Text;
    property_value : Nat;
    is_rejected : Bool;       // special flag, not a sequential stage
    rejection_reason : Text;
    rejection_stage : Nat;    // stage index at time of rejection
  };

  public type LoanStageHistory = {
    id : Nat;
    loan_id : Nat;
    stage_index : Nat;
    stage_name : Text;
    remarks : Text;
    show_remarks_to_user : Bool;
    updated_by_admin_id : Nat;
    timestamp : Common.Timestamp;
  };

  public type LoanWithHistory = {
    loan : LoanApplication;
    history : [LoanStageHistory];
    assigned_user_ids : [Nat];  // many-to-many assigned users
  };

  public type DashboardStats = {
    total_loans : Nat;
    active_loans : Nat;        // stages 0-7, not rejected
    disbursed_count : Nat;     // stages 7+
    sanctioned_count : Nat;    // stages 6+
    rejected_loans : Nat;      // is_rejected = true
    stage_breakdown : [(Nat, Text, Nat)]; // (stage_index, stage_name, count)
    recent_activity : [LoanStageHistory]; // last 10
    sanctioned_percent : Float;
    disbursement_percent : Float;
    dropoff_rate : Float;
  };

  public type PaginatedLoans = {
    loans : [LoanWithHistory];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };

  // Many-to-many loan ↔ user assignment
  public type LoanAssignment = {
    id : Nat;
    loan_id : Nat;
    user_id : Nat;
    assigned_at : Common.Timestamp;
  };

  // Document attached to a loan
  public type Document = {
    id : Nat;
    loan_id : Nat;
    file_url : Text;
    file_name : Text;
    file_size : Nat;
    uploaded_by : Nat;
    uploaded_at : Common.Timestamp;
  };

  // Per-user performance stats (admin matrix view)
  public type UserLoanStats = {
    user_id : Nat;
    user_name : Text;
    total_loans : Nat;
    total_value : Nat;
    stage_breakdown : [(Text, Nat)];
    conversion_rate : Float;
  };

  // User-facing dashboard (non-admin)
  public type UserDashboardStats = {
    total_loans : Nat;
    total_value : Nat;
    active_loans : Nat;
    stage_breakdown : [(Text, Nat)];
    recent_loans : [LoanApplication];
  };

  // Input types for loan creation — includes new fields
  public type CreateLoanInput = {
    applicant_name : Text;
    loan_amount : Nat;
    bank_name : Text;
    loan_type : Text;
    distribution_partner : Text;
    co_applicant_name : Text;
    employment_type : Text;
    income : Nat;
    property_type : Text;
    property_value : Nat;
  };

  // Input type for updating a loan — all fields optional for partial updates
  public type UpdateLoanInput = {
    applicant_name : ?Text;
    loan_amount : ?Nat;
    bank_name : ?Text;
    loan_type : ?Text;
    distribution_partner : ?Text;
    co_applicant_name : ?Text;
    employment_type : ?Text;
    income : ?Nat;
    property_type : ?Text;
    property_value : ?Nat;
  };

  // Assign multiple users to one loan
  public type AssignUsersInput = {
    loan_id : Nat;
    user_ids : [Nat];
  };

  // Upload a document for a loan
  public type UploadDocumentInput = {
    loan_id : Nat;
    file_url : Text;
    file_name : Text;
    file_size : Nat;
  };
};
