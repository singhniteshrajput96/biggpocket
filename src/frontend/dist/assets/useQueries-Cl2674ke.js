var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { e as Subscribable, f as shallowEqualObjects, h as hashKey, i as getDefaultState, n as notifyManager, u as useQueryClient, r as reactExports, k as noop, m as shouldThrowError, g as getToken } from "./index-DmlGt2ze.js";
import { a as useQuery, u as useActor, b as adminCreateLoan, d as adminUpdateLoan, e as adminAddDocument, f as adminDeleteDocument, h as adminRemoveUserFromLoan, i as adminUpdateStage, j as adminUnrejectLoan, k as adminAddUserToLoan, l as adminRejectLoan, m as adminDeleteLoan, n as adminCreateUser, o as adminUpdateAdminMobile, c as createActor, p as getMyLoans, g as getLoanById, q as adminGetAllLoans, r as adminGetDashboardStats, t as adminGetAllUsers, w as adminGetLoanDocuments, x as getLoanDocuments } from "./api-BzzkbRdq.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useBackendActor() {
  return useActor(createActor);
}
function useGetMyLoans() {
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
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useGetLoanById(loanId) {
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
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useAdminGetAllLoans(page, pageSize, search, stageFilter, assignedUserFilter = null) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: [
      "adminLoans",
      page,
      pageSize,
      search,
      stageFilter,
      assignedUserFilter
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
        assignedUserFilter
      );
    },
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useAdminGetDashboardStats() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const t = getToken();
      if (!actor || !t) throw new Error("Not authenticated");
      return adminGetDashboardStats(actor, t);
    },
    // Only block while actor is actively initializing — once actor is ready,
    // run the query even if the token snapshot was taken before auth settled.
    enabled: !!actor && !actorFetching,
    retry: 3,
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useAdminCreateLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
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
        params.propertyValue
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useAdminUpdateStage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateStage(
        actor,
        token,
        params.loanId,
        params.stageIndex,
        params.remarks,
        params.showRemarks
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loanId] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useAdminUpdateLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateLoan(
        actor,
        token,
        params.loanId,
        params.applicantName,
        params.bankName,
        params.loanType,
        params.loanAmount
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loanId] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    }
  });
}
function useAdminDeleteLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loanId) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminDeleteLoan(actor, token, loanId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useAdminCreateUser() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminCreateUser(
        actor,
        token,
        params.name,
        params.mobile,
        params.role
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    }
  });
}
function useAdminGetAllUsers() {
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
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useAdminUpdateAdminMobile() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (newMobile) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUpdateAdminMobile(actor, token, newMobile);
    }
  });
}
function useAdminAddUserToLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAddUserToLoan(actor, token, params.loan_id, params.user_id);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    }
  });
}
function useAdminRemoveUserFromLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminRemoveUserFromLoan(
        actor,
        token,
        params.loan_id,
        params.user_id
      );
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
    }
  });
}
function useAdminGetLoanDocuments(loanId) {
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
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useGetLoanDocuments(loanId) {
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
    retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 8e3),
    staleTime: 3e4
  });
}
function useAdminAddDocument() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminAddDocument(actor, token, input);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({
        queryKey: ["adminDocs", vars.loan_id]
      });
      void queryClient.invalidateQueries({ queryKey: ["docs", vars.loan_id] });
    }
  });
}
function useAdminDeleteDocument() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminDeleteDocument(actor, token, params.doc_id);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({
        queryKey: ["adminDocs", vars.loan_id]
      });
    }
  });
}
function useAdminRejectLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminRejectLoan(actor, token, params.loan_id, params.reason);
    },
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", vars.loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useAdminUnrejectLoan() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loan_id) => {
      const token = getToken();
      if (!actor || !token) throw new Error("Not authenticated");
      return adminUnrejectLoan(actor, token, loan_id);
    },
    onSuccess: (_data, loan_id) => {
      void queryClient.invalidateQueries({ queryKey: ["loan", loan_id] });
      void queryClient.invalidateQueries({ queryKey: ["adminLoans"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
export {
  useAdminGetAllUsers as a,
  useAdminGetAllLoans as b,
  useAdminDeleteLoan as c,
  useAdminCreateLoan as d,
  useGetLoanById as e,
  useAdminUpdateLoan as f,
  useAdminGetLoanDocuments as g,
  useAdminAddDocument as h,
  useAdminDeleteDocument as i,
  useAdminRemoveUserFromLoan as j,
  useAdminUpdateStage as k,
  useAdminUnrejectLoan as l,
  useAdminAddUserToLoan as m,
  useAdminRejectLoan as n,
  useAdminCreateUser as o,
  useAdminUpdateAdminMobile as p,
  useGetMyLoans as q,
  useGetLoanDocuments as r,
  useAdminGetDashboardStats as u
};
