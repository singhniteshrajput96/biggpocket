import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, U as Users } from "./index-DmlGt2ze.js";
import { u as useActor, c as createActor } from "./api-BzzkbRdq.js";
import { B as Button } from "./button-BNrAkQWu.js";
import { I as Input } from "./input-BjUtQbbX.js";
import { L as Label } from "./label-C5IuSAim.js";
import { S as Skeleton } from "./skeleton-Ba6rVojZ.js";
import { o as useAdminCreateUser, a as useAdminGetAllUsers } from "./useQueries-Cl2674ke.js";
import { U as UserPlus } from "./user-plus-CGVtOyOI.js";
import { L as LoaderCircle } from "./loader-circle-D_82ObDR.js";
import { C as CircleCheck } from "./circle-check-B8z6gruQ.js";
import { C as CircleAlert } from "./circle-alert-CF5_zaRA.js";
import { S as ShieldCheck } from "./shield-check-D_CovB7o.js";
import { U as UserCheck } from "./user-check-CzJw_YZR.js";
import "./utils-DdB4LPY_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";
const ROLE_OPTIONS = [
  { value: "user", label: "Customer (User)" },
  { value: "admin", label: "Admin" }
];
const INITIAL_FORM = { name: "", mobile: "", role: "user" };
function SuccessBanner({
  name,
  mobile,
  onDismiss
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-4 rounded-lg border text-sm animate-fade-in",
      style: { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" },
      "data-ocid": "user-create-success",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleCheck,
          {
            size: 18,
            className: "shrink-0 mt-0.5",
            style: { color: "#16a34a" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: "#15803d" }, children: "User created successfully!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: name }),
            " (",
            mobile,
            ") can now log in with their mobile number."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "shrink-0 text-muted-foreground hover:text-foreground transition-smooth text-xs underline",
            children: "Dismiss"
          }
        )
      ]
    }
  );
}
function ErrorBanner({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-4 rounded-lg border text-sm",
      style: {
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
        color: "#dc2626"
      },
      "data-ocid": "user-create-error",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, className: "shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ]
    }
  );
}
const TipBox = reactExports.memo(function TipBox2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border p-4 text-sm",
      style: { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-2", style: { color: BRAND_BLUE }, children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-muted-foreground", children: [
          {
            n: 1,
            text: "Create a user by entering their name and mobile number."
          },
          { n: 2, text: "The user logs in with their mobile number via OTP." },
          { n: 3, text: "Assign loan files to them from the Loans page." },
          { n: 4, text: "They can track their loan status in real-time." }
        ].map(({ n, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "shrink-0 mt-0.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center",
              style: { backgroundColor: BRAND_ORANGE },
              children: n
            }
          ),
          text
        ] }, n)) })
      ]
    }
  );
});
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
function RecentUsersList() {
  const { data: users, isLoading } = useAdminGetAllUsers();
  const recent = [...users ?? []].sort((a, b) => b.id - a.id).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 py-3.5 border-b border-border flex items-center justify-between",
        style: { background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 15, style: { color: BRAND_BLUE } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Recent Users" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#/admin/users/team",
              className: "text-xs font-medium hover:underline transition-smooth",
              style: { color: BRAND_BLUE },
              "data-ocid": "view-all-users-link",
              children: "View all →"
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }, n)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 28, className: "mx-auto text-muted-foreground/30 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No users yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Create your first user using the form." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: recent.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-smooth",
        "data-ocid": `recent-user-${u.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
              style: { backgroundColor: BRAND_ORANGE },
              children: u.name.charAt(0).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: u.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "ID #",
                u.id
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: u.role })
        ]
      },
      u.id
    )) }),
    !isLoading && recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Showing ",
      recent.length,
      " of ",
      (users == null ? void 0 : users.length) ?? 0,
      " total users.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#/admin/users/team",
          className: "hover:underline",
          style: { color: BRAND_BLUE },
          children: "View full list"
        }
      )
    ] }) })
  ] });
}
function UsersPage() {
  const { isFetching: actorLoading } = useActor(createActor);
  const createUserMutation = useAdminCreateUser();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [successInfo, setSuccessInfo] = reactExports.useState(null);
  function validate() {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
    if (successInfo) setSuccessInfo(null);
    if (createUserMutation.error) createUserMutation.reset();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    createUserMutation.mutate(
      { name: form.name.trim(), mobile: form.mobile, role: form.role },
      {
        onSuccess: () => {
          setSuccessInfo({ name: form.name.trim(), mobile: form.mobile });
          setForm(INITIAL_FORM);
        }
      }
    );
  }
  const mutationError = createUserMutation.error instanceof Error ? createUserMutation.error.message : createUserMutation.error ? "Failed to create user. Please try again." : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center",
            style: { backgroundColor: BRAND_ORANGE },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "User Management" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm ml-12", children: "Create customer accounts so they can log in and track their loan applications." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-6 py-4 border-b border-border flex items-center gap-2",
            style: {
              background: "linear-gradient(135deg, #fff7ed 0%, #fff 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16, style: { color: BRAND_ORANGE } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Create New User" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "px-6 py-5 space-y-4",
            noValidate: true,
            children: [
              successInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                SuccessBanner,
                {
                  name: successInfo.name,
                  mobile: successInfo.mobile,
                  onDismiss: () => setSuccessInfo(null)
                }
              ),
              mutationError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: mutationError }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "user-name", className: "text-sm font-medium", children: [
                  "Full Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "user-name",
                    type: "text",
                    placeholder: "e.g. Rajesh Kumar",
                    value: form.name,
                    onChange: (e) => handleChange("name", e.target.value),
                    className: errors.name ? "border-destructive" : "",
                    autoComplete: "off",
                    "data-ocid": "user-name-input"
                  }
                ),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "user-mobile", className: "text-sm font-medium", children: [
                  "Mobile Number ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm font-medium", children: "+91" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "user-mobile",
                      type: "tel",
                      inputMode: "numeric",
                      maxLength: 10,
                      placeholder: "10-digit mobile number",
                      value: form.mobile,
                      onChange: (e) => handleChange(
                        "mobile",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      ),
                      className: `rounded-l-none ${errors.mobile ? "border-destructive" : ""}`,
                      autoComplete: "off",
                      "data-ocid": "user-mobile-input"
                    }
                  )
                ] }),
                errors.mobile ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.mobile }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This will be their login credential for OTP-based access." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-role", className: "text-sm font-medium", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "user-role",
                    value: form.role,
                    onChange: (e) => handleChange("role", e.target.value),
                    className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    "data-ocid": "user-role-select",
                    children: ROLE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customers can only view their own loans. Admins have full system access." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full font-semibold text-white",
                  disabled: createUserMutation.isPending || actorLoading,
                  style: {
                    backgroundColor: BRAND_ORANGE,
                    borderColor: BRAND_ORANGE
                  },
                  "data-ocid": "create-user-submit",
                  children: createUserMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                    " Creating User…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }),
                    " Create User"
                  ] })
                }
              ) })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TipBox, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-3", children: "Quick Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "#/admin/users/team",
                className: "flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground",
                "data-ocid": "goto-team-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold",
                      style: { backgroundColor: BRAND_BLUE },
                      children: "→"
                    }
                  ),
                  "View Users & Team Matrix"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "#/admin/loans",
                className: "flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground",
                "data-ocid": "goto-loans-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold",
                      style: { backgroundColor: BRAND_BLUE },
                      children: "→"
                    }
                  ),
                  "Go to Loan Management"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "#/admin/dashboard",
                className: "flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground",
                "data-ocid": "goto-dashboard-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold",
                      style: { backgroundColor: BRAND_BLUE },
                      children: "→"
                    }
                  ),
                  "Back to Dashboard"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecentUsersList, {}) })
  ] });
}
export {
  UsersPage as default
};
