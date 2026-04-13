import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DashboardStats {
    total_loans: bigint;
    sanctioned_count: bigint;
    rejected_loans: bigint;
    stage_breakdown: Array<[bigint, string, bigint]>;
    disbursement_percent: number;
    active_loans: bigint;
    recent_activity: Array<LoanStageHistory>;
    sanctioned_percent: number;
    dropoff_rate: number;
    disbursed_count: bigint;
}
export type UserId = bigint;
export type Timestamp = bigint;
export interface LoanStageHistory {
    id: bigint;
    loan_id: bigint;
    stage_index: bigint;
    show_remarks_to_user: boolean;
    timestamp: Timestamp;
    updated_by_admin_id: bigint;
    stage_name: string;
    remarks: string;
}
export interface PaginatedLoans {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    loans: Array<LoanWithHistory>;
}
export interface Document {
    id: bigint;
    loan_id: bigint;
    file_name: string;
    file_url: string;
    file_size: bigint;
    uploaded_at: Timestamp;
    uploaded_by: bigint;
}
export type Token = string;
export interface LoanApplication {
    id: bigint;
    co_applicant_name: string;
    bank_name: string;
    updated_at: Timestamp;
    current_stage: bigint;
    is_rejected: boolean;
    employment_type: string;
    created_at: Timestamp;
    user_id?: UserId;
    loan_amount: bigint;
    loan_type: string;
    income: bigint;
    rejection_stage: bigint;
    property_value: bigint;
    distribution_partner: string;
    property_type: string;
    is_active: boolean;
    rejection_reason: string;
    applicant_name: string;
}
export interface PublicUser {
    id: UserId;
    name: string;
    role: Role;
}
export interface LoanWithHistory {
    loan: LoanApplication;
    history: Array<LoanStageHistory>;
    assigned_user_ids: Array<bigint>;
}
export interface UploadDocumentInput {
    loan_id: bigint;
    file_name: string;
    file_url: string;
    file_size: bigint;
}
export enum Role {
    admin = "admin",
    user = "user"
}
export interface backendInterface {
    adminAddDocument(token: string, input: UploadDocumentInput): Promise<{
        __kind__: "ok";
        ok: Document;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminAddUserToLoan(token: string, loanId: bigint, userId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminAssignMultipleUsers(token: string, loanId: bigint, userIds: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminAssignUser(token: string, loanId: bigint, mobile: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateLoan(token: string, applicantName: string, bankName: string, loanType: string, loanAmount: bigint, mobile: string, distributionPartner: string, coApplicantName: string, employmentType: string, income: bigint, propertyType: string, propertyValue: bigint): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateUser(token: string, name: string, mobile: string, role: string): Promise<{
        __kind__: "ok";
        ok: PublicUser;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteDocument(token: string, docId: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteLoan(token: string, loanId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetAllLoans(token: string, page: bigint, pageSize: bigint, search: string, stageFilter: bigint | null, assignedUserFilter: bigint | null): Promise<{
        __kind__: "ok";
        ok: PaginatedLoans;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetAllUsers(token: string): Promise<{
        __kind__: "ok";
        ok: Array<PublicUser>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetDashboardStats(token: string): Promise<{
        __kind__: "ok";
        ok: DashboardStats;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetLoanDocuments(token: string, loanId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<Document>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetUserById(token: string, user_id: bigint): Promise<{
        __kind__: "ok";
        ok: PublicUser | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminRejectLoan(token: string, loanId: bigint, reason: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminRemoveUserFromLoan(token: string, loanId: bigint, userId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUnrejectLoan(token: string, loanId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateAdminMobile(token: string, new_mobile: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateLoan(token: string, loanId: bigint, applicantName: string, bankName: string, loanType: string, loanAmount: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateStage(token: string, loanId: bigint, stageIndex: bigint, remarks: string, showRemarks: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getLoanById(token: string, loanId: bigint): Promise<{
        __kind__: "ok";
        ok: LoanWithHistory;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getLoanDocuments(token: string, loanId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<Document>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyLoans(token: string): Promise<{
        __kind__: "ok";
        ok: Array<LoanWithHistory>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendOTP(mobile: string): Promise<string>;
    verifyOTP(mobile: string, otp: string): Promise<{
        __kind__: "ok";
        ok: {
            token: Token;
            userId: UserId;
            name: string;
            role: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
}
