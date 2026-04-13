import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LOAN_STAGES, REJECTED_STAGE_LABEL } from "../../constants/stages";
import { useGetMyLoans } from "../../hooks/useQueries";

const ORANGE = "#F47B30";
const BLUE = "#1E5FA8";
const GREEN = "#22c55e";
const RED = "#dc2626";

const CHART_COLORS = [
  ORANGE,
  BLUE,
  GREEN,
  "#f59e0b",
  "#8b5cf6",
  RED,
  "#06b6d4",
  "#84cc16",
  "#ec4899",
  "#14b8a6",
];

function fmt(amount: number): string {
  if (amount >= 10_00_000) return `₹${(amount / 10_00_000).toFixed(1)}L`;
  if (amount >= 1_000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent: string;
  sub?: string;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3"
      data-ocid={`customer-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={15} style={{ color: accent }} />
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground leading-none">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function DashboardSkeletons() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-card border rounded-xl p-4 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border rounded-xl p-4">
          <Skeleton className="h-4 w-36 mb-4" />
          <Skeleton className="h-52 w-full" />
        </div>
        <div className="bg-card border rounded-xl p-4">
          <Skeleton className="h-4 w-36 mb-4" />
          <Skeleton className="h-52 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function CustomerDashboardPage() {
  const { data: loanItems, isLoading } = useGetMyLoans();

  const loans = useMemo(
    () => (loanItems ?? []).map((li) => li.loan),
    [loanItems],
  );

  const stats = useMemo(() => {
    const total = loans.length;
    const totalValue = loans.reduce((s, l) => s + l.loanAmount, 0);
    const active = loans.filter(
      (l) =>
        l.isActive && !l.isRejected && l.currentStage < LOAN_STAGES.length - 1,
    ).length;
    const completed = loans.filter(
      (l) => !l.isRejected && l.currentStage >= LOAN_STAGES.length - 1,
    ).length;
    const rejected = loans.filter((l) => l.isRejected).length;

    // Stage distribution (exclude rejected)
    const stageMap: Record<string, number> = {};
    for (const l of loans) {
      if (!l.isRejected) {
        const name = LOAN_STAGES[l.currentStage] ?? "Unknown";
        stageMap[name] = (stageMap[name] ?? 0) + 1;
      }
    }
    const stageData = Object.entries(stageMap).map(([name, count]) => ({
      name,
      count,
    }));

    // Value by stage (for bar chart)
    const valueMap: Record<string, number> = {};
    for (const l of loans) {
      if (!l.isRejected) {
        const name = LOAN_STAGES[l.currentStage] ?? "Unknown";
        valueMap[name] = (valueMap[name] ?? 0) + l.loanAmount;
      }
    }
    const valueData = Object.entries(valueMap).map(([name, value]) => ({
      name: name.length > 10 ? `${name.slice(0, 10)}…` : name,
      fullName: name,
      value,
    }));

    // Recent (last 5 by updatedAt)
    const recent = [...loans]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 5);

    return {
      total,
      totalValue,
      active,
      completed,
      rejected,
      stageData,
      valueData,
      recent,
    };
  }, [loans]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${ORANGE}18` }}
          >
            <TrendingUp size={18} style={{ color: ORANGE }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your loan portfolio
            </p>
          </div>
        </div>
        <DashboardSkeletons />
      </div>
    );
  }

  if (!loans.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${ORANGE}18` }}
          >
            <TrendingUp size={18} style={{ color: ORANGE }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your loan portfolio
            </p>
          </div>
        </div>
        <div
          className="bg-card border border-dashed border-border rounded-xl p-12 text-center"
          data-ocid="customer-dashboard-empty"
        >
          <div
            className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${ORANGE}18` }}
          >
            <FileText size={30} style={{ color: ORANGE }} />
          </div>
          <p className="text-foreground font-semibold text-lg">
            No loans assigned yet
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Your loan applications will appear here once your BiggPocket agent
            sets them up for you.
          </p>
          <a
            href="#/tracker/loans"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-smooth hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
            data-ocid="customer-dashboard-view-loans"
          >
            View My Loans
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${ORANGE}18` }}
        >
          <TrendingUp size={18} style={{ color: ORANGE }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your loan portfolio
          </p>
        </div>
      </div>

      {/* Rejected Warning */}
      {stats.rejected > 0 && (
        <div
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{ backgroundColor: `${RED}0c`, borderColor: `${RED}40` }}
          data-ocid="customer-dashboard-rejected-warning"
        >
          <AlertTriangle
            size={18}
            style={{ color: RED }}
            className="shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: RED }}>
              {`${stats.rejected} loan${stats.rejected !== 1 ? "s" : ""} ${stats.rejected !== 1 ? "have" : "has"} been rejected`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Contact your BiggPocket agent for more information.
            </p>
          </div>
          <a
            href="#/tracker/loans"
            className="ml-auto shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg text-white"
            style={{ backgroundColor: RED }}
            data-ocid="customer-dashboard-view-rejected"
          >
            View
          </a>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Loans"
          value={stats.total}
          icon={FileText}
          accent={BLUE}
          sub="all files"
        />
        <StatCard
          label="Active Loans"
          value={stats.active}
          icon={TrendingUp}
          accent={ORANGE}
          sub="in progress"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          accent={GREEN}
          sub="payout received"
        />
        <StatCard
          label="Total Value"
          value={fmt(stats.totalValue)}
          icon={Wallet}
          accent={BLUE}
          sub="sum of all loans"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stage Distribution Pie */}
        {stats.stageData.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Stage Distribution
            </h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.stageData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={72}
                    innerRadius={30}
                  >
                    {stats.stageData.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [
                      `${value} loan${value !== 1 ? "s" : ""}`,
                      "",
                    ]}
                  />
                  <Legend
                    iconSize={8}
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(v) => (
                      <span style={{ color: "var(--muted-foreground)" }}>
                        {v}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Loan Value by Stage Bar */}
        {stats.valueData.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Loan Value by Stage
            </h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.valueData}
                  margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => fmt(v)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [fmt(value), "Loan Value"]}
                    labelFormatter={(label: string) => {
                      const found = stats.valueData.find(
                        (d) => d.name === label,
                      );
                      return found?.fullName ?? label;
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {stats.valueData.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Recent Loans */}
      {stats.recent.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div
            className="px-4 py-3 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="text-sm font-semibold text-foreground">
              Recent Loans
            </h2>
            <a
              href="#/tracker/loans"
              className="text-xs font-medium hover:underline"
              style={{ color: ORANGE }}
              data-ocid="customer-dashboard-all-loans"
            >
              View all
            </a>
          </div>
          <div className="divide-y divide-border">
            {stats.recent.map((loan) => {
              const isRej = loan.isRejected === true;
              const stage = isRej
                ? REJECTED_STAGE_LABEL
                : (LOAN_STAGES[loan.currentStage] ?? "Unknown");
              const stageColor = isRej
                ? RED
                : loan.currentStage >= LOAN_STAGES.length - 1
                  ? GREEN
                  : ORANGE;
              return (
                <a
                  key={loan.id}
                  href={`#/tracker/loans/${loan.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-smooth group"
                  data-ocid={`customer-recent-loan-${loan.id}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {loan.applicantName || `Loan #${loan.id}`}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {loan.bankName}
                    </p>
                  </div>
                  <div className="text-right ml-3 shrink-0 space-y-1">
                    <p className="text-sm font-semibold text-foreground font-mono">
                      {fmt(loan.loanAmount)}
                    </p>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${stageColor}18`,
                        color: stageColor,
                      }}
                    >
                      {stage}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
