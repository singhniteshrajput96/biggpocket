export interface User {
  userId: number;
  name: string;
  role: "admin" | "user";
  token: string;
}

export interface Session {
  token: string;
  userId: number;
  name: string;
  role: "admin" | "user";
}

export interface LoanStageHistory {
  id: number;
  loanId: number;
  stageIndex: number;
  stageName: string;
  remarks: string;
  showRemarksToUser: boolean;
  timestamp: number;
  updatedByAdminId: number;
}

export interface LoanApplication {
  id: number;
  applicantName: string;
  bankName: string;
  loanType: string;
  loanAmount: number;
  currentStage: number;
  isActive: boolean;
  userId?: number;
  createdAt: number;
  updatedAt: number;
  // Extended fields
  distributionPartner?: string;
  coApplicantName?: string;
  employmentType?: string;
  income?: number;
  propertyType?: string;
  propertyValue?: number;
  isRejected?: boolean;
  rejectionReason?: string;
  rejectionStage?: number;
}

export interface LoanWithHistory {
  loan: LoanApplication;
  history: LoanStageHistory[];
  assignedUserIds: number[];
}

export interface DashboardStats {
  totalLoans: number;
  activeLoans: number;
  disbursedCount: number;
  sanctionedCount: number;
  rejectedLoans: number;
  stageBreakdown: { stageIndex: number; stageName: string; count: number }[];
  sanctionedPercent: number;
  disbursementPercent: number;
  dropoffRate: number;
  recentActivity: LoanStageHistory[];
}

export interface PaginatedLoans {
  total: number;
  page: number;
  pageSize: number;
  loans: LoanWithHistory[];
}

export interface AuthState {
  session: Session | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export interface CreateLoanInput {
  applicantName: string;
  bankName: string;
  loanType: string;
  loanAmount: number;
  mobile: string;
  // Extended optional fields
  distributionPartner?: string;
  coApplicantName?: string;
  employmentType?: string;
  income?: number;
  propertyType?: string;
  propertyValue?: number;
}

export interface UpdateLoanInput {
  applicantName: string;
  bankName: string;
  loanType: string;
  loanAmount: number;
}

export interface CreateUserInput {
  name: string;
  mobile: string;
  role: "admin" | "user";
}

export interface CreatedUser {
  id: number;
  name: string;
  role: string;
}

// New types

export interface LoanAssignment {
  id: number;
  loan_id: number;
  user_id: number;
  assigned_at: number;
}

export interface Document {
  id: number;
  loan_id: number;
  file_url: string;
  file_name: string;
  file_size: number;
  uploaded_by: number;
  uploaded_at: number;
}

export interface PublicUser {
  id: number;
  name: string;
  role: string;
}

export interface UserLoanStats {
  user_id: number;
  user_name: string;
  total_loans: number;
  total_value: number;
  stage_breakdown: [string, number][];
  conversion_rate: number;
}

export interface UserDashboardStats {
  total_loans: number;
  total_value: number;
  active_loans: number;
  stage_breakdown: [string, number][];
  recent_loans: LoanApplication[];
}

export interface UploadDocumentInput {
  loan_id: number;
  file_url: string;
  file_name: string;
  file_size: number;
}
