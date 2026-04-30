import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X } from "./index-Z0A2bhGv.js";
import { B as Badge } from "./badge-DtlJb9-W.js";
import { B as Button } from "./button-DWtlGXxF.js";
import { I as Input } from "./input-G0BE1fL_.js";
import { S as Skeleton } from "./skeleton-CxBnDwkK.js";
import { L as LOAN_STAGES } from "./stages-CnHug0GM.js";
import { a as useAdminGetAllUsers, b as useAdminGetAllLoans, r as useAdminUpdateUserType, s as useAdminDeleteUser } from "./useQueries-Bvv08CbZ.js";
import { U as Users } from "./users-CY_ZJZHk.js";
import { U as UserPlus } from "./user-plus-BNa7N3j9.js";
import { T as TrendingUp } from "./trending-up-DxtwyeyW.js";
import { S as Search } from "./search-B2Xp-KEF.js";
import { T as Trash2 } from "./trash-2-CMkwsPmu.js";
import { T as TriangleAlert } from "./triangle-alert-5r-aS6ly.js";
import { S as ShieldCheck } from "./shield-check-r77Y8xQg.js";
import { U as UserCheck } from "./user-check-CU3mIKAG.js";
import { C as ChevronDown } from "./chevron-down-DtCdyOsP.js";
import "./utils-DdB4LPY_.js";
import "./api-8PJoCqPW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";
const BRAND_NAVY = "#0f172a";
function formatCrore(val) {
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(2)}Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(1)}L`;
  if (val >= 1e3) return `₹${(val / 1e3).toFixed(0)}K`;
  return `₹${val}`;
}
function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
      style: isAdmin ? {
        backgroundColor: "#eff6ff",
        color: BRAND_BLUE,
        border: "1px solid #bfdbfe"
      } : {
        backgroundColor: "#fff7ed",
        color: BRAND_ORANGE,
        border: "1px solid #fed7aa"
      },
      children: [
        isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 10 }),
        isAdmin ? "Admin" : "Customer"
      ]
    }
  );
}
function ConversionBadge({ rate }) {
  const color = rate >= 50 ? "#16a34a" : rate >= 25 ? "#d97706" : "#dc2626";
  const bg = rate >= 50 ? "#f0fdf4" : rate >= 25 ? "#fffbeb" : "#fef2f2";
  const border = rate >= 50 ? "#bbf7d0" : rate >= 25 ? "#fde68a" : "#fecaca";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "text-xs font-bold px-2 py-0.5 rounded-full",
      style: { color, backgroundColor: bg, border: `1px solid ${border}` },
      children: [
        rate,
        "%"
      ]
    }
  );
}
function SortIcon({
  col,
  sort
}) {
  if (sort.key !== col)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12, className: "opacity-30 ml-1 inline" });
  return sort.dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChevronUp,
    {
      size: 12,
      className: "ml-1 inline",
      style: { color: BRAND_ORANGE }
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChevronDown,
    {
      size: 12,
      className: "ml-1 inline",
      style: { color: BRAND_ORANGE }
    }
  );
}
function SummaryCard({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub })
  ] });
}
function TableSkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 ml-auto rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12 ml-auto rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24 rounded-md" }) })
  ] }, n)) });
}
function DeleteUserModal({
  user,
  onClose,
  onConfirm,
  isPending,
  errorMsg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/40 animate-fade-in",
        onClick: onClose,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            "Delete ",
            user.name,
            "?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This cannot be undone. All access for this user will be revoked." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "ml-auto text-muted-foreground hover:text-foreground",
            "aria-label": "Close",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        )
      ] }),
      errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2 rounded-lg p-3 text-sm",
          style: { backgroundColor: "#fef2f2", color: "#dc2626" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 15, className: "shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            disabled: isPending,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "flex-1",
            onClick: onConfirm,
            disabled: isPending,
            "data-ocid": "delete-user-confirm-btn",
            children: isPending ? "Deleting…" : "Delete User"
          }
        )
      ] })
    ] }) })
  ] });
}
function UsersTeamPage() {
  const { data: users, isLoading: usersLoading } = useAdminGetAllUsers();
  const { data: loansData, isLoading: loansLoading } = useAdminGetAllLoans(
    1,
    500,
    "",
    null,
    null
  );
  const updateUserTypeMutation = useAdminUpdateUserType();
  const deleteUserMutation = useAdminDeleteUser();
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState({
    key: "total_loans",
    dir: "desc"
  });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [deleteError, setDeleteError] = reactExports.useState("");
  const [updatingTypeId, setUpdatingTypeId] = reactExports.useState(null);
  const isLoading = usersLoading || loansLoading;
  const allStats = reactExports.useMemo(() => {
    if (!users) return [];
    return users.map((user) => {
      const assignedLoans = ((loansData == null ? void 0 : loansData.loans) ?? []).filter(
        (lh) => lh.assignedUserIds.includes(user.id)
      );
      const totalValue = assignedLoans.reduce(
        (sum, lh) => sum + lh.loan.loanAmount,
        0
      );
      const stageMap = /* @__PURE__ */ new Map();
      let active = 0;
      let disbursed = 0;
      let rejected = 0;
      for (const lh of assignedLoans) {
        if (lh.loan.isRejected) {
          rejected++;
          stageMap.set("Rejected", (stageMap.get("Rejected") ?? 0) + 1);
        } else {
          const stage = lh.loan.currentStage;
          const stageName = LOAN_STAGES[stage] ?? "Unknown";
          stageMap.set(stageName, (stageMap.get(stageName) ?? 0) + 1);
          if (stage >= 7) disbursed++;
          else active++;
        }
      }
      const conversionRate = assignedLoans.length > 0 ? Math.round(disbursed / assignedLoans.length * 100) : 0;
      return {
        user_id: user.id,
        user_name: user.name,
        role: user.role,
        user_type: user.user_type || "internal",
        total_loans: assignedLoans.length,
        total_value: totalValue,
        stage_breakdown: Array.from(stageMap.entries()),
        conversion_rate: conversionRate,
        active,
        disbursed,
        rejected
      };
    });
  }, [users, loansData]);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allStats;
    return allStats.filter((s) => s.user_name.toLowerCase().includes(q));
  }, [allStats, search]);
  const sorted = reactExports.useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      const cmp = typeof aVal === "string" ? aVal.localeCompare(bVal) : aVal - bVal;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort]);
  function toggleSort(key) {
    setSort(
      (prev) => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }
    );
  }
  async function handleTypeChange(userId, newType) {
    setUpdatingTypeId(userId);
    await updateUserTypeMutation.mutateAsync({ userId, userType: newType });
    setUpdatingTypeId(null);
  }
  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleteError("");
    const result = await deleteUserMutation.mutateAsync(deleteTarget.id);
    if (!result.ok) {
      setDeleteError(
        result.err ?? "Cannot delete user. They may have active loan assignments."
      );
      return;
    }
    setDeleteTarget(null);
  }
  const totalMembers = allStats.length;
  const totalLoansAll = allStats.reduce((s, u) => s + u.total_loans, 0);
  const totalValueAll = allStats.reduce((s, u) => s + u.total_value, 0);
  const avgConversion = allStats.length > 0 ? Math.round(
    allStats.reduce((s, u) => s + u.conversion_rate, 0) / allStats.length
  ) : 0;
  function ThCol({
    col,
    label,
    className = ""
  }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "th",
      {
        className: `px-4 py-3 font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-smooth ${className}`,
        onClick: () => toggleSort(col),
        onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && toggleSort(col),
        "data-ocid": `sort-${col}`,
        children: [
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { col, sort })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteUserModal,
      {
        user: deleteTarget,
        onClose: () => {
          setDeleteTarget(null);
          setDeleteError("");
        },
        onConfirm: handleDeleteConfirm,
        isPending: deleteUserMutation.isPending,
        errorMsg: deleteError
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
              style: {
                background: `linear-gradient(135deg, ${BRAND_ORANGE}, #e05a0c)`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20, className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Teams" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage team members and view performance metrics" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/admin/users", "data-ocid": "create-user-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "text-white font-semibold flex items-center gap-2",
            style: { backgroundColor: BRAND_ORANGE },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 15 }),
              " Create New User"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryCard,
          {
            label: "Total Members",
            value: isLoading ? "—" : totalMembers,
            sub: "Users & Admins"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryCard,
          {
            label: "Loans Assigned",
            value: isLoading ? "—" : totalLoansAll,
            sub: "Across all users"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryCard,
          {
            label: "Portfolio Value",
            value: isLoading ? "—" : formatCrore(totalValueAll),
            sub: "Total active loan value"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryCard,
          {
            label: "Avg Conversion",
            value: isLoading ? "—" : `${avgConversion}%`,
            sub: "Disbursement rate"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3",
            style: {
              background: `linear-gradient(135deg, ${BRAND_NAVY}08 0%, transparent 100%)`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, style: { color: BRAND_ORANGE } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Performance Matrix" }),
                !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs ml-1", children: [
                  filtered.length,
                  " ",
                  filtered.length === 1 ? "user" : "users"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative w-full sm:w-64",
                  "data-ocid": "user-search-wrapper",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Search,
                      {
                        size: 14,
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Search by name…",
                        value: search,
                        onChange: (e) => setSearch(e.target.value),
                        className: "pl-8 h-9 text-sm",
                        "data-ocid": "user-search-input"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "text-xs text-muted-foreground uppercase tracking-wide",
              style: { backgroundColor: `${BRAND_NAVY}06` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "User" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Value (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden md:table-cell", children: "Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden md:table-cell", children: "Disbursed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden lg:table-cell", children: "Rejected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Conv%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeletonRows, {}) })
        ] }) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Users,
            {
              size: 40,
              className: "mx-auto mb-3",
              style: { color: `${BRAND_ORANGE}40` }
            }
          ),
          search ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
              'No users match "',
              search,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Try a different name." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "mt-3 text-xs hover:underline",
                style: { color: BRAND_BLUE },
                onClick: () => setSearch(""),
                "data-ocid": "clear-search-btn",
                children: "Clear search"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "No users yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Create users to start tracking performance." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#/admin/users", "data-ocid": "empty-create-user-link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "mt-4 text-sm font-semibold px-4 py-1.5 rounded-md text-white",
                style: { backgroundColor: BRAND_ORANGE },
                children: "Create First User"
              }
            ) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "text-xs text-muted-foreground uppercase tracking-wide",
              style: { backgroundColor: `${BRAND_NAVY}06` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThCol, { col: "user_name", label: "User", className: "text-left" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-center whitespace-nowrap", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "total_loans",
                    label: "Total",
                    className: "text-right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "total_value",
                    label: "Value (₹)",
                    className: "text-right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "active",
                    label: "Active",
                    className: "text-right hidden md:table-cell"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "disbursed",
                    label: "Disbursed",
                    className: "text-right hidden md:table-cell"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "rejected",
                    label: "Rejected",
                    className: "text-right hidden lg:table-cell"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ThCol,
                  {
                    col: "conversion_rate",
                    label: "Conv%",
                    className: "text-right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-left whitespace-nowrap", children: "Actions" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-t border-border hover:bg-muted/30 transition-smooth ${i % 2 === 1 ? "bg-muted/10" : ""}`,
              "data-ocid": `team-row-${stat.user_id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                      style: { backgroundColor: BRAND_ORANGE },
                      children: stat.user_name.charAt(0).toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[120px] sm:max-w-none", children: stat.user_name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: stat.role })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: updatingTypeId === stat.user_id ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Saving…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: stat.user_type,
                    onChange: (e) => handleTypeChange(stat.user_id, e.target.value),
                    className: "text-xs border border-input rounded-md px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                    "aria-label": `User type for ${stat.user_name}`,
                    "data-ocid": `user-type-select-${stat.user_id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "internal", children: "Internal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "external", children: "External" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: stat.total_loans }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-foreground font-medium whitespace-nowrap", children: formatCrore(stat.total_value) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: {
                      backgroundColor: "#eff6ff",
                      color: BRAND_BLUE
                    },
                    children: stat.active
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: {
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a"
                    },
                    children: stat.disbursed
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: stat.rejected > 0 ? {
                      backgroundColor: "#fef2f2",
                      color: "#dc2626"
                    } : {
                      backgroundColor: "#f4f4f5",
                      color: "#71717a"
                    },
                    children: stat.rejected
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionBadge, { rate: stat.conversion_rate }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `#/admin/loans?assigned_user=${stat.user_id}`,
                      "data-ocid": `view-perf-${stat.user_id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "text-xs h-7 whitespace-nowrap",
                          style: {
                            borderColor: BRAND_BLUE,
                            color: BRAND_BLUE
                          },
                          children: "View Loans"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "text-xs h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => {
                        setDeleteError("");
                        setDeleteTarget({
                          id: stat.user_id,
                          name: stat.user_name
                        });
                      },
                      "aria-label": `Delete ${stat.user_name}`,
                      "data-ocid": `delete-user-btn-${stat.user_id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] }) })
              ]
            },
            stat.user_id
          )) })
        ] }) }),
        !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-3 border-t border-border flex items-center justify-between",
            style: { backgroundColor: `${BRAND_NAVY}04` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Showing ",
                sorted.length,
                " of ",
                allStats.length,
                " users",
                search && ` matching "${search}"`
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2.5 h-2.5 rounded-full inline-block",
                    style: { backgroundColor: BRAND_ORANGE }
                  }
                ),
                "Click column headers to sort"
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  UsersTeamPage as default
};
