import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X } from "./index-Z0A2bhGv.js";
import { B as Badge } from "./badge-DtlJb9-W.js";
import { B as Button } from "./button-DWtlGXxF.js";
import { C as Card, a as CardContent } from "./card-BdbFX_7A.js";
import { I as Input } from "./input-G0BE1fL_.js";
import { L as Label } from "./label-CKr0yFvu.js";
import { S as Skeleton } from "./skeleton-CxBnDwkK.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { a as useAdminGetAllUsers, b as useAdminGetAllLoans, c as useAdminDeleteLoan, d as useAdminGetDeletedLoans, e as useAdminRestoreLoan, f as useAdminCreateLoan } from "./useQueries-Bvv08CbZ.js";
import { T as Trash2 } from "./trash-2-CMkwsPmu.js";
import { S as Search } from "./search-B2Xp-KEF.js";
import { T as TriangleAlert } from "./triangle-alert-5r-aS6ly.js";
import { L as LoaderCircle } from "./loader-circle-ByZu3f7k.js";
import { E as Eye } from "./eye-C-qXz6Rs.js";
import { C as ChevronRight } from "./chevron-right-JSxSaOMR.js";
import { U as Users } from "./users-CY_ZJZHk.js";
import "./utils-DdB4LPY_.js";
import "./api-8PJoCqPW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const PAGE_SIZES = [10, 25, 50];
const SANCTIONED_MIN_STAGE = 6;
const DISBURSED_MIN_STAGE = 7;
function parseHashParams() {
  const hash = window.location.hash;
  const qIdx = hash.indexOf("?");
  if (qIdx === -1) return { stage: null, filter: null, assignedUser: null };
  const params = new URLSearchParams(hash.slice(qIdx + 1));
  const stage = params.get("stage");
  const assignedUser = params.get("assigned_user");
  if (stage !== null)
    return { stage: Number(stage), filter: null, assignedUser: null };
  const filter = params.get("filter");
  const namedFilter = filter === "active" || filter === "sanctioned" || filter === "disbursed" || filter === "rejected" ? filter : null;
  return {
    stage: null,
    filter: namedFilter,
    assignedUser: assignedUser !== null ? Number(assignedUser) : null
  };
}
function namedFilterToStage(f) {
  if (f === "sanctioned") return SANCTIONED_MIN_STAGE;
  if (f === "disbursed") return DISBURSED_MIN_STAGE;
  return null;
}
function getFilterLabel(stage, namedFilter, assignedUserName) {
  const parts = [];
  if (namedFilter === "active") parts.push("Active Files");
  else if (namedFilter === "sanctioned")
    parts.push(`Sanctioned (Stage ${SANCTIONED_MIN_STAGE + 1}+)`);
  else if (namedFilter === "disbursed")
    parts.push(`Disbursed (Stage ${DISBURSED_MIN_STAGE + 1}+)`);
  else if (namedFilter === "rejected") parts.push("Rejected Files");
  else if (stage !== null)
    parts.push(`Stage: ${LOAN_STAGES[stage] ?? `Stage ${stage + 1}`}`);
  if (assignedUserName) parts.push(`User: ${assignedUserName}`);
  return parts.length ? parts.join(" · ") : null;
}
function stageBadgeClass(stageIndex) {
  if (stageIndex <= 2) return "bg-blue-100 text-blue-700";
  if (stageIndex <= 5) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}
function StageBadge({ stageIndex }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${stageBadgeClass(stageIndex)}`,
      children: LOAN_STAGES[stageIndex] ?? `Stage ${stageIndex + 1}`
    }
  );
}
function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function formatDate(ts) {
  return new Date(ts / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CreateLoanModal({ onClose }) {
  const createMutation = useAdminCreateLoan();
  const [form, setForm] = reactExports.useState({
    applicantName: "",
    bankName: "",
    loanType: "",
    loanAmount: "",
    mobile: "",
    distributionPartner: "",
    coApplicantName: "",
    employmentType: "",
    income: "",
    propertyType: "",
    propertyValue: "",
    requiredAmount: "",
    sanctionAmount: "",
    disbursedAmount: ""
  });
  const [formErrors, setFormErrors] = reactExports.useState({});
  function validate() {
    const e = {};
    if (!form.applicantName.trim())
      e.applicantName = "Applicant name is required";
    if (!form.bankName.trim()) e.bankName = "Bank name is required";
    if (!form.loanType.trim()) e.loanType = "Loan type is required";
    const amt = Number(form.loanAmount);
    if (!form.loanAmount || Number.isNaN(amt) || amt <= 0)
      e.loanAmount = "Enter a valid amount";
    return e;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }
    try {
      await createMutation.mutateAsync({
        applicantName: form.applicantName.trim(),
        bankName: form.bankName.trim(),
        loanType: form.loanType.trim(),
        loanAmount: Number(form.loanAmount),
        mobile: form.mobile.trim(),
        distributionPartner: form.distributionPartner.trim() || void 0,
        coApplicantName: form.coApplicantName.trim() || void 0,
        employmentType: form.employmentType || void 0,
        income: form.income ? Number(form.income) : void 0,
        propertyType: form.propertyType.trim() || void 0,
        propertyValue: form.propertyValue ? Number(form.propertyValue) : void 0,
        requiredAmount: form.requiredAmount ? Number(form.requiredAmount) : void 0,
        sanctionAmount: form.sanctionAmount ? Number(form.sanctionAmount) : void 0,
        disbursedAmount: form.disbursedAmount ? Number(form.disbursedAmount) : void 0
      });
      onClose();
    } catch (err) {
      const msg = err.message ?? "Failed to create loan";
      if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("expired") || msg.toLowerCase().includes("not authenticated") || msg.toLowerCase().includes("session")) {
        window.location.hash = "#/login";
        return;
      }
      setFormErrors({
        submit: msg
      });
    }
  }
  function field(id, label, placeholder, type = "text", required = false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: [
        label,
        required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          type,
          value: form[id],
          placeholder,
          onChange: (e) => {
            setForm((f) => ({ ...f, [id]: e.target.value }));
            if (formErrors[id])
              setFormErrors((prev) => ({ ...prev, [id]: "" }));
          },
          className: formErrors[id] ? "border-destructive" : "",
          "data-ocid": `create-loan-${id}`
        }
      ),
      formErrors[id] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: formErrors[id] })
    ] }, id);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-50 m-auto flex items-center justify-center bg-transparent border-0 p-4 w-full max-w-lg",
        "aria-labelledby": "create-loan-title",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-card rounded-xl shadow-elevated border border-border animate-fade-in max-h-[90vh] flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4 border-b border-border shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "create-loan-title",
                className: "text-base font-display font-semibold text-foreground",
                children: "New Loan Application"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "px-5 py-4 space-y-4 overflow-y-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  field(
                    "applicantName",
                    "Applicant Name",
                    "Full name",
                    "text",
                    true
                  ),
                  field("coApplicantName", "Co-Applicant Name", "Optional")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  field("bankName", "Bank Name", "e.g. HDFC Bank", "text", true),
                  field("loanType", "Loan Type", "e.g. Home Loan", "text", true)
                ] }),
                field(
                  "loanAmount",
                  "Loan Amount (₹)",
                  "e.g. 5000000",
                  "number",
                  true
                ),
                field(
                  "distributionPartner",
                  "Distribution Partner",
                  "Referral source / DSA name"
                ),
                field(
                  "mobile",
                  "Mobile Number (optional)",
                  "10-digit mobile — assigns to user"
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Applicant Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Employment Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          className: "w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground",
                          value: form.employmentType,
                          onChange: (e) => setForm((f) => ({ ...f, employmentType: e.target.value })),
                          "data-ocid": "create-loan-employmentType",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select type" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Salary", children: "Salaried" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Business", children: "Business / Self-Employed" })
                          ]
                        }
                      )
                    ] }),
                    field("income", "Monthly Income (₹)", "e.g. 80000", "number")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Property Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    field(
                      "propertyType",
                      "Property Type",
                      "e.g. Residential, Commercial"
                    ),
                    field(
                      "propertyValue",
                      "Market Value (₹)",
                      "e.g. 8000000",
                      "number"
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: [
                    "Financial Details",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal normal-case tracking-normal", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                    field(
                      "requiredAmount",
                      "Required Amount (₹)",
                      "e.g. 5000000",
                      "number"
                    ),
                    field(
                      "sanctionAmount",
                      "Sanction Amount (₹)",
                      "e.g. 4800000",
                      "number"
                    ),
                    field(
                      "disbursedAmount",
                      "Disbursed Amount (₹)",
                      "e.g. 4500000",
                      "number"
                    )
                  ] })
                ] }),
                formErrors.submit && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 14 }),
                  formErrors.submit
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1 text-white",
                      disabled: createMutation.isPending,
                      style: { backgroundColor: "#f97316", borderColor: "#f97316" },
                      "data-ocid": "create-loan-submit",
                      children: [
                        createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1.5" }),
                        "Create Loan"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
function Pagination({
  page,
  total,
  pageSize,
  onPage,
  onPageSize
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (page <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  } else if (page >= totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border",
      "data-ocid": "loans-pagination",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rows per page:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "border border-input rounded-md px-2 py-1 text-sm bg-background text-foreground",
              value: pageSize,
              onChange: (e) => {
                onPageSize(Number(e.target.value));
                onPage(1);
              },
              "data-ocid": "loans-page-size",
              children: PAGE_SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            (page - 1) * pageSize + 1,
            "–",
            Math.min(page * pageSize, total),
            " of",
            " ",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: page === 1,
              onClick: () => onPage(page - 1),
              className: "p-1.5 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-smooth",
              "aria-label": "Previous page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
            }
          ),
          pages.map(
            (p, i) => p === "..." ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-2 text-sm text-muted-foreground",
                children: "…"
              },
              `dots-${i === 1 ? "start" : "end"}`
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onPage(p),
                className: `w-8 h-8 rounded-md text-sm font-medium transition-smooth ${p === page ? "text-white" : "text-foreground hover:bg-muted"}`,
                style: p === page ? { backgroundColor: "#f97316" } : void 0,
                children: p
              },
              `page-${p}`
            )
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: page === totalPages,
              onClick: () => onPage(page + 1),
              className: "p-1.5 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-smooth",
              "aria-label": "Next page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
            }
          )
        ] })
      ]
    }
  );
}
function AssignedChips({ userIds, userMap }) {
  const validIds = (userIds ?? []).filter(
    (id) => id != null && typeof id === "number"
  );
  if (validIds.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground", children: "Unassigned" });
  const visible = validIds.slice(0, 2);
  const overflow = validIds.length - visible.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
    visible.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
        style: { backgroundColor: "#eff6ff", color: "#1d4ed8" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 9 }),
          userMap.get(id) ?? `#${id}`
        ]
      },
      id
    )),
    overflow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
      "+",
      overflow
    ] })
  ] });
}
function LoanRow({
  loanWithHistory,
  onDelete,
  deleting,
  userMap
}) {
  const { loan, assignedUserIds } = loanWithHistory;
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  function navigate() {
    window.location.hash = `#/admin/loans/${loan.id}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: `border-b border-border hover:bg-muted/40 transition-smooth cursor-pointer ${loan.isRejected ? "bg-red-50/50" : ""}`,
      onClick: navigate,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") navigate();
      },
      tabIndex: 0,
      "data-ocid": `loan-row-${loan.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm font-mono text-muted-foreground", children: [
          "#",
          loan.id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate max-w-[140px]", children: loan.applicantName }),
          loan.isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 w-fit", children: "✕ REJECTED" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AssignedChips, { userIds: assignedUserIds ?? [], userMap })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground hidden sm:table-cell", children: loan.bankName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground hidden md:table-cell", children: loan.loanType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: loan.isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700", children: "Rejected" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stageIndex: loan.currentStage }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-semibold text-foreground text-right hidden md:table-cell tabular-nums", children: formatCurrency(loan.loanAmount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground hidden xl:table-cell whitespace-nowrap", children: formatDate(loan.updatedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: "px-4 py-3",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    navigate();
                  },
                  className: "p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
                  "aria-label": "View loan",
                  "data-ocid": `loan-view-${loan.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                }
              ),
              confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-destructive/10 px-2 py-1 rounded-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-semibold", children: "Delete?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onDelete(loan.id),
                    disabled: deleting,
                    className: "text-xs text-destructive font-bold hover:underline",
                    "data-ocid": `loan-delete-confirm-${loan.id}`,
                    children: deleting ? "…" : "Yes"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirmDelete(false),
                    className: "text-xs text-muted-foreground hover:underline",
                    children: "No"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setConfirmDelete(true),
                  className: "p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                  "aria-label": "Delete loan",
                  "data-ocid": `loan-delete-${loan.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function DeletedLoanRow({
  loanWithHistory,
  onRestore,
  restoring
}) {
  const { loan } = loanWithHistory;
  const [confirmRestore, setConfirmRestore] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-muted/40 transition-smooth", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm font-mono text-muted-foreground", children: [
      "#",
      loan.id
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate max-w-[140px]", children: loan.applicantName }),
      loan.coApplicantName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate max-w-[140px]", children: [
        "Co: ",
        loan.coApplicantName
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground hidden sm:table-cell", children: loan.bankName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: loan.isRejected ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700", children: "Rejected" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stageIndex: loan.currentStage }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-semibold text-foreground text-right hidden md:table-cell tabular-nums", children: formatCurrency(loan.loanAmount) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground hidden xl:table-cell whitespace-nowrap", children: formatDate(loan.updatedAt) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 justify-end", children: confirmRestore ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 rounded-md px-2 py-1",
        style: { backgroundColor: "#fff7ed" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-semibold",
              style: { color: "#f97316" },
              children: "Restore?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRestore(loan.id),
              disabled: restoring,
              className: "text-xs font-bold hover:underline",
              style: { color: "#f97316" },
              "data-ocid": `deleted-loan-restore-confirm-${loan.id}`,
              children: restoring ? "…" : "Yes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setConfirmRestore(false),
              className: "text-xs text-muted-foreground hover:underline",
              children: "No"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setConfirmRestore(true),
        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-white transition-smooth hover:opacity-90",
        style: { backgroundColor: "#F47B30" },
        "aria-label": "Restore loan",
        "data-ocid": `deleted-loan-restore-${loan.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 13 }),
          "Restore"
        ]
      }
    ) }) })
  ] });
}
function LoansPage() {
  const parsed = parseHashParams();
  const [activeTab, setActiveTab] = reactExports.useState("loans");
  const [page, setPage] = reactExports.useState(1);
  const [pageSize, setPageSize] = reactExports.useState(10);
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [stageFilter, setStageFilter] = reactExports.useState(parsed.stage);
  const [namedFilter, setNamedFilter] = reactExports.useState(parsed.filter);
  const [assignedUserFilter, setAssignedUserFilter] = reactExports.useState(
    parsed.assignedUser
  );
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const debounceRef = reactExports.useRef(null);
  const { data: usersData } = useAdminGetAllUsers();
  const userMap = new Map(
    (usersData ?? []).map((u) => [u.id, u.name])
  );
  reactExports.useEffect(() => {
    function onHashChange() {
      const p = parseHashParams();
      setStageFilter(p.stage);
      setNamedFilter(p.filter);
      setAssignedUserFilter(p.assignedUser);
      setPage(1);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const handleSearch = reactExports.useCallback((val) => {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 300);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const apiStageFilter = stageFilter !== null ? stageFilter : namedFilterToStage(namedFilter);
  const { data, isLoading, isError } = useAdminGetAllLoans(
    page,
    pageSize,
    debouncedSearch,
    apiStageFilter,
    assignedUserFilter
  );
  const deleteMutation = useAdminDeleteLoan();
  const {
    data: deletedLoans,
    isLoading: deletedLoading,
    isError: deletedError
  } = useAdminGetDeletedLoans();
  const restoreMutation = useAdminRestoreLoan();
  const [restoringId, setRestoringId] = reactExports.useState(null);
  async function handleDelete(loanId) {
    setDeletingId(loanId);
    try {
      await deleteMutation.mutateAsync(loanId);
    } finally {
      setDeletingId(null);
    }
  }
  async function handleRestore(loanId) {
    setRestoringId(loanId);
    try {
      await restoreMutation.mutateAsync(loanId);
    } finally {
      setRestoringId(null);
    }
  }
  function clearFilter() {
    setStageFilter(null);
    setNamedFilter(null);
    setAssignedUserFilter(null);
    window.location.hash = "#/admin/loans";
  }
  const displayedLoans = namedFilter === "rejected" ? ((data == null ? void 0 : data.loans) ?? []).filter((lwh) => lwh.loan.isRejected) : (data == null ? void 0 : data.loans) ?? [];
  const assignedUserName = assignedUserFilter ? userMap.get(assignedUserFilter) : void 0;
  const activeLabel = getFilterLabel(
    stageFilter,
    namedFilter,
    assignedUserName
  );
  const hasFilter = stageFilter !== null || namedFilter !== null || assignedUserFilter !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateLoanModal, { onClose: () => setShowCreateModal(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-5 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Loan Applications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage all loan applications in the pipeline" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowCreateModal(true),
            className: "shrink-0 text-white",
            style: { backgroundColor: "#f97316", borderColor: "#f97316" },
            "data-ocid": "loans-create-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1.5" }),
              "New Loan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1 border-b border-border",
          "data-ocid": "loans-tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("loans"),
                className: `px-4 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px ${activeTab === "loans" ? "border-orange-500 text-orange-600" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "loans-tab-active",
                children: "Active Loans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("deleted"),
                className: `flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px ${activeTab === "deleted" ? "border-orange-500 text-orange-600" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "loans-tab-deleted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
                  "Deleted",
                  ((deletedLoans == null ? void 0 : deletedLoans.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full text-white",
                      style: { backgroundColor: "#F47B30" },
                      children: deletedLoans.length > 9 ? "9+" : deletedLoans.length
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      activeTab === "loans" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        hasFilter && activeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-2",
            "data-ocid": "loans-active-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full",
                style: {
                  backgroundColor: "#fff7ed",
                  color: "#f97316",
                  border: "1px solid #fed7aa"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Showing: ",
                    activeLabel
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: clearFilter,
                      className: "ml-1 rounded-full hover:bg-orange-200 transition-smooth p-0.5",
                      "aria-label": "Clear filter",
                      "data-ocid": "loans-clear-filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 15,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "search",
                placeholder: "Search by applicant, mobile, bank...",
                value: search,
                onChange: (e) => handleSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "loans-search"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground min-w-[160px]",
              value: stageFilter ?? "",
              onChange: (e) => {
                const val = e.target.value;
                const newStage = val === "" ? null : Number(val);
                setStageFilter(newStage);
                setNamedFilter(null);
                setPage(1);
                window.location.hash = val === "" ? "#/admin/loans" : `#/admin/loans?stage=${val}`;
              },
              "data-ocid": "loans-stage-filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Stages" }),
                LOAN_STAGES.map((name, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: idx, children: [
                  idx + 1,
                  ". ",
                  name
                ] }, name))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground min-w-[160px]",
              value: assignedUserFilter ?? "",
              onChange: (e) => {
                const val = e.target.value;
                const newUserId = val === "" ? null : Number(val);
                setAssignedUserFilter(newUserId);
                setPage(1);
              },
              "data-ocid": "loans-user-filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Users" }),
                (usersData ?? []).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u.id, children: u.name }, u.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/60 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Applicant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Bank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell", children: "Stage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right hidden md:table-cell", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell", children: "Updated" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              isLoading && [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [1, 2, 3, 4, 5, 6, 7, 8].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, j)) }, i)),
              isError && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 8, className: "px-4 py-12 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TriangleAlert,
                  {
                    size: 28,
                    className: "text-destructive mx-auto mb-2 opacity-70"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load loans. Please refresh." })
              ] }) }),
              !isLoading && !isError && displayedLoans.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 8,
                  className: "px-4 py-16 text-center",
                  "data-ocid": "loans-empty-state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Search,
                      {
                        size: 24,
                        className: "text-muted-foreground opacity-50"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No loans found" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: debouncedSearch || hasFilter ? "Try adjusting your search or clearing the filter." : "Create your first loan application to get started." }),
                    !debouncedSearch && !hasFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        onClick: () => setShowCreateModal(true),
                        className: "text-white",
                        style: { backgroundColor: "#f97316" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                          "New Loan"
                        ]
                      }
                    )
                  ] })
                }
              ) }),
              !isLoading && !isError && displayedLoans.map((lwh) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LoanRow,
                {
                  loanWithHistory: lwh,
                  onDelete: handleDelete,
                  deleting: deletingId === lwh.loan.id,
                  userMap
                },
                lwh.loan.id
              ))
            ] })
          ] }) }),
          data && data.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pagination,
            {
              page,
              total: data.total,
              pageSize,
              onPage: setPage,
              onPageSize: setPageSize
            }
          ) })
        ] })
      ] }),
      activeTab === "deleted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border border-border bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14, style: { color: "#F47B30" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Deleted Loans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: "Restore a loan to bring it back to the active pipeline" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/60 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Applicant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Bank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell", children: "Stage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right hidden md:table-cell", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell", children: "Deleted On" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            deletedLoading && [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [1, 2, 3, 4, 5, 6, 7].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, j)) }, i)),
            deletedError && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "px-4 py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TriangleAlert,
                {
                  size: 28,
                  className: "text-destructive mx-auto mb-2 opacity-70"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load deleted loans. Please refresh." })
            ] }) }),
            !deletedLoading && !deletedError && (deletedLoans ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 7,
                className: "px-4 py-16 text-center",
                "data-ocid": "deleted-loans-empty-state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trash2,
                    {
                      size: 24,
                      className: "text-muted-foreground opacity-50"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No deleted loans" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Loans you delete will appear here and can be restored at any time." })
                ] })
              }
            ) }),
            !deletedLoading && !deletedError && (deletedLoans ?? []).map((lwh) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DeletedLoanRow,
              {
                loanWithHistory: lwh,
                onRestore: handleRestore,
                restoring: restoringId === lwh.loan.id
              },
              lwh.loan.id
            ))
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  LoansPage as default
};
