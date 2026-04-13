import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  adminAddDocument,
  adminAddUserToLoan,
  adminAssignMultipleUsers,
  adminAssignUser,
  adminCreateLoan,
  adminCreateUser,
  adminDeleteDocument,
  adminDeleteLoan,
  adminGetAllLoans,
  adminGetAllUsers,
  adminGetDashboardStats,
  adminGetLoanDocuments,
  adminRejectLoan,
  adminRemoveUserFromLoan,
  adminUnrejectLoan,
  adminUpdateAdminMobile,
  adminUpdateLoan,
  adminUpdateStage,
  getLoanById,
  getLoanDocuments,
  getMyLoans,
  getUserDashboard,
} from "../lib/api";
import { getToken } from "../lib/auth";
import type { UploadDocumentInput } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useGetMyLoans() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myLoans"],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) return [];
      return getMyLoans(actor, t);
    },
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useGetLoanById(loanId: number) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["loan", loanId],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return getLoanById(actor, t, loanId);
    },
    enabled: !!actor && !actorFetching && loanId > 0,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useAdminGetAllLoans(
  page: number,
  pageSize: number,
  search: string,
  stageFilter: number | null,
  assignedUserFilter: number | null = null,
) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: [
      "adminLoans",
      page,
      pageSize,
      search,
      stageFilter,
      assignedUserFilter,
    ],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return adminGetAllLoans(
        actor,
        t,
        page,
        pageSize,
        search,
        stageFilter,
        assignedUserFilter,
      );
    },
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useAdminGetDashboardStats() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const t = getToken(); // re-read at call time to avoid stale closure
      if (!actor || !t) throw new Error("Not authenticated");
      return adminGetDashboardStats(actor, t);
    },
    // Only block while actor is actively initializing — once actor is ready,
    // run the query even if the token snapshot was taken before auth settled.
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useAdminCreateLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      applicantName: string;
      bankName: string;
      loanType: string;
      loanAmount: number;
      mobile: string;
      distributionPartner?: string;
      coApplicantName?: string;
      employmentType?: string;
      income?: number;
      propertyType?: string;
      propertyValue?: number;
    }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminCreateLoan(
        actor,
        token,
        params.applicantName,
        params.bankName,
        params.loanType,
        params.loanAmount,
        params.mobile,
        params.distributionPartner,
        params.coApplicantName,
        params.employmentType,
        params.income,
        params.propertyType,
        params.propertyValue,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAdminUpdateStage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      loanId: number;
      stageIndex: number;
      remarks: string;
      showRemarks: boolean;
    }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateStage(
        actor,
        token,
        params.loanId,
        params.stageIndex,
        params.remarks,
        params.showRemarks,
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loanId] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAdminUpdateLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      loanId: number;
      applicantName: string;
      bankName: string;
      loanType: string;
      loanAmount: number;
    }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateLoan(
        actor,
        token,
        params.loanId,
        params.applicantName,
        params.bankName,
        params.loanType,
        params.loanAmount,
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loanId] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    },
  });
}

export function useAdminAssignUser() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { loanId: number; mobile: string }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAssignUser(actor, token, params.loanId, params.mobile);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loanId] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    },
  });
}

export function useAdminDeleteLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loanId: number) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminDeleteLoan(actor, token, loanId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAdminCreateUser() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      mobile: string;
      role: "admin" | "user";
    }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminCreateUser(
        actor,
        token,
        params.name,
        params.mobile,
        params.role,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}

export function useAdminGetAllUsers() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return adminGetAllUsers(actor, t);
    },
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useAdminUpdateAdminMobile() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (newMobile: string) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateAdminMobile(actor, token, newMobile);
    },
  });
}

export function useAdminAssignMultipleUsers() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { loan_id: number; user_ids: number[] }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAssignMultipleUsers(
        actor,
        token,
        params.loan_id,
        params.user_ids,
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    },
  });
}

export function useAdminAddUserToLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { loan_id: number; user_id: number }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAddUserToLoan(actor, token, params.loan_id, params.user_id);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    },
  });
}

export function useAdminRemoveUserFromLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { loan_id: number; user_id: number }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminRemoveUserFromLoan(
        actor,
        token,
        params.loan_id,
        params.user_id,
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    },
  });
}

export function useAdminGetLoanDocuments(loanId: number) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminDocs", loanId],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return adminGetLoanDocuments(actor, t, loanId);
    },
    enabled: !!actor && !actorFetching && loanId > 0,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useGetLoanDocuments(loanId: number) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["docs", loanId],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return getLoanDocuments(actor, t, loanId);
    },
    enabled: !!actor && !actorFetching && loanId > 0,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}

export function useAdminAddDocument() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UploadDocumentInput) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAddDocument(actor, token, input);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({
        queryKey: ["adminDocs", vars.loan_id],
      });
      void queryClient.invalidateQueries({ queryKey: ["docs", vars.loan_id] });
    },
  });
}

export function useAdminDeleteDocument() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { doc_id: number; loan_id: number }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminDeleteDocument(actor, token, params.doc_id);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({
        queryKey: ["adminDocs", vars.loan_id],
      });
    },
  });
}

export function useAdminRejectLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { loan_id: number; reason: string }) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminRejectLoan(actor, token, params.loan_id, params.reason);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAdminUnrejectLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loan_id: number) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUnrejectLoan(actor, token, loan_id);
    },
    onSuccess: (_data, loan_id) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useGetUserDashboard() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return getUserDashboard(actor, t);
    },
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    staleTime: 30_000,
  });
}
