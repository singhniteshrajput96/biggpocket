import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { memo, useState } from "react";
import { createActor } from "../../backend";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useAdminCreateUser,
  useAdminDeleteUser,
  useAdminGetAllUsers,
  useAdminUpdateUserType,
} from "../../hooks/useQueries";
import type { PublicUser } from "../../types";

const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";

const ROLE_OPTIONS = [
  { value: "user", label: "Customer (User)" },
  { value: "admin", label: "Admin" },
] as const;

const USER_TYPE_OPTIONS = [
  { value: "internal", label: "Internal (Sales / Operations)" },
  { value: "external", label: "External (Distribution / Referral)" },
] as const;

type RoleValue = "user" | "admin";
type UserTypeValue = "internal" | "external";

interface FormState {
  name: string;
  mobile: string;
  role: RoleValue;
  user_type: UserTypeValue;
}

const INITIAL_FORM: FormState = {
  name: "",
  mobile: "",
  role: "user",
  user_type: "internal",
};

function SuccessBanner({
  name,
  mobile,
  onDismiss,
}: { name: string; mobile: string; onDismiss: () => void }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-lg border text-sm animate-fade-in"
      style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
      data-ocid="user-create-success"
    >
      <CheckCircle2
        size={18}
        className="shrink-0 mt-0.5"
        style={{ color: "#16a34a" }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold" style={{ color: "#15803d" }}>
          User created successfully!
        </p>
        <p className="text-muted-foreground mt-0.5">
          <span className="font-medium text-foreground">{name}</span> ({mobile})
          can now log in with their mobile number.
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-smooth text-xs underline"
      >
        Dismiss
      </button>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-lg border text-sm"
      style={{
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
        color: "#dc2626",
      }}
      data-ocid="user-create-error"
    >
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

const TipBox = memo(function TipBox() {
  return (
    <div
      className="rounded-lg border p-4 text-sm"
      style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
    >
      <p className="font-semibold mb-2" style={{ color: BRAND_BLUE }}>
        How it works
      </p>
      <ul className="space-y-1.5 text-muted-foreground">
        {[
          {
            n: 1,
            text: "Create a user by entering their name and mobile number.",
          },
          { n: 2, text: "The user logs in with their mobile number via OTP." },
          { n: 3, text: "Assign loan files to them from the Loans page." },
          { n: 4, text: "They can track their loan status in real-time." },
        ].map(({ n, text }) => (
          <li key={n} className="flex items-start gap-2">
            <span
              className="shrink-0 mt-0.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              {n}
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
});

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "admin";
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={
        isAdmin
          ? {
              backgroundColor: "#eff6ff",
              color: BRAND_BLUE,
              border: "1px solid #bfdbfe",
            }
          : {
              backgroundColor: "#fff7ed",
              color: BRAND_ORANGE,
              border: "1px solid #fed7aa",
            }
      }
    >
      {isAdmin ? <ShieldCheck size={10} /> : <UserCheck size={10} />}
      {isAdmin ? "Admin" : "Customer"}
    </span>
  );
}

function UserTypeBadge({ userType }: { userType: string }) {
  const isInternal = userType !== "external";
  return (
    <span
      className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-semibold"
      style={
        isInternal
          ? {
              backgroundColor: "#fff7ed",
              color: BRAND_ORANGE,
              border: `1px solid ${BRAND_ORANGE}40`,
            }
          : {
              backgroundColor: "#f4f4f5",
              color: "#71717a",
              border: "1px solid #d4d4d8",
            }
      }
    >
      {isInternal ? "Internal" : "External"}
    </span>
  );
}

// ─── Delete Confirmation Modal ─────────────────────────────────────────────

function DeleteUserModal({
  user,
  onClose,
  onConfirm,
  isPending,
  errorMsg,
}: {
  user: PublicUser;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  errorMsg: string;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-card rounded-xl shadow-elevated border border-border p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <Trash2 size={18} className="text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                Delete {user.name}?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This cannot be undone. Their access will be revoked.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          {errorMsg && (
            <div
              className="flex items-start gap-2 rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}
            >
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={onConfirm}
              disabled={isPending}
              data-ocid="delete-user-confirm-btn"
            >
              {isPending ? "Deleting…" : "Delete User"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function RecentUsersList() {
  const { data: users, isLoading } = useAdminGetAllUsers();
  const deleteUserMutation = useAdminDeleteUser();
  const [deleteTarget, setDeleteTarget] = useState<PublicUser | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const recent = [...(users ?? [])].sort((a, b) => b.id - a.id).slice(0, 6);

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleteError("");
    const result = await deleteUserMutation.mutateAsync(deleteTarget.id);
    if (!result.ok) {
      setDeleteError(
        result.err ??
          "Cannot delete user. They may have active loan assignments.",
      );
      return;
    }
    setDeleteTarget(null);
  }

  return (
    <>
      {deleteTarget && (
        <DeleteUserModal
          user={deleteTarget}
          onClose={() => {
            setDeleteTarget(null);
            setDeleteError("");
          }}
          onConfirm={handleDeleteConfirm}
          isPending={deleteUserMutation.isPending}
          errorMsg={deleteError}
        />
      )}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div
          className="px-5 py-3.5 border-b border-border flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)",
          }}
        >
          <div className="flex items-center gap-2">
            <Users size={15} style={{ color: BRAND_BLUE }} />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Recent Users
            </h2>
          </div>
          <a
            href="#/admin/users/team"
            className="text-xs font-medium hover:underline transition-smooth"
            style={{ color: BRAND_BLUE }}
            data-ocid="view-all-users-link"
          >
            View all →
          </a>
        </div>

        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <Users
              size={28}
              className="mx-auto text-muted-foreground/30 mb-2"
            />
            <p className="text-sm text-muted-foreground">No users yet.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Create your first user using the form.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((u) => (
              <li
                key={u.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-smooth"
                data-ocid={`recent-user-${u.id}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {u.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      ID #{u.id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <RoleBadge role={u.role} />
                  <UserTypeBadge userType={u.user_type || "internal"} />
                  <button
                    type="button"
                    className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-smooth"
                    onClick={() => {
                      setDeleteError("");
                      setDeleteTarget(u);
                    }}
                    aria-label={`Delete ${u.name}`}
                    data-ocid={`delete-recent-user-${u.id}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && recent.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Showing {recent.length} of {users?.length ?? 0} total users.{" "}
              <a
                href="#/admin/users/team"
                className="hover:underline"
                style={{ color: BRAND_BLUE }}
              >
                View full list
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function UsersPage() {
  const { isFetching: actorLoading } = useActor(createActor);
  const createUserMutation = useAdminCreateUser();
  const updateUserTypeMutation = useAdminUpdateUserType();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [successInfo, setSuccessInfo] = useState<{
    name: string;
    mobile: string;
  } | null>(null);

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (successInfo) setSuccessInfo(null);
    if (createUserMutation.error) createUserMutation.reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    createUserMutation.mutate(
      { name: form.name.trim(), mobile: form.mobile, role: form.role },
      {
        onSuccess: (result) => {
          // After creation, set the user_type via a separate call if not internal
          if (
            result &&
            typeof result === "object" &&
            "id" in result &&
            form.user_type !== "internal"
          ) {
            const userId = (result as { id: number }).id;
            updateUserTypeMutation.mutate({ userId, userType: form.user_type });
          }
          setSuccessInfo({ name: form.name.trim(), mobile: form.mobile });
          setForm(INITIAL_FORM);
        },
      },
    );
  }

  const mutationError =
    createUserMutation.error instanceof Error
      ? createUserMutation.error.message
      : createUserMutation.error
        ? "Failed to create user. Please try again."
        : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: BRAND_ORANGE }}
          >
            <Users size={18} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            User Management
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-12">
          Create customer accounts so they can log in and track their loan
          applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form column */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div
              className="px-6 py-4 border-b border-border flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #fff7ed 0%, #fff 100%)",
              }}
            >
              <UserPlus size={16} style={{ color: BRAND_ORANGE }} />
              <h2 className="font-display font-semibold text-foreground">
                Create New User
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-5 space-y-4"
              noValidate
            >
              {successInfo && (
                <SuccessBanner
                  name={successInfo.name}
                  mobile={successInfo.mobile}
                  onDismiss={() => setSuccessInfo(null)}
                />
              )}
              {mutationError && <ErrorBanner message={mutationError} />}

              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="user-name" className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                  autoComplete="off"
                  data-ocid="user-name-input"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <Label htmlFor="user-mobile" className="text-sm font-medium">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm font-medium">
                    +91
                  </span>
                  <Input
                    id="user-mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={(e) =>
                      handleChange(
                        "mobile",
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    className={`rounded-l-none ${errors.mobile ? "border-destructive" : ""}`}
                    autoComplete="off"
                    data-ocid="user-mobile-input"
                  />
                </div>
                {errors.mobile ? (
                  <p className="text-xs text-destructive">{errors.mobile}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    This will be their login credential for OTP-based access.
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label htmlFor="user-role" className="text-sm font-medium">
                  Role
                </Label>
                <select
                  id="user-role"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  data-ocid="user-role-select"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  Customers can only view their own loans. Admins have full
                  system access.
                </p>
              </div>

              {/* User Type */}
              <div className="space-y-1.5">
                <Label htmlFor="user-type" className="text-sm font-medium">
                  User Type
                </Label>
                <select
                  id="user-type"
                  value={form.user_type}
                  onChange={(e) => handleChange("user_type", e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  data-ocid="user-type-select"
                >
                  {USER_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  Internal users (sales/ops) can edit loan files. External users
                  (referral partners) have view-only access.
                </p>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full font-semibold text-white"
                  disabled={createUserMutation.isPending || actorLoading}
                  style={{
                    backgroundColor: BRAND_ORANGE,
                    borderColor: BRAND_ORANGE,
                  }}
                  data-ocid="create-user-submit"
                >
                  {createUserMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Creating
                      User…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus size={16} /> Create User
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="lg:col-span-2 space-y-4">
          <TipBox />

          {/* Quick actions */}
          <div className="bg-card border border-border rounded-xl shadow-card p-4">
            <p className="font-semibold text-sm text-foreground mb-3">
              Quick Actions
            </p>
            <div className="space-y-2">
              <a
                href="#/admin/users/team"
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground"
                data-ocid="goto-team-link"
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  →
                </span>
                View Team Matrix
              </a>
              <a
                href="#/admin/loans"
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground"
                data-ocid="goto-loans-link"
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  →
                </span>
                Go to Loan Management
              </a>
              <a
                href="#/admin/dashboard"
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted/50 transition-smooth text-foreground"
                data-ocid="goto-dashboard-link"
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  →
                </span>
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent users list */}
      <div className="mt-6">
        <RecentUsersList />
      </div>
    </div>
  );
}
