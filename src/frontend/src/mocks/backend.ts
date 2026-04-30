import type { backendInterface } from "../backend";
import { Role } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleHistory = [
  {
    id: BigInt(1),
    loan_id: BigInt(1),
    stage_index: BigInt(0),
    stage_name: "Documentation",
    remarks: "Documents received and verified.",
    show_remarks_to_user: true,
    timestamp: now - BigInt(7 * 24 * 3600 * 1e9),
    updated_by_admin_id: BigInt(0),
  },
  {
    id: BigInt(2),
    loan_id: BigInt(1),
    stage_index: BigInt(1),
    stage_name: "Sent to Bank",
    remarks: "Application forwarded to HDFC Bank.",
    show_remarks_to_user: true,
    timestamp: now - BigInt(5 * 24 * 3600 * 1e9),
    updated_by_admin_id: BigInt(0),
  },
  {
    id: BigInt(3),
    loan_id: BigInt(1),
    stage_index: BigInt(2),
    stage_name: "Login Done",
    remarks: "Login completed successfully.",
    show_remarks_to_user: true,
    timestamp: now - BigInt(3 * 24 * 3600 * 1e9),
    updated_by_admin_id: BigInt(0),
  },
];

const baseLoanFields = {
  distribution_partner: "",
  co_applicant_name: "",
  employment_type: "Salaried",
  income: BigInt(0),
  property_type: "",
  property_value: BigInt(0),
  is_rejected: false,
  rejection_reason: "",
  rejection_stage: BigInt(0),
  required_amount: BigInt(0),
  sanction_amount: BigInt(0),
  disbursed_amount: BigInt(0),
};

const sampleLoan1 = {
  loan: {
    id: BigInt(1),
    applicant_name: "Rahul Sharma",
    bank_name: "HDFC Bank",
    loan_type: "Home Loan",
    loan_amount: BigInt(5000000),
    current_stage: BigInt(2),
    is_active: true,
    user_id: BigInt(1),
    created_at: now - BigInt(8 * 24 * 3600 * 1e9),
    updated_at: now - BigInt(3 * 24 * 3600 * 1e9),
    ...baseLoanFields,
  },
  history: sampleHistory,
  assigned_user_ids: [BigInt(1)],
};

const sampleLoan2 = {
  loan: {
    id: BigInt(2),
    applicant_name: "Priya Patel",
    bank_name: "SBI Bank",
    loan_type: "Personal Loan",
    loan_amount: BigInt(800000),
    current_stage: BigInt(6),
    is_active: true,
    user_id: BigInt(2),
    created_at: now - BigInt(20 * 24 * 3600 * 1e9),
    updated_at: now - BigInt(1 * 24 * 3600 * 1e9),
    ...baseLoanFields,
  },
  history: [
    ...sampleHistory,
    {
      id: BigInt(4),
      loan_id: BigInt(2),
      stage_index: BigInt(6),
      stage_name: "Sanctioned",
      remarks: "Loan sanctioned by bank.",
      show_remarks_to_user: true,
      timestamp: now - BigInt(1 * 24 * 3600 * 1e9),
      updated_by_admin_id: BigInt(0),
    },
  ],
  assigned_user_ids: [BigInt(2)],
};

const sampleLoan3 = {
  loan: {
    id: BigInt(3),
    applicant_name: "Anil Kumar",
    bank_name: "ICICI Bank",
    loan_type: "Business Loan",
    loan_amount: BigInt(2500000),
    current_stage: BigInt(9),
    is_active: true,
    user_id: BigInt(3),
    created_at: now - BigInt(40 * 24 * 3600 * 1e9),
    updated_at: now - BigInt(2 * 24 * 3600 * 1e9),
    ...baseLoanFields,
  },
  history: sampleHistory,
  assigned_user_ids: [BigInt(3)],
};

export const mockBackend: backendInterface = {
  sendOTP: async (_mobile: string) => {
    return "123456";
  },

  verifyOTP: async (_mobile: string, _otp: string) => {
    return {
      __kind__: "ok" as const,
      ok: {
        token: "mock-admin-token-abc123",
        userId: BigInt(0),
        name: "Admin",
        role: "admin",
      },
    };
  },

  getMyLoans: async (_token: string) => {
    return {
      __kind__: "ok" as const,
      ok: [sampleLoan1, sampleLoan2],
    };
  },

  getLoanById: async (_token: string, _loanId: bigint) => {
    return {
      __kind__: "ok" as const,
      ok: sampleLoan1,
    };
  },

  getLoanDocuments: async (_token: string, _loanId: bigint) => {
    return { __kind__: "ok" as const, ok: [] };
  },

  adminGetAllLoans: async (_token, _page, _pageSize, _search, _stageFilter, _userFilter) => {
    return {
      __kind__: "ok" as const,
      ok: {
        total: BigInt(3),
        page: BigInt(1),
        pageSize: BigInt(10),
        loans: [sampleLoan1, sampleLoan2, sampleLoan3],
      },
    };
  },

  adminGetDashboardStats: async (_token: string) => {
    return {
      __kind__: "ok" as const,
      ok: {
        total_loans: BigInt(3),
        active_loans: BigInt(2),
        disbursed_count: BigInt(1),
        sanctioned_count: BigInt(1),
        rejected_loans: BigInt(0),
        stage_breakdown: [
          [BigInt(2), "Login Done", BigInt(1)],
          [BigInt(6), "Sanctioned", BigInt(1)],
          [BigInt(9), "Payout Received", BigInt(1)],
        ] as Array<[bigint, string, bigint]>,
        sanctioned_percent: 66.7,
        disbursement_percent: 33.3,
        dropoff_rate: 0.0,
        recent_activity: sampleHistory,
        total_disbursed_amount: BigInt(2500000),
        total_sanctioned_amount: BigInt(800000),
      },
    };
  },

  adminCreateLoan: async (_token, _name, _bank, _type, _amount, _mobile, _dp, _co, _emp, _inc, _pt, _pv, _req, _sanc, _disb) => {
    return { __kind__: "ok" as const, ok: BigInt(4) };
  },

  adminUpdateLoan: async (_token, _id, _input) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminUpdateStage: async (_token, _id, _stage, _remarks, _show) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminAssignUser: async (_token, _id, _mobile) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminDeleteLoan: async (_token, _id) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminCreateUser: async (_token, _name, _mobile, _role) => {
    return {
      __kind__: "ok" as const,
      ok: {
        id: BigInt(99),
        name: _name,
        role: _role === "admin" ? Role.admin : Role.user,
        user_type: "internal",
      },
    };
  },

  adminGetAllUsers: async (_token) => {
    return {
      __kind__: "ok" as const,
      ok: [
        {
          id: BigInt(1),
          name: "Rahul Sharma",
          role: Role.user,
          user_type: "internal",
        },
        {
          id: BigInt(2),
          name: "Priya Patel",
          role: Role.user,
          user_type: "internal",
        },
        {
          id: BigInt(3),
          name: "Anil Kumar",
          role: Role.user,
          user_type: "external",
        },
      ],
    };
  },

  adminGetUserById: async (_token, _userId) => {
    return {
      __kind__: "ok" as const,
      ok: {
        id: BigInt(1),
        name: "Rahul Sharma",
        role: Role.user,
        user_type: "internal",
      },
    };
  },

  adminUpdateAdminMobile: async (_token, _mobile) => {
    return { __kind__: "ok" as const, ok: "Mobile updated" };
  },

  adminAssignMultipleUsers: async (_token, _loanId, _userIds) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminAddUserToLoan: async (_token, _loanId, _userId) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminRemoveUserFromLoan: async (_token, _loanId, _userId) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminGetLoanDocuments: async (_token, _loanId) => {
    return { __kind__: "ok" as const, ok: [] };
  },

  adminAddDocument: async (_token, _input) => {
    return {
      __kind__: "ok" as const,
      ok: {
        id: BigInt(1),
        loan_id: _input.loan_id,
        file_name: _input.file_name,
        file_url: _input.file_url,
        file_size: _input.file_size,
        uploaded_at: now,
        uploaded_by: BigInt(0),
      },
    };
  },

  adminDeleteDocument: async (_token, _docId) => {
    return { __kind__: "ok" as const, ok: true };
  },

  adminRejectLoan: async (_token, _loanId, _reason) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminUnrejectLoan: async (_token, _loanId) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminDeleteUser: async (_token, _userId) => {
    return { __kind__: "ok" as const, ok: null };
  },

  adminUpdateUserType: async (_token, _userId, _userType) => {
    return {
      __kind__: "ok" as const,
      ok: {
        id: _userId,
        name: "User",
        role: Role.user,
        user_type: _userType,
      },
    };
  },

  getUserDashboard: async (_token: string) => {
    return {
      __kind__: "ok" as const,
      ok: {
        total_loans: BigInt(2),
        total_value: BigInt(5800000),
        active_loans: BigInt(2),
        stage_breakdown: [
          ["Login Done", BigInt(1)],
          ["Sanctioned", BigInt(1)],
        ] as Array<[string, bigint]>,
        recent_loans: [sampleLoan1.loan, sampleLoan2.loan],
        total_disbursed_amount: BigInt(0),
        total_sanctioned_amount: BigInt(800000),
      },
    };
  },

  adminGetDeletedLoans: async (_token: string) => {
    return { __kind__: "ok" as const, ok: [] };
  },

  adminRestoreLoan: async (_token: string, _loanId: bigint) => {
    return { __kind__: "ok" as const, ok: null };
  },
};
