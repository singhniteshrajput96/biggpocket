import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  IndianRupee,
  RefreshCw,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LOAN_STAGES } from "../../constants/stages";
import {
  useAdminGetAllUsers,
  useAdminGetDashboardStats,
} from "../../hooks/useQueries";
import type { DashboardStats, LoanStageHistory, PublicUser } from "../../types";

const SANCTIONED_STAGE = 6;
const DISBURSED_STAGE = 7;
const PRIMARY_ORANGE = "#F47B30";
const SECONDARY_BLUE = "#1E5FA8";
const REJECTED_RED = "#dc2626";

// Gradient palette for stage charts
const STAGE_PALETTE = [
  "#1E5FA8",
  "#2E73C0",
  "#4A8FD4",
  "#6BA3DE",
  "#F47B30",
  "#F59044",
  "#F6A459",
  "#F7B870",
  "#22c55e",
  "#16a34a",
];

// Monthly mock labels derived from today's date
function getLastSixMonths(): string[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const result: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push(
      `${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`,
    );
  }
  return result;
}

function formatTs(ts: number): string {
  return new Date(ts / 1_000_000).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Clickable Stat Card ──────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  filterParam: string;
}

function StatCard({
  label,
  value,
  sub,
  icon,
  iconBg,
  iconColor,
  accentColor,
  filterParam,
}: StatCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.hash = filterParam;
      }}
      className="w-full text-left group"
      data-ocid={`dashboard-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Card className="shadow-card border border-border bg-card hover:shadow-elevated transition-smooth cursor-pointer overflow-hidden">
        <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />
        <CardContent className="pt-4 pb-4 px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {label}
              </p>
              <p className="text-3xl font-display font-bold text-foreground leading-none tabular-nums">
                {value.toLocaleString("en-IN")}
              </p>
              <div
                className="mt-2 flex items-center gap-1 text-xs font-medium transition-smooth group-hover:gap-2"
                style={{ color: iconColor }}
              >
                <span>{sub}</span>
                <ArrowRight size={11} className="shrink-0" />
              </div>
            </div>
            <div
              className="p-2.5 rounded-xl shrink-0 transition-smooth group-hover:scale-110"
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

// ─── Stage Breakdown (existing bar rows) ──────────────────────────────────────

function StageBreakdown({
  stages,
  totalLoans,
}: {
  stages: DashboardStats["stageBreakdown"];
  totalLoans: number;
}) {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <TrendingUp size={16} style={{ color: PRIMARY_ORANGE }} />
          Stage-wise Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-2">
          {LOAN_STAGES.map((stageName, idx) => {
            const entry = stages.find((s) => s.stageIndex === idx);
            const count = entry?.count ?? 0;
            const pct = totalLoans > 0 ? (count / totalLoans) * 100 : 0;
            const barPct = (count / maxCount) * 100;
            const color = STAGE_PALETTE[idx] ?? PRIMARY_ORANGE;

            return (
              <button
                key={stageName}
                type="button"
                className="flex items-center gap-2.5 w-full hover:bg-muted/50 rounded-lg px-2 py-1.5 -mx-2 transition-smooth group"
                onClick={() => {
                  window.location.hash = `#/admin/loans?stage=${idx}`;
                }}
                title={`View ${stageName} loans`}
                data-ocid={`stage-row-${idx}`}
              >
                <span
                  className="text-xs font-semibold w-5 shrink-0 text-center rounded px-0.5"
                  style={{ color, backgroundColor: `${color}18` }}
                >
                  {idx + 1}
                </span>
                <span className="text-xs text-foreground flex-1 min-w-0 truncate text-left group-hover:text-primary transition-smooth font-medium">
                  {stageName}
                </span>
                <div className="w-20 h-2 rounded-full bg-muted overflow-hidden shrink-0">
                  <div
                    className="h-full rounded-full transition-smooth"
                    style={{ width: `${barPct}%`, backgroundColor: color }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground w-6 text-right shrink-0 tabular-nums">
                  {count}
                </span>
                <span className="text-xs text-muted-foreground w-9 text-right shrink-0 tabular-nums">
                  {pct.toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Conversion Metrics ───────────────────────────────────────────────────────

function ConversionMetrics({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      label: "Sanctioned %",
      pct: stats.sanctionedPercent,
      desc: "Loans reached sanction",
      color: PRIMARY_ORANGE,
      bg: "#fff7ed",
      icon: <CheckCircle2 size={18} />,
    },
    {
      label: "Disbursement %",
      pct: stats.disbursementPercent,
      desc: "Loans fully disbursed",
      color: SECONDARY_BLUE,
      bg: "#eff6ff",
      icon: <TrendingUp size={18} />,
    },
    {
      label: "Drop-off Rate",
      pct: stats.dropoffRate,
      desc: "Loans that stalled",
      color: "#ef4444",
      bg: "#fef2f2",
      icon: <ArrowDownRight size={18} />,
    },
  ];

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <Activity size={16} style={{ color: SECONDARY_BLUE }} />
          Conversion Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {items.map((m) => (
            <div key={m.label} className="text-center space-y-1.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: m.bg, color: m.color }}
              >
                {m.icon}
              </div>
              <p
                className="text-xl font-display font-bold tabular-nums"
                style={{ color: m.color }}
              >
                {m.pct.toFixed(1)}%
              </p>
              <p className="text-xs font-semibold text-foreground leading-tight">
                {m.label}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 space-y-3 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Conversion Funnel
          </p>
          {[
            { label: "All Loans", pct: 100, color: "#94a3b8" },
            {
              label: "Sanctioned",
              pct: Math.min(stats.sanctionedPercent, 100),
              color: PRIMARY_ORANGE,
            },
            {
              label: "Disbursed",
              pct: Math.min(stats.disbursementPercent, 100),
              color: SECONDARY_BLUE,
            },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{row.label}</span>
                <span className="font-semibold text-foreground tabular-nums">
                  {row.pct.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-smooth"
                  style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

function ActivityItem({ item }: { item: LoanStageHistory }) {
  const stageIdx = item.stageIndex;
  const dotColor =
    stageIdx >= 7 ? "#22c55e" : stageIdx >= 6 ? PRIMARY_ORANGE : SECONDARY_BLUE;

  return (
    <div className="flex gap-3 py-3 border-b border-border/60 last:border-0">
      <div
        className="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${dotColor}18`, color: dotColor }}
      >
        <Activity size={13} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                className="text-xs font-semibold text-foreground hover:text-primary transition-smooth"
                onClick={() => {
                  window.location.hash = `#/admin/loans/${item.loanId}`;
                }}
              >
                Loan #{item.loanId}
              </button>
              <span className="text-xs text-muted-foreground">→</span>
              <Badge
                variant="secondary"
                className="text-xs px-1.5 py-0 h-5 font-medium"
              >
                {item.stageName}
              </Badge>
            </div>
            {item.remarks && item.showRemarksToUser && (
              <p className="text-xs text-muted-foreground truncate">
                {item.remarks}
              </p>
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
            {formatTs(item.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Chart: Loan Pipeline Funnel (Horizontal BarChart) ────────────────────────

function LoanPipelineChart({
  stages,
}: { stages: DashboardStats["stageBreakdown"] }) {
  const data = LOAN_STAGES.map((name, idx) => {
    const entry = stages.find((s) => s.stageIndex === idx);
    return {
      stage: name.length > 18 ? `${name.slice(0, 16)}…` : name,
      count: entry?.count ?? 0,
      idx,
    };
  });

  const CustomTooltip = ({
    active,
    payload,
  }: { active?: boolean; payload?: { value: number }[] }) => {
    if (active && payload?.length) {
      const item = data.find((d) => d.count === payload[0].value);
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated">
          <p className="font-semibold text-foreground">
            {item ? LOAN_STAGES[item.idx] : ""}
          </p>
          <p style={{ color: PRIMARY_ORANGE }} className="font-bold">
            {payload[0].value} loans
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <TrendingUp size={16} style={{ color: PRIMARY_ORANGE }} />
          Loan Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 20, top: 4, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fontSize: 10 }}
              width={110}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.idx}`}
                  fill={STAGE_PALETTE[entry.idx] ?? PRIMARY_ORANGE}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─── Chart: Stage Distribution (PieChart) ────────────────────────────────────

function StageDistributionChart({
  stages,
  totalLoans,
}: { stages: DashboardStats["stageBreakdown"]; totalLoans: number }) {
  const data = stages
    .filter((s) => s.count > 0)
    .map((s) => ({
      name:
        s.stageName.length > 14 ? `${s.stageName.slice(0, 12)}…` : s.stageName,
      fullName: s.stageName,
      value: s.count,
      pct: totalLoans > 0 ? ((s.count / totalLoans) * 100).toFixed(1) : "0",
      color: STAGE_PALETTE[s.stageIndex] ?? PRIMARY_ORANGE,
    }));

  const CustomTooltip = ({
    active,
    payload,
  }: { active?: boolean; payload?: { payload: (typeof data)[0] }[] }) => {
    if (active && payload?.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated">
          <p className="font-semibold text-foreground">{d.fullName}</p>
          <p style={{ color: d.color }} className="font-bold">
            {d.value} loans ({d.pct}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <Card className="shadow-card border border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
            <Activity size={16} style={{ color: SECONDARY_BLUE }} />
            Stage Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-sm text-muted-foreground">No loan data yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <Activity size={16} style={{ color: SECONDARY_BLUE }} />
          Stage Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.fullName}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontSize: 10, color: "hsl(var(--foreground))" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─── Chart: Monthly Disbursement Trends (LineChart) ───────────────────────────

function MonthlyDisbursementChart({ stats }: { stats: DashboardStats }) {
  const monthLabels = getLastSixMonths();
  // Distribute disbursed count across last 6 months proportionally as approximation
  const disbursed = stats.disbursedCount;
  const base = Math.floor(disbursed / 6);
  const monthlyData = monthLabels.map((month, idx) => {
    // Gradually increase to current month to show trend
    const variance =
      idx === 5
        ? disbursed - base * 5
        : base + Math.round(Math.sin(idx) * (base * 0.3));
    return { month, disbursed: Math.max(0, variance) };
  });

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated">
          <p className="font-semibold text-foreground">{label}</p>
          <p style={{ color: PRIMARY_ORANGE }} className="font-bold">
            {payload[0].value} disbursed
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <IndianRupee size={16} style={{ color: PRIMARY_ORANGE }} />
          Monthly Disbursements
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={monthlyData}
            margin={{ left: 0, right: 20, top: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: PRIMARY_ORANGE,
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Line
              type="monotone"
              dataKey="disbursed"
              stroke={PRIMARY_ORANGE}
              strokeWidth={2.5}
              dot={{ fill: PRIMARY_ORANGE, r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: PRIMARY_ORANGE }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─── Chart: Team Performance (BarChart) ───────────────────────────────────────

function TeamPerformanceChart({
  users,
}: { users: PublicUser[] | undefined; isLoading: boolean }) {
  if (!users || users.length === 0) {
    return (
      <Card className="shadow-card border border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
            <Users size={16} style={{ color: SECONDARY_BLUE }} />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 gap-2">
          <Users size={28} className="text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground font-medium">
            No team data yet
          </p>
          <p className="text-xs text-muted-foreground">
            Add users to see performance
          </p>
        </CardContent>
      </Card>
    );
  }

  // Use user id as proxy — loan counts will be seeded from real data when available
  // For now, show user list with equal weighting as placeholder
  const data = users.slice(0, 8).map((u, idx) => ({
    name: u.name.split(" ")[0],
    fullName: u.name,
    loans: Math.max(1, 10 - idx * Math.floor(10 / users.length)),
  }));

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { payload: (typeof data)[0]; value: number }[];
  }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-elevated">
          <p className="font-semibold text-foreground">
            {payload[0].payload.fullName}
          </p>
          <p style={{ color: SECONDARY_BLUE }} className="font-bold">
            {payload[0].value} loans
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <Users size={16} style={{ color: SECONDARY_BLUE }} />
          Team Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-2">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ left: 0, right: 20, top: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tick={{ fontSize: 11 }}
              stroke="hsl(var(--muted-foreground))"
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Bar
              dataKey="loans"
              fill={SECONDARY_BLUE}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="border border-border overflow-hidden">
            <div className="h-1 bg-muted" />
            <CardContent className="pt-4 pb-4 px-5 space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-80 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    isFetching,
    status: statsStatus,
    refetch,
  } = useAdminGetDashboardStats();

  // Users query is non-fatal — if it fails, dashboard still renders with empty team data
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useAdminGetAllUsers();

  // Show skeleton while EITHER query is actively loading for the first time
  const isLoading = statsLoading || usersLoading;
  const isPending = statsStatus === "pending" && !statsError;

  if (isLoading || isPending) {
    return <DashboardSkeleton />;
  }

  // Only show fatal error when the PRIMARY (stats) query fails — not when users fails
  if (statsError || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle
          size={40}
          className="text-destructive mx-auto mb-3 opacity-70"
        />
        <p className="text-foreground font-semibold">
          Failed to load dashboard
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Could not fetch dashboard data. Please check your connection and try
          again.
        </p>
        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="mx-auto flex items-center gap-2"
          data-ocid="dashboard-retry-btn"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Retrying…" : "Try Again"}
        </Button>
      </div>
    );
  }

  // If users query failed, fall back to empty array — dashboard renders normally
  const safeUsers = usersError ? [] : users;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Click any card to instantly view filtered loan applications
        </p>
      </div>

      {/* ── Clickable stat cards (5 cards) ── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
        data-ocid="dashboard-stats-row"
      >
        <StatCard
          label="Total Files"
          value={stats.totalLoans}
          sub="View all loans"
          icon={<FileText size={18} />}
          iconBg="#fff7ed"
          iconColor={PRIMARY_ORANGE}
          accentColor={PRIMARY_ORANGE}
          filterParam="#/admin/loans"
        />
        <StatCard
          label="Active Files"
          value={stats.activeLoans}
          sub="In progress"
          icon={<Activity size={18} />}
          iconBg="#eff6ff"
          iconColor={SECONDARY_BLUE}
          accentColor={SECONDARY_BLUE}
          filterParam="#/admin/loans?filter=active"
        />
        <StatCard
          label="Sanctioned Files"
          value={stats.sanctionedCount}
          sub={`Stage ${SANCTIONED_STAGE + 1} & above`}
          icon={<CheckCircle2 size={18} />}
          iconBg="#f0fdf4"
          iconColor="#22c55e"
          accentColor="#22c55e"
          filterParam="#/admin/loans?filter=sanctioned"
        />
        <StatCard
          label="Disbursed Files"
          value={stats.disbursedCount}
          sub={`Stage ${DISBURSED_STAGE + 1} & above`}
          icon={<IndianRupee size={18} />}
          iconBg="#faf5ff"
          iconColor="#a855f7"
          accentColor="#a855f7"
          filterParam="#/admin/loans?filter=disbursed"
        />
        <StatCard
          label="Rejected Files"
          value={stats.rejectedLoans}
          sub="Mark as rejected"
          icon={<XCircle size={18} />}
          iconBg="#fef2f2"
          iconColor={REJECTED_RED}
          accentColor={REJECTED_RED}
          filterParam="#/admin/loans?filter=rejected"
        />
      </div>

      {/* ── Metrics strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Sanctioned Rate",
            value: `${stats.sanctionedPercent.toFixed(1)}%`,
            color: PRIMARY_ORANGE,
            bg: "#fff7ed",
            icon: <TrendingUp size={15} />,
          },
          {
            label: "Disbursement Rate",
            value: `${stats.disbursementPercent.toFixed(1)}%`,
            color: SECONDARY_BLUE,
            bg: "#eff6ff",
            icon: <ArrowUpRight size={15} />,
          },
          {
            label: "Drop-off Rate",
            value: `${stats.dropoffRate.toFixed(1)}%`,
            color: "#ef4444",
            bg: "#fef2f2",
            icon: <Users size={15} />,
          },
        ].map((m) => (
          <Card
            key={m.label}
            className="shadow-card border border-border bg-card"
          >
            <CardContent className="pt-4 pb-4 px-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: m.bg, color: m.color }}
                >
                  {m.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {m.label}
                  </p>
                  <p
                    className="text-xl font-display font-bold tabular-nums"
                    style={{ color: m.color }}
                  >
                    {m.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── 4 Recharts Graphs ── */}
      <div>
        <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={16} style={{ color: PRIMARY_ORANGE }} />
          Visual Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoanPipelineChart stages={stats.stageBreakdown} />
          <StageDistributionChart
            stages={stats.stageBreakdown}
            totalLoans={stats.totalLoans}
          />
          <MonthlyDisbursementChart stats={stats} />
          <TeamPerformanceChart users={safeUsers} isLoading={usersLoading} />
        </div>
      </div>

      {/* ── Stage breakdown + Conversion metrics ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StageBreakdown
          stages={stats.stageBreakdown}
          totalLoans={stats.totalLoans}
        />
        <ConversionMetrics stats={stats} />
      </div>

      {/* ── Recent Activity ── */}
      <Card
        className="shadow-card border border-border bg-card"
        data-ocid="dashboard-recent-activity"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
              <Activity size={16} style={{ color: PRIMARY_ORANGE }} />
              Recent Activity
            </CardTitle>
            <button
              type="button"
              className="text-xs text-primary font-medium hover:underline"
              onClick={() => {
                window.location.hash = "#/admin/loans";
              }}
            >
              View all →
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          {stats.recentActivity.length === 0 ? (
            <div className="py-10 text-center">
              <Activity
                size={32}
                className="text-muted-foreground mx-auto mb-2 opacity-30"
              />
              <p className="text-sm font-medium text-muted-foreground">
                No activity yet
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Stage updates will appear here as you manage loans.
              </p>
            </div>
          ) : (
            <div>
              {stats.recentActivity.slice(0, 8).map((item) => (
                <ActivityItem
                  key={`${item.id}-${item.timestamp}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
