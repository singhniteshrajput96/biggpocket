import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, l as loadConfig, H as HttpAgent, S as StorageClient, X, F as FileText } from "./index-DmlGt2ze.js";
import { B as Badge } from "./badge-DJ6ESDy9.js";
import { B as Button } from "./button-BNrAkQWu.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-UU8wv2cG.js";
import { I as Input } from "./input-BjUtQbbX.js";
import { P as Primitive, L as Label } from "./label-C5IuSAim.js";
import { a as cn } from "./utils-DdB4LPY_.js";
import { S as Skeleton } from "./skeleton-Ba6rVojZ.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { e as useGetLoanById, c as useAdminDeleteLoan, f as useAdminUpdateLoan, g as useAdminGetLoanDocuments, h as useAdminAddDocument, i as useAdminDeleteDocument, a as useAdminGetAllUsers, j as useAdminRemoveUserFromLoan, k as useAdminUpdateStage, l as useAdminUnrejectLoan, m as useAdminAddUserToLoan, n as useAdminRejectLoan } from "./useQueries-Cl2674ke.js";
import { T as TriangleAlert } from "./triangle-alert-CpyxfpGx.js";
import { A as ArrowLeft, P as Printer, F as FolderOpen, D as Download } from "./printer-B3TScLux.js";
import { C as ChevronRight } from "./chevron-right-Ds-ykgmq.js";
import { C as CircleX } from "./circle-x-BXNnGoMz.js";
import { T as Trash2 } from "./trash-2-DvdpQ4_N.js";
import { L as LoaderCircle } from "./loader-circle-D_82ObDR.js";
import { E as Eye } from "./eye-B1DFrCzV.js";
import { E as EyeOff } from "./eye-off-CGh5hkOO.js";
import { U as UserPlus } from "./user-plus-CGVtOyOI.js";
import { C as ChevronDown } from "./chevron-down-C7pxtJTh.js";
import "./api-BzzkbRdq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function useStorageUpload() {
  const clientRef = reactExports.useRef(null);
  const uploadFile = reactExports.useCallback(
    async (file, onProgress) => {
      var _a;
      if (!clientRef.current) {
        const config = await loadConfig();
        const agent = new HttpAgent({ host: config.backend_host });
        if ((_a = config.backend_host) == null ? void 0 : _a.includes("localhost")) {
          await agent.fetchRootKey().catch(() => {
          });
        }
        clientRef.current = new StorageClient(
          config.bucket_name,
          config.storage_gateway_url,
          config.backend_canister_id,
          config.project_id,
          agent
        );
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await clientRef.current.putFile(bytes, onProgress);
      const url = await clientRef.current.getDirectURL(hash);
      return url;
    },
    []
  );
  return { uploadFile };
}
function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function formatTs(ts) {
  return new Date(ts / 1e6).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}
function StageBadge({
  stageIndex,
  size = "md"
}) {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-indigo-100 text-indigo-700",
    "bg-violet-100 text-violet-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-orange-100 text-orange-700",
    "bg-green-100 text-green-700",
    "bg-teal-100 text-teal-700",
    "bg-cyan-100 text-cyan-700",
    "bg-emerald-100 text-emerald-700"
  ];
  const cls = size === "sm" ? "px-2 py-0.5 rounded-full text-xs font-semibold" : "px-3 py-1 rounded-full text-sm font-semibold";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center ${cls} ${colors[stageIndex] ?? "bg-muted text-foreground"}`,
      children: LOAN_STAGES[stageIndex] ?? `Stage ${stageIndex + 1}`
    }
  );
}
function RejectLoanModal({
  loanId,
  onClose
}) {
  const [reason, setReason] = reactExports.useState("");
  const [err, setErr] = reactExports.useState("");
  const rejectMutation = useAdminRejectLoan();
  async function handleReject() {
    if (!reason.trim()) {
      setErr("Rejection reason is required.");
      return;
    }
    setErr("");
    try {
      await rejectMutation.mutateAsync({
        loan_id: loanId,
        reason: reason.trim()
      });
      onClose();
    } catch (e) {
      setErr(e.message ?? "Failed to reject loan.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/40 animate-fade-in",
        onClick: onClose,
        onKeyDown: (e) => {
          if (e.key === "Escape") onClose();
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18, className: "text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            "Mark Loan #",
            loanId,
            " as Rejected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This can be undone later. Provide a reason." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
          "Rejection Reason ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "e.g. Credit score below threshold, incomplete documentation...",
            value: reason,
            onChange: (e) => {
              setReason(e.target.value);
              setErr("");
            },
            rows: 3,
            "data-ocid": "reject-reason-input"
          }
        )
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
        err
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            disabled: rejectMutation.isPending,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "flex-1 text-white bg-red-600 hover:bg-red-700 border-red-600",
            onClick: handleReject,
            disabled: rejectMutation.isPending,
            "data-ocid": "reject-confirm-btn",
            children: [
              rejectMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14, className: "mr-1" }),
              "Mark Rejected"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function AddUserModal({
  loanId,
  existingUserIds,
  allUsers,
  onClose
}) {
  const [mobile, setMobile] = reactExports.useState("");
  const [err, setErr] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const addMutation = useAdminAddUserToLoan();
  const availableUsers = allUsers.filter(
    (u) => !existingUserIds.includes(u.id) && u.role !== "admin"
  );
  async function handleAdd(userId) {
    setErr("");
    try {
      await addMutation.mutateAsync({ loan_id: loanId, user_id: userId });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 800);
    } catch (e) {
      setErr(e.message ?? "Failed to add user.");
    }
  }
  const filtered = mobile.trim() ? availableUsers.filter(
    (u) => u.name.toLowerCase().includes(mobile.toLowerCase())
  ) : availableUsers;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/40 animate-fade-in",
        onClick: onClose,
        onKeyDown: (e) => {
          if (e.key === "Escape") onClose();
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-semibold text-foreground", children: "Add User to Loan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md",
            "aria-label": "Close",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name...",
            value: mobile,
            onChange: (e) => setMobile(e.target.value),
            "data-ocid": "add-user-search"
          }
        ),
        success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm flex items-center gap-1.5",
            style: { color: "#22c55e" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }),
              "User added successfully"
            ]
          }
        ),
        err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
          err
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-56 overflow-y-auto space-y-1", children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: availableUsers.length === 0 ? "All users are already assigned." : "No users match your search." }),
          filtered.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-smooth text-left",
              onClick: () => handleAdd(u.id),
              disabled: addMutation.isPending,
              "data-ocid": `add-user-${u.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: u.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: u.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  UserPlus,
                  {
                    size: 14,
                    className: "text-muted-foreground shrink-0"
                  }
                )
              ]
            },
            u.id
          ))
        ] })
      ] })
    ] }) })
  ] });
}
function LoanInfoCard({ loan, loanId }) {
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    applicantName: loan.applicantName,
    bankName: loan.bankName,
    loanType: loan.loanType,
    loanAmount: String(loan.loanAmount),
    coApplicantName: loan.coApplicantName ?? "",
    distributionPartner: loan.distributionPartner ?? "",
    employmentType: loan.employmentType ?? "",
    income: loan.income ? String(loan.income) : "",
    propertyType: loan.propertyType ?? "",
    propertyValue: loan.propertyValue ? String(loan.propertyValue) : ""
  });
  const [err, setErr] = reactExports.useState("");
  const updateLoan = useAdminUpdateLoan();
  async function handleSave() {
    const amt = Number(form.loanAmount);
    if (!form.applicantName.trim() || !form.bankName.trim() || !form.loanType.trim()) {
      setErr("Applicant name, bank name, and loan type are required.");
      return;
    }
    if (Number.isNaN(amt) || amt <= 0) {
      setErr("Enter a valid loan amount.");
      return;
    }
    setErr("");
    try {
      await updateLoan.mutateAsync({
        loanId,
        applicantName: form.applicantName.trim(),
        bankName: form.bankName.trim(),
        loanType: form.loanType.trim(),
        loanAmount: amt
      });
      setEditing(false);
    } catch (e) {
      setErr(e.message ?? "Failed to save changes.");
    }
  }
  function textField(key, label, display, type = "text") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: label }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: form[key],
          onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
          type,
          "data-ocid": `detail-edit-${key}`
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: display || "—" })
    ] }, key);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Loan Information" }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => {
              setEditing(false);
              setErr("");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
              "Cancel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleSave,
            disabled: updateLoan.isPending,
            className: "text-white",
            style: { backgroundColor: "#f97316" },
            "data-ocid": "detail-save-btn",
            children: [
              updateLoan.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, className: "mr-1" }),
              "Save"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => setEditing(true),
          "data-ocid": "detail-edit-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14, className: "mr-1" }),
            "Edit"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Loan ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono font-semibold text-foreground", children: [
            "#",
            loan.id
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: formatTs(loan.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Last Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: formatTs(loan.updatedAt) })
        ] }),
        loan.rejectionStage !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Rejected at Stage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: LOAN_STAGES[loan.rejectionStage] ?? `Stage ${loan.rejectionStage + 1}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border", children: [
        textField("applicantName", "Applicant Name", loan.applicantName),
        textField(
          "coApplicantName",
          "Co-Applicant Name",
          loan.coApplicantName ?? ""
        ),
        textField("bankName", "Bank Name", loan.bankName),
        textField("loanType", "Loan Type", loan.loanType),
        textField(
          "loanAmount",
          "Loan Amount (₹)",
          formatCurrency(loan.loanAmount),
          "number"
        ),
        textField(
          "distributionPartner",
          "Distribution Partner",
          loan.distributionPartner ?? ""
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Applicant Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Employment Type" }),
            editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground",
                value: form.employmentType,
                onChange: (e) => setForm((f) => ({ ...f, employmentType: e.target.value })),
                "data-ocid": "detail-edit-employmentType",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Salary", children: "Salaried" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Business", children: "Business / Self-Employed" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: loan.employmentType || "—" })
          ] }),
          textField(
            "income",
            "Monthly Income (₹)",
            loan.income ? formatCurrency(loan.income) : "—",
            "number"
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Property Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          textField(
            "propertyType",
            "Property Type",
            loan.propertyType ?? ""
          ),
          textField(
            "propertyValue",
            "Market Value (₹)",
            loan.propertyValue ? formatCurrency(loan.propertyValue) : "—",
            "number"
          )
        ] })
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
        err
      ] })
    ] })
  ] });
}
function AssignedUsersCard({
  loanId,
  assignedUserIds
}) {
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const { data: allUsers = [] } = useAdminGetAllUsers();
  const removeMutation = useAdminRemoveUserFromLoan();
  const [removingId, setRemovingId] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState("");
  const userMap = new Map(allUsers.map((u) => [u.id, u]));
  async function handleRemove(userId) {
    setRemovingId(userId);
    setErr("");
    try {
      await removeMutation.mutateAsync({ loan_id: loanId, user_id: userId });
    } catch (e) {
      setErr(e.message ?? "Failed to remove user.");
    } finally {
      setRemovingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddUserModal,
      {
        loanId,
        existingUserIds: assignedUserIds,
        allUsers,
        onClose: () => setShowAddModal(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16, style: { color: "#3b82f6" } }),
          "Assigned Users"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setShowAddModal(true),
            "data-ocid": "detail-add-user-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 13, className: "mr-1" }),
              "Add"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        assignedUserIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic py-2 text-center", children: "No users assigned yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: assignedUserIds.map((uid) => {
          const user = userMap.get(uid);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
              style: { backgroundColor: "#eff6ff", color: "#1d4ed8" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (user == null ? void 0 : user.name) ?? `User #${uid}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemove(uid),
                    disabled: removingId === uid,
                    className: "rounded-full hover:bg-blue-200 transition-smooth p-0.5 ml-0.5",
                    "aria-label": `Remove ${(user == null ? void 0 : user.name) ?? uid}`,
                    "data-ocid": `remove-user-${uid}`,
                    children: removingId === uid ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 10, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { size: 10 })
                  }
                )
              ]
            },
            uid
          );
        }) }),
        err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
          err
        ] })
      ] })
    ] })
  ] });
}
function RejectActionCard({ loan }) {
  const [showRejectModal, setShowRejectModal] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const unrejectMutation = useAdminUnrejectLoan();
  async function handleUnreject() {
    setErr("");
    try {
      await unrejectMutation.mutateAsync(loan.id);
    } catch (e) {
      setErr(e.message ?? "Failed to remove rejection.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showRejectModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RejectLoanModal,
      {
        loanId: loan.id,
        onClose: () => setShowRejectModal(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16, className: "text-red-600" }),
        "Rejection Status"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        loan.isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-red-700 uppercase tracking-wider", children: "Loan Rejected" }),
            loan.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-800", children: loan.rejectionReason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "w-full text-red-600 border-red-200 hover:bg-red-50",
              onClick: handleUnreject,
              disabled: unrejectMutation.isPending,
              "data-ocid": "detail-unreject-btn",
              children: [
                unrejectMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13, className: "mr-1" }),
                "Remove Rejection"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "w-full text-white bg-red-600 hover:bg-red-700 border-red-600",
            onClick: () => setShowRejectModal(true),
            "data-ocid": "detail-reject-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 13, className: "mr-1" }),
              "Mark as Rejected"
            ]
          }
        ),
        err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
          err
        ] })
      ] })
    ] })
  ] });
}
function StageUpdateCard({
  loanId,
  currentStage
}) {
  const [selectedStage, setSelectedStage] = reactExports.useState(currentStage);
  const [remarks, setRemarks] = reactExports.useState("");
  const [showToUser, setShowToUser] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState("");
  const updateStage = useAdminUpdateStage();
  async function handleUpdate() {
    setErr("");
    setSuccess(false);
    try {
      await updateStage.mutateAsync({
        loanId,
        stageIndex: selectedStage,
        remarks,
        showRemarks: showToUser
      });
      setSuccess(true);
      setRemarks("");
      setTimeout(() => setSuccess(false), 3e3);
    } catch (e) {
      setErr(e.message ?? "Failed to update stage.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, style: { color: "#f97316" } }),
      "Update Stage"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Current Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stageIndex: currentStage })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Move to Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground",
            value: selectedStage,
            onChange: (e) => setSelectedStage(Number(e.target.value)),
            "data-ocid": "detail-stage-select",
            children: LOAN_STAGES.map((name, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: idx, children: [
              idx + 1,
              ". ",
              name
            ] }, name))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Remarks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Optional remarks about this stage update...",
            value: remarks,
            onChange: (e) => setRemarks(e.target.value),
            rows: 3,
            "data-ocid": "detail-remarks"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2.5 cursor-pointer select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-9 h-5 rounded-full transition-smooth relative",
            style: { backgroundColor: showToUser ? "#f97316" : "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-smooth ${showToUser ? "left-4" : "left-0.5"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only",
                  checked: showToUser,
                  onChange: (e) => setShowToUser(e.target.checked),
                  "data-ocid": "detail-show-remarks-toggle"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-foreground", children: [
          showToUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14, style: { color: "#f97316" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 14, className: "text-muted-foreground" }),
          "Show remarks to user"
        ] })
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
        err
      ] }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "text-sm flex items-center gap-1.5",
          style: { color: "#22c55e" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }),
            "Stage updated successfully"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full text-white",
          onClick: handleUpdate,
          disabled: updateStage.isPending,
          style: { backgroundColor: "#f97316", borderColor: "#f97316" },
          "data-ocid": "detail-update-stage-btn",
          children: [
            updateStage.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "mr-1.5" }),
            "Update Stage"
          ]
        }
      )
    ] })
  ] });
}
function StageProgressBar({
  currentStage,
  isRejected
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `shadow-card border bg-card print:shadow-none ${isRejected ? "border-red-300" : "border-border"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 py-4", children: [
        isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 rounded-lg bg-red-100 border border-red-200 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16, className: "text-red-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-700", children: "This loan has been rejected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide", children: LOAN_STAGES.map((name, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${isDone ? "text-white" : isCurrent ? "text-white ring-2 ring-offset-1" : "bg-muted text-muted-foreground"}`,
                  style: isDone ? {
                    backgroundColor: isRejected ? "#ef4444" : "#22c55e"
                  } : isCurrent ? {
                    backgroundColor: isRejected ? "#ef4444" : "#f97316"
                  } : {},
                  children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }) : idx + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[9px] font-medium text-center leading-tight max-w-[52px] truncate ${isCurrent ? "text-foreground" : "text-muted-foreground"}`,
                  children: name
                }
              )
            ] }),
            idx < LOAN_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-4 h-0.5 mx-0.5 mb-4 shrink-0 rounded",
                style: {
                  backgroundColor: idx < currentStage ? isRejected ? "#fca5a5" : "#22c55e" : "#e2e8f0"
                }
              }
            )
          ] }, name);
        }) })
      ] })
    }
  );
}
function HistoryTimeline({ history }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Stage History" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No stage history yet." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3.5 top-0 bottom-0 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: [...history].reverse().map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative flex gap-4 pl-10 pb-6 last:pb-0",
          style: { animationDelay: `${i * 0.05}s` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-2 top-0.5 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                style: {
                  backgroundColor: item.stageIndex >= 7 ? "#22c55e" : "#f97316"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: item.stageName }),
                  item.showRemarksToUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs h-4 px-1.5 gap-0.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 9 }),
                        "Visible"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs h-4 px-1.5 gap-0.5 text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 9 }),
                        "Internal"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: formatTs(item.timestamp) })
              ] }),
              item.remarks && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.remarks }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Updated by Admin #",
                item.updatedByAdminId
              ] })
            ] })
          ]
        },
        item.id
      )) })
    ] }) })
  ] });
}
function DocumentRow({
  doc,
  onDelete,
  deleting
}) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = doc.file_url;
    a.download = doc.file_name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 py-3 px-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors group",
      "data-ocid": "doc-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            style: { backgroundColor: "#fff7ed" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, style: { color: "#f97316" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: doc.file_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            formatFileSize(doc.file_size),
            " · ",
            formatTs(doc.uploaded_at)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 px-2.5 text-xs gap-1.5",
              onClick: () => window.open(doc.file_url, "_blank", "noopener,noreferrer"),
              "aria-label": `View ${doc.file_name}`,
              "data-ocid": "doc-view-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 }),
                "View"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 px-2.5 text-xs gap-1.5",
              onClick: handleDownload,
              "aria-label": `Download ${doc.file_name}`,
              "data-ocid": "doc-download-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                "Download"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity",
              onClick: () => onDelete(doc),
              disabled: deleting,
              "aria-label": `Delete ${doc.file_name}`,
              "data-ocid": "doc-delete-btn",
              children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
            }
          )
        ] })
      ]
    }
  );
}
function DocumentsSection({ loanId }) {
  const { data: docs = [], isLoading } = useAdminGetLoanDocuments(loanId);
  const addDoc = useAdminAddDocument();
  const deleteDoc = useAdminDeleteDocument();
  const { uploadFile } = useStorageUpload();
  const fileInputRef = reactExports.useRef(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [uploadErr, setUploadErr] = reactExports.useState("");
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  async function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    e.target.value = "";
    if (!file) return;
    setUploadErr("");
    setUploadProgress(0);
    try {
      const url = await uploadFile(file, (pct) => setUploadProgress(pct));
      await addDoc.mutateAsync({
        loan_id: loanId,
        file_url: url,
        file_name: file.name,
        file_size: file.size
      });
      setUploadProgress(null);
    } catch (err) {
      setUploadErr(
        err.message ?? "Upload failed. Please try again."
      );
      setUploadProgress(null);
    }
  }
  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete.id);
    setConfirmDelete(null);
    try {
      await deleteDoc.mutateAsync({
        doc_id: confirmDelete.id,
        loan_id: loanId
      });
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 16, style: { color: "#f97316" } }),
          "Documents",
          docs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs h-5 px-1.5 font-normal",
              children: docs.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "text-white gap-1.5 shrink-0",
            style: { backgroundColor: "#f97316" },
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            disabled: uploadProgress !== null,
            "data-ocid": "doc-upload-btn",
            children: [
              uploadProgress !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 13 }),
              "Upload"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            className: "sr-only",
            onChange: handleFileChange,
            "aria-label": "Upload document",
            "data-ocid": "doc-file-input"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        uploadProgress !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                LoaderCircle,
                {
                  size: 12,
                  className: "animate-spin",
                  style: { color: "#f97316" }
                }
              ),
              "Uploading…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Math.round(uploadProgress),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress, className: "h-1.5" })
        ] }),
        uploadErr && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
          uploadErr
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, n)) }) : docs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full py-8 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            "data-ocid": "doc-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-full flex items-center justify-center",
                  style: { backgroundColor: "#fff7ed" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 18, style: { color: "#f97316" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No documents yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click to upload the first document" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DocumentRow,
          {
            doc,
            onDelete: (d) => setConfirmDelete(d),
            deleting: deletingId === doc.id
          },
          doc.id
        )) })
      ] })
    ] }),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            'Delete "',
            confirmDelete.file_name,
            '"?'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This action cannot be undone." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setConfirmDelete(null),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "flex-1",
            onClick: handleConfirmDelete,
            "data-ocid": "doc-delete-confirm",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
function DeleteConfirm({
  loanId,
  onCancel
}) {
  const deleteMutation = useAdminDeleteLoan();
  async function handleDelete() {
    try {
      await deleteMutation.mutateAsync(loanId);
      window.location.hash = "#/admin/loans";
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
          "Delete Loan #",
          loanId,
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This action cannot be undone. All history will be lost." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "flex-1",
          onClick: onCancel,
          disabled: deleteMutation.isPending,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "destructive",
          className: "flex-1",
          onClick: handleDelete,
          disabled: deleteMutation.isPending,
          "data-ocid": "detail-delete-confirm",
          children: [
            deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "mr-1" }),
            "Delete"
          ]
        }
      )
    ] })
  ] }) });
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-60 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" })
      ] })
    ] })
  ] });
}
function LoanDetailPage({ loanId }) {
  const { data, isLoading, isError } = useGetLoanById(loanId);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (isError || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TriangleAlert,
        {
          size: 40,
          className: "text-destructive mx-auto mb-3 opacity-70"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Failed to load loan details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The loan may not exist or you may not have access." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "mt-4",
          onClick: () => {
            window.location.hash = "#/admin/loans";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, className: "mr-1" }),
            "Back to Loans"
          ]
        }
      )
    ] });
  }
  const { loan, history, assignedUserIds } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        loanId,
        onCancel: () => setShowDeleteConfirm(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-5 animate-fade-in print:px-0 print:py-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-sm text-muted-foreground print:hidden",
          "aria-label": "Breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "hover:text-primary transition-smooth font-medium",
                onClick: () => {
                  window.location.hash = "#/admin/dashboard";
                },
                children: "BiggPocket"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "hover:text-primary transition-smooth font-medium",
                onClick: () => {
                  window.location.hash = "#/admin/loans";
                },
                children: "Loans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold truncate max-w-[200px]", children: loan.applicantName })
          ]
        }
      ),
      loan.isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3",
          "data-ocid": "rejection-banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 20, className: "text-red-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-700 uppercase tracking-wide", children: "Loan Rejected" }),
              loan.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-800 mt-0.5 break-words", children: loan.rejectionReason })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 print:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                window.location.hash = "#/admin/loans";
              },
              className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth",
              "aria-label": "Back to loans",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-bold text-foreground leading-none", children: [
                "Loan #",
                loanId
              ] }),
              loan.isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700", children: "Rejected" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stageIndex: loan.currentStage, size: "sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: loan.applicantName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => window.print(),
              "data-ocid": "detail-print-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14, className: "mr-1.5" }),
                "Print"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: () => setShowDeleteConfirm(true),
              "data-ocid": "detail-delete-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "mr-1.5" }),
                "Delete"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StageProgressBar,
        {
          currentStage: loan.currentStage,
          isRejected: loan.isRejected
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoanInfoCard, { loan, loanId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsSection, { loanId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryTimeline, { history })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AssignedUsersCard,
            {
              loanId,
              assignedUserIds: assignedUserIds ?? []
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StageUpdateCard, { loanId, currentStage: loan.currentStage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RejectActionCard, { loan })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          .print\\:hidden { display: none !important; }
        }
      ` })
  ] });
}
export {
  LoanDetailPage as default
};
