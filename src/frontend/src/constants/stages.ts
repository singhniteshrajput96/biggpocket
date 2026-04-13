export const LOAN_STAGES = [
  "Documentation",
  "Sent to Bank",
  "Login Done",
  "PD (Personal Discussion)",
  "Credit & Valuation",
  "Recommended for Loan",
  "Sanctioned",
  "Disbursement",
  "Post Disbursement Documentation",
  "Payout Received",
] as const;

export type LoanStage = (typeof LOAN_STAGES)[number];

export const STAGE_COUNT = LOAN_STAGES.length;

export const REJECTED_STAGE_LABEL = "Rejected";
export const REJECTED_COLOR = "#dc2626";

export function isRejected(loan: { isRejected?: boolean }): boolean {
  return loan.isRejected === true;
}
