import {
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";
import { LOAN_STAGES } from "../../constants/stages";
import {
  useAdminDeleteUser,
  useAdminGetAllLoans,
  useAdminGetAllUsers,
  useAdminUpdateUserType,
} from "../../hooks/useQueries";
import type { PublicUser, UserLoanStats } from "../../types";

const BRAND_ORANGE = "#F47B30";
const BRAND_BLUE = "#1E5FA8";
const BRAND_NAVY = "#0f172a";

type SortKey =
  | "user_name"
  | "total_loans"
  | "total_value"
  | "active"
  | "disbursed"
  | "rejected"
  | "conversion_rate";
type SortDir = "asc" | "desc";

function formatCrore(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

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

function ConversionBadge({ rate }: { rate: number }) {
  const color = rate >= 50 ? "#16a34a" : rate >= 25 ? "#d97706" : "#dc2626";
  const bg = rate >= 50 ? "#f0fdf4" : rate >= 25 ? "#fffbeb" : "#fef2f2";
  const border = rate >= 50 ? "#bbf7d0" : rate >= 25 ? "#fde68a" : "#fecaca";
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {rate}%
    </span>
  );
}

function SortIcon({
  col,
  sort,
}: { col: SortKey; sort: { key: SortKey; dir: SortDir } }) {
  if (sort.key !== col)
    return <ArrowUpDown size={12} className="opacity-30 ml-1 inline" />;
  return sort.dir === "asc" ? (
    <ChevronUp
      size={12}
      className="ml-1 inline"
      style={{ color: BRAND_ORANGE }}
    />
  ) : (
    <ChevronDown
      size={12}
      className="ml-1 inline"
      style={{ color: BRAND_ORANGE }}
    />
  );
}

function SummaryCard({
  label,
  value,
  sub,
}: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold text-foreground font-display">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function TableSkeletonRows() {
  return (
    <>
      {[1, 2, 3, 4].map((n) => (
        <tr key={n} className="border-t border-border">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <Skeleton className="h-4 w-28" />
            </div>
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-5 w-16 ml-auto rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-12 ml-auto" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-16 ml-auto" />
          </td>
          <td className="px-4 py-3 hidden md:table-cell">
            <Skeleton className="h-4 w-10 ml-auto" />
          </td>
          <td className="px-4 py-3 hidden md:table-cell">
            <Skeleton className="h-4 w-10 ml-auto" />
          </td>
          <td className="px-4 py-3 hidden lg:table-cell">
            <Skeleton className="h-4 w-10 ml-auto" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-5 w-12 ml-auto rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-7 w-24 rounded-md" />
          </td>
        </tr>
      ))}
    </>
  );
}

interface ExtendedStats extends UserLoanStats {
  active: number;
  disbursed: number;
  rejected: number;
  role: string;
  user_type: string;
}

// ─── Delete Confirmation Modal ───────────────────────────────────────────────

function DeleteUserModal({
  user,
  onClose,
  onConfirm,
  isPending,
  errorMsg,
}: {
  user: { id: number; name: string };
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
            <div>
              <p className="text-sm font-semibold text-foreground">
                Delete {user.name}?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This cannot be undone. All access for this user will be revoked.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-muted-foreground hover:text-foreground"
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

export default function UsersTeamPage() {
  const { data: users, isLoading: usersLoading } = useAdminGetAllUsers();
  const { data: loansData, isLoading: loansLoading } = useAdminGetAllLoans(
    1,
    500,
    "",
    null,
    null,
  );
  const updateUserTypeMutation = useAdminUpdateUserType();
  const deleteUserMutation = useAdminDeleteUser();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "total_loans",
    dir: "desc",
  });
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [updatingTypeId, setUpdatingTypeId] = useState<number | null>(null);

  const isLoading = usersLoading || loansLoading;

  // Build per-user stats including admin users
  const allStats = useMemo<ExtendedStats[]>(() => {
    if (!users) return [];
    return users.map((user: PublicUser) => {
      const assignedLoans = (loansData?.loans ?? []).filter((lh) =>
        lh.assignedUserIds.includes(user.id),
      );
      const totalValue = assignedLoans.reduce(
        (sum, lh) => sum + lh.loan.loanAmount,
        0,
      );

      const stageMap = new Map<string, number>();
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

      const conversionRate =
        assignedLoans.length > 0
          ? Math.round((disbursed / assignedLoans.length) * 100)
          : 0;

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
        rejected,
      };
    });
  }, [users, loansData]);

  // Filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allStats;
    return allStats.filter((s) => s.user_name.toLowerCase().includes(q));
  }, [allStats, search]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sort.key as keyof ExtendedStats] as number | string;
      const bVal = b[sort.key as keyof ExtendedStats] as number | string;
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }

  async function handleTypeChange(userId: number, newType: string) {
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
        result.err ??
          "Cannot delete user. They may have active loan assignments.",
      );
      return;
    }
    setDeleteTarget(null);
  }

  // Summary totals
  const totalMembers = allStats.length;
  const totalLoansAll = allStats.reduce((s, u) => s + u.total_loans, 0);
  const totalValueAll = allStats.reduce((s, u) => s + u.total_value, 0);
  const avgConversion =
    allStats.length > 0
      ? Math.round(
          allStats.reduce((s, u) => s + u.conversion_rate, 0) / allStats.length,
        )
      : 0;

  function ThCol({
    col,
    label,
    className = "",
  }: {
    col: SortKey;
    label: string;
    className?: string;
  }) {
    return (
      <th
        className={`px-4 py-3 font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-smooth ${className}`}
        onClick={() => toggleSort(col)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && toggleSort(col)
        }
        data-ocid={`sort-${col}`}
      >
        {label}
        <SortIcon col={col} sort={sort} />
      </th>
    );
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

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${BRAND_ORANGE}, #e05a0c)`,
              }}
            >
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                Teams
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage team members and view performance metrics
              </p>
            </div>
          </div>
          <a href="#/admin/users" data-ocid="create-user-btn">
            <Button
              className="text-white font-semibold flex items-center gap-2"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <UserPlus size={15} /> Create New User
            </Button>
          </a>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            label="Total Members"
            value={isLoading ? "—" : totalMembers}
            sub="Users & Admins"
          />
          <SummaryCard
            label="Loans Assigned"
            value={isLoading ? "—" : totalLoansAll}
            sub="Across all users"
          />
          <SummaryCard
            label="Portfolio Value"
            value={isLoading ? "—" : formatCrore(totalValueAll)}
            sub="Total active loan value"
          />
          <SummaryCard
            label="Avg Conversion"
            value={isLoading ? "—" : `${avgConversion}%`}
            sub="Disbursement rate"
          />
        </div>

        {/* User list section */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div
            className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${BRAND_NAVY}08 0%, transparent 100%)`,
            }}
          >
            <div className="flex items-center gap-2 flex-1">
              <TrendingUp size={16} style={{ color: BRAND_ORANGE }} />
              <h2 className="font-display font-semibold text-foreground">
                Performance Matrix
              </h2>
              {!isLoading && (
                <Badge variant="secondary" className="text-xs ml-1">
                  {filtered.length} {filtered.length === 1 ? "user" : "users"}
                </Badge>
              )}
            </div>

            {/* Search */}
            <div
              className="relative w-full sm:w-64"
              data-ocid="user-search-wrapper"
            >
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm"
                data-ocid="user-search-input"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-xs text-muted-foreground uppercase tracking-wide"
                    style={{ backgroundColor: `${BRAND_NAVY}06` }}
                  >
                    <th className="text-left px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="text-right px-4 py-3 font-medium">Total</th>
                    <th className="text-right px-4 py-3 font-medium">
                      Value (₹)
                    </th>
                    <th className="text-right px-4 py-3 font-medium hidden md:table-cell">
                      Active
                    </th>
                    <th className="text-right px-4 py-3 font-medium hidden md:table-cell">
                      Disbursed
                    </th>
                    <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">
                      Rejected
                    </th>
                    <th className="text-right px-4 py-3 font-medium">Conv%</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  <TableSkeletonRows />
                </tbody>
              </table>
            </div>
          ) : sorted.length === 0 ? (
            <div className="py-16 text-center px-4">
              <Users
                size={40}
                className="mx-auto mb-3"
                style={{ color: `${BRAND_ORANGE}40` }}
              />
              {search ? (
                <>
                  <p className="font-semibold text-foreground text-sm">
                    No users match "{search}"
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Try a different name.
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-xs hover:underline"
                    style={{ color: BRAND_BLUE }}
                    onClick={() => setSearch("")}
                    data-ocid="clear-search-btn"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                <>
                  <p className="font-semibold text-foreground text-sm">
                    No users yet
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Create users to start tracking performance.
                  </p>
                  <a href="#/admin/users" data-ocid="empty-create-user-link">
                    <button
                      type="button"
                      className="mt-4 text-sm font-semibold px-4 py-1.5 rounded-md text-white"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      Create First User
                    </button>
                  </a>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-xs text-muted-foreground uppercase tracking-wide"
                    style={{ backgroundColor: `${BRAND_NAVY}06` }}
                  >
                    <ThCol col="user_name" label="User" className="text-left" />
                    <th className="px-4 py-3 font-medium text-center whitespace-nowrap">
                      Type
                    </th>
                    <ThCol
                      col="total_loans"
                      label="Total"
                      className="text-right"
                    />
                    <ThCol
                      col="total_value"
                      label="Value (₹)"
                      className="text-right"
                    />
                    <ThCol
                      col="active"
                      label="Active"
                      className="text-right hidden md:table-cell"
                    />
                    <ThCol
                      col="disbursed"
                      label="Disbursed"
                      className="text-right hidden md:table-cell"
                    />
                    <ThCol
                      col="rejected"
                      label="Rejected"
                      className="text-right hidden lg:table-cell"
                    />
                    <ThCol
                      col="conversion_rate"
                      label="Conv%"
                      className="text-right"
                    />
                    <th className="px-4 py-3 font-medium text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((stat, i) => (
                    <tr
                      key={stat.user_id}
                      className={`border-t border-border hover:bg-muted/30 transition-smooth ${i % 2 === 1 ? "bg-muted/10" : ""}`}
                      data-ocid={`team-row-${stat.user_id}`}
                    >
                      {/* User name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: BRAND_ORANGE }}
                          >
                            {stat.user_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate max-w-[120px] sm:max-w-none">
                              {stat.user_name}
                            </p>
                            <RoleBadge role={stat.role} />
                          </div>
                        </div>
                      </td>

                      {/* User type toggle */}
                      <td className="px-4 py-3 text-center">
                        {updatingTypeId === stat.user_id ? (
                          <span className="text-xs text-muted-foreground">
                            Saving…
                          </span>
                        ) : (
                          <select
                            value={stat.user_type}
                            onChange={(e) =>
                              handleTypeChange(stat.user_id, e.target.value)
                            }
                            className="text-xs border border-input rounded-md px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                            aria-label={`User type for ${stat.user_name}`}
                            data-ocid={`user-type-select-${stat.user_id}`}
                          >
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                          </select>
                        )}
                      </td>

                      {/* Total loans */}
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-foreground">
                          {stat.total_loans}
                        </span>
                      </td>

                      {/* Total value */}
                      <td className="px-4 py-3 text-right text-foreground font-medium whitespace-nowrap">
                        {formatCrore(stat.total_value)}
                      </td>

                      {/* Active */}
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#eff6ff",
                            color: BRAND_BLUE,
                          }}
                        >
                          {stat.active}
                        </span>
                      </td>

                      {/* Disbursed */}
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#f0fdf4",
                            color: "#16a34a",
                          }}
                        >
                          {stat.disbursed}
                        </span>
                      </td>

                      {/* Rejected */}
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={
                            stat.rejected > 0
                              ? {
                                  backgroundColor: "#fef2f2",
                                  color: "#dc2626",
                                }
                              : {
                                  backgroundColor: "#f4f4f5",
                                  color: "#71717a",
                                }
                          }
                        >
                          {stat.rejected}
                        </span>
                      </td>

                      {/* Conversion */}
                      <td className="px-4 py-3 text-right">
                        <ConversionBadge rate={stat.conversion_rate} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`#/admin/loans?assigned_user=${stat.user_id}`}
                            data-ocid={`view-perf-${stat.user_id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 whitespace-nowrap"
                              style={{
                                borderColor: BRAND_BLUE,
                                color: BRAND_BLUE,
                              }}
                            >
                              View Loans
                            </Button>
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setDeleteError("");
                              setDeleteTarget({
                                id: stat.user_id,
                                name: stat.user_name,
                              });
                            }}
                            aria-label={`Delete ${stat.user_name}`}
                            data-ocid={`delete-user-btn-${stat.user_id}`}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!isLoading && sorted.length > 0 && (
            <div
              className="px-5 py-3 border-t border-border flex items-center justify-between"
              style={{ backgroundColor: `${BRAND_NAVY}04` }}
            >
              <p className="text-xs text-muted-foreground">
                Showing {sorted.length} of {allStats.length} users
                {search && ` matching "${search}"`}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: BRAND_ORANGE }}
                />
                Click column headers to sort
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
