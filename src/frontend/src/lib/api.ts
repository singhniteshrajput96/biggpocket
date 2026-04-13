import type { Backend } from "../backend";
import type {
  DashboardStats as BEDashboardStats,
  Document as BEDocument,
  LoanApplication as BELoanApplication,
  LoanStageHistory as BELoanStageHistory,
  LoanWithHistory as BELoanWithHistory,
  PaginatedLoans as BEPaginatedLoans,
  PublicUser as BEPublicUser,
  UploadDocumentInput as BEUploadDocumentInput,
} from "../backend.d.ts";
import type {
  DashboardStats,
  Document,
  LoanApplication,
  LoanStageHistory,
  LoanWithHistory,
  PaginatedLoans,
  PublicUser,
  Session,
  UploadDocumentInput,
  UserDashboardStats,
} from "../types";

function mapStageHistory(h: BELoanStageHistory): LoanStageHistory {
  return {
    id: Number(h.id),
    loanId: Number(h.loan_id),
    stageIndex: Number(h.stage_index),
    stageName: h.stage_name,
    remarks: h.remarks,
    showRemarksToUser: h.show_remarks_to_user,
    timestamp: Number(h.timestamp),
    updatedByAdminId: Number(h.updated_by_admin_id),
  };
}

function mapLoan(l: BELoanApplication): LoanApplication {
  return {
    id: Number(l.id),
    applicantName: l.applicant_name,
    bankName: l.bank_name,
    loanType: l.loan_type,
    loanAmount: Number(l.loan_amount),
    currentStage: Number(l.current_stage),
    isActive: l.is_active,
    userId: l.user_id !== undefined ? Number(l.user_id) : undefined,
    createdAt: Number(l.created_at),
    updatedAt: Number(l.updated_at),
    distributionPartner: l.distribution_partner || undefined,
    coApplicantName: l.co_applicant_name || undefined,
    employmentType: l.employment_type || undefined,
    income: Number(l.income) || undefined,
    propertyType: l.property_type || undefined,
    propertyValue: Number(l.property_value) || undefined,
    isRejected: l.is_rejected,
    rejectionReason: l.rejection_reason || undefined,
    rejectionStage: Number(l.rejection_stage) || undefined,
  };
}

function mapLoanWithHistory(lh: BELoanWithHistory): LoanWithHistory {
  return {
    loan: mapLoan(lh.loan),
    history: lh.history.map(mapStageHistory),
    assignedUserIds: lh.assigned_user_ids.map(Number),
  };
}

function mapPaginatedLoans(pl: BEPaginatedLoans): PaginatedLoans {
  return {
    total: Number(pl.total),
    page: Number(pl.page),
    pageSize: Number(pl.pageSize),
    loans: pl.loans.map(mapLoanWithHistory),
  };
}

function mapDashboardStats(stats: BEDashboardStats): DashboardStats {
  return {
    totalLoans: Number(stats.total_loans),
    activeLoans: Number(stats.active_loans),
    disbursedCount: Number(stats.disbursed_count),
    sanctionedCount: Number(stats.sanctioned_count),
    rejectedLoans: Number(stats.rejected_loans),
    stageBreakdown: stats.stage_breakdown.map(([idx, name, count]) => ({
      stageIndex: Number(idx),
      stageName: name,
      count: Number(count),
    })),
    sanctionedPercent: stats.sanctioned_percent,
    disbursementPercent: stats.disbursement_percent,
    dropoffRate: stats.dropoff_rate,
    recentActivity: stats.recent_activity.map(mapStageHistory),
  };
}

function mapDocument(d: BEDocument): Document {
  return {
    id: Number(d.id),
    loan_id: Number(d.loan_id),
    file_url: d.file_url,
    file_name: d.file_name,
    file_size: Number(d.file_size),
    uploaded_by: Number(d.uploaded_by),
    uploaded_at: Number(d.uploaded_at),
  };
}

function mapPublicUser(u: BEPublicUser): PublicUser {
  return {
    id: Number(u.id),
    name: u.name,
    role: u.role,
  };
}

export async function sendOTP(actor: Backend, mobile: string): Promise<string> {
  return actor.sendOTP(mobile);
}

export async function verifyOTP(
  actor: Backend,
  mobile: string,
  otp: string,
): Promise<Session> {
  const result = await actor.verifyOTP(mobile, otp);
  if (result.__kind__ === "err") throw new Error(result.err);
  const { token, userId, name, role } = result.ok;
  return {
    token,
    userId: Number(userId),
    name,
    role: role === "admin" ? "admin" : "user",
  };
}

export async function getMyLoans(
  actor: Backend,
  token: string,
): Promise<LoanWithHistory[]> {
  const result = await actor.getMyLoans(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapLoanWithHistory);
}

export async function getLoanById(
  actor: Backend,
  token: string,
  loanId: number,
): Promise<LoanWithHistory> {
  const result = await actor.getLoanById(token, BigInt(loanId));
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapLoanWithHistory(result.ok);
}

export async function adminCreateLoan(
  actor: Backend,
  token: string,
  applicantName: string,
  bankName: string,
  loanType: string,
  loanAmount: number,
  mobile: string,
  distributionPartner = "",
  coApplicantName = "",
  employmentType = "",
  income = 0,
  propertyType = "",
  propertyValue = 0,
): Promise<number> {
  const result = await actor.adminCreateLoan(
    token,
    applicantName,
    bankName,
    loanType,
    BigInt(loanAmount),
    mobile,
    distributionPartner,
    coApplicantName,
    employmentType,
    BigInt(income),
    propertyType,
    BigInt(propertyValue),
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  return Number(result.ok);
}

export async function adminUpdateStage(
  actor: Backend,
  token: string,
  loanId: number,
  stageIndex: number,
  remarks: string,
  showRemarks: boolean,
): Promise<void> {
  const result = await actor.adminUpdateStage(
    token,
    BigInt(loanId),
    BigInt(stageIndex),
    remarks,
    showRemarks,
  );
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function adminGetAllLoans(
  actor: Backend,
  token: string,
  page: number,
  pageSize: number,
  search: string,
  stageFilter: number | null,
  assignedUserFilter: number | null = null,
): Promise<PaginatedLoans> {
  const result = await actor.adminGetAllLoans(
    token,
    BigInt(page),
    BigInt(pageSize),
    search,
    stageFilter !== null ? BigInt(stageFilter) : null,
    assignedUserFilter !== null ? BigInt(assignedUserFilter) : null,
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapPaginatedLoans(result.ok);
}

export async function adminAssignUser(
  actor: Backend,
  token: string,
  loanId: number,
  mobile: string,
): Promise<void> {
  const result = await actor.adminAssignUser(token, BigInt(loanId), mobile);
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function adminDeleteLoan(
  actor: Backend,
  token: string,
  loanId: number,
): Promise<void> {
  const result = await actor.adminDeleteLoan(token, BigInt(loanId));
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function adminGetDashboardStats(
  actor: Backend,
  token: string,
): Promise<DashboardStats> {
  const result = await actor.adminGetDashboardStats(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapDashboardStats(result.ok);
}

export async function adminUpdateLoan(
  actor: Backend,
  token: string,
  loanId: number,
  applicantName: string,
  bankName: string,
  loanType: string,
  loanAmount: number,
): Promise<void> {
  const result = await actor.adminUpdateLoan(
    token,
    BigInt(loanId),
    applicantName,
    bankName,
    loanType,
    BigInt(loanAmount),
  );
  if (result.__kind__ === "err") throw new Error(result.err);
}

export async function adminCreateUser(
  actor: Backend,
  token: string,
  name: string,
  mobile: string,
  role: "admin" | "user",
): Promise<{ id: number; name: string; role: string }> {
  const result = await actor.adminCreateUser(token, name, mobile, role);
  if (result.__kind__ === "err") throw new Error(result.err);
  return {
    id: Number(result.ok.id),
    name: result.ok.name,
    role: result.ok.role,
  };
}

export async function adminGetAllUsers(
  actor: Backend,
  token: string,
): Promise<PublicUser[]> {
  const result = await actor.adminGetAllUsers(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapPublicUser);
}

export async function adminUpdateAdminMobile(
  actor: Backend,
  token: string,
  newMobile: string,
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminUpdateAdminMobile(token, newMobile);
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function adminAssignMultipleUsers(
  actor: Backend,
  token: string,
  loan_id: number,
  user_ids: number[],
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminAssignMultipleUsers(
    token,
    BigInt(loan_id),
    user_ids.map(BigInt),
  );
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function adminAddUserToLoan(
  actor: Backend,
  token: string,
  loan_id: number,
  user_id: number,
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminAddUserToLoan(
    token,
    BigInt(loan_id),
    BigInt(user_id),
  );
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function adminRemoveUserFromLoan(
  actor: Backend,
  token: string,
  loan_id: number,
  user_id: number,
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminRemoveUserFromLoan(
    token,
    BigInt(loan_id),
    BigInt(user_id),
  );
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function adminGetLoanDocuments(
  actor: Backend,
  token: string,
  loan_id: number,
): Promise<Document[]> {
  const result = await actor.adminGetLoanDocuments(token, BigInt(loan_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapDocument);
}

export async function getLoanDocuments(
  actor: Backend,
  token: string,
  loan_id: number,
): Promise<Document[]> {
  const result = await actor.getLoanDocuments(token, BigInt(loan_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapDocument);
}

export async function adminAddDocument(
  actor: Backend,
  token: string,
  input: UploadDocumentInput,
): Promise<Document> {
  const beInput: BEUploadDocumentInput = {
    loan_id: BigInt(input.loan_id),
    file_url: input.file_url,
    file_name: input.file_name,
    file_size: BigInt(input.file_size),
  };
  const result = await actor.adminAddDocument(token, beInput);
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapDocument(result.ok);
}

export async function adminDeleteDocument(
  actor: Backend,
  token: string,
  doc_id: number,
): Promise<boolean> {
  const result = await actor.adminDeleteDocument(token, BigInt(doc_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}

export async function adminRejectLoan(
  actor: Backend,
  token: string,
  loan_id: number,
  reason: string,
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminRejectLoan(token, BigInt(loan_id), reason);
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function adminUnrejectLoan(
  actor: Backend,
  token: string,
  loan_id: number,
): Promise<{ ok: boolean; err?: string }> {
  const result = await actor.adminUnrejectLoan(token, BigInt(loan_id));
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}

export async function getUserDashboard(
  actor: Backend,
  token: string,
): Promise<UserDashboardStats> {
  // Compute user dashboard from getMyLoans since no dedicated backend endpoint exists
  const result = await actor.getMyLoans(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  const loans = result.ok.map((lh) => mapLoan(lh.loan));

  const activeLoans = loans.filter((l) => l.isActive && !l.isRejected).length;
  const totalValue = loans.reduce((sum, l) => sum + l.loanAmount, 0);

  const stageMap = new Map<string, number>();
  for (const loan of loans) {
    if (!loan.isRejected) {
      const stageName =
        loan.currentStage >= 0 ? `Stage ${loan.currentStage + 1}` : "Unknown";
      stageMap.set(stageName, (stageMap.get(stageName) ?? 0) + 1);
    }
  }

  const recentLoans = loans.slice(-5).reverse();

  return {
    total_loans: loans.length,
    total_value: totalValue,
    active_loans: activeLoans,
    stage_breakdown: Array.from(stageMap.entries()),
    recent_loans: recentLoans,
  };
}
