import { Suspense, lazy, useEffect, useState } from "react";
import { AdminLayout } from "./components/Layout/AdminLayout";
import { CustomerLayout } from "./components/Layout/CustomerLayout";
import { isAdmin, isLoggedIn } from "./lib/auth";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/DashboardPage"));
const AdminLoansPage = lazy(() => import("./pages/admin/LoansPage"));
const AdminLoanDetailPage = lazy(() => import("./pages/admin/LoanDetailPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/UsersPage"));
const AdminUsersTeamPage = lazy(() => import("./pages/admin/UsersTeamPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const CustomerLoansPage = lazy(() => import("./pages/customer/MyLoansPage"));
const LoanTrackerPage = lazy(() => import("./pages/customer/LoanTrackerPage"));
const CustomerDashboardPage = lazy(
  () => import("./pages/customer/CustomerDashboardPage"),
);

function getPath(): string {
  const hash = window.location.hash;
  if (!hash || hash === "#" || hash === "#/") return "/";
  return hash.replace(/^#/, "");
}

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ProtectedAdmin({
  children,
  currentPath,
}: { children: React.ReactNode; currentPath: string }) {
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.hash = "#/login";
    } else if (!isAdmin()) {
      window.location.hash = "#/tracker/loans";
    }
  }, []);

  if (!isLoggedIn() || !isAdmin()) return <Spinner />;
  return <AdminLayout currentPath={currentPath}>{children}</AdminLayout>;
}

function ProtectedCustomer({
  children,
  currentPath,
}: { children: React.ReactNode; currentPath: string }) {
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.hash = "#/login";
    } else if (isAdmin()) {
      window.location.hash = "#/admin/dashboard";
    }
  }, []);

  if (!isLoggedIn() || isAdmin()) return <Spinner />;
  return <CustomerLayout currentPath={currentPath}>{children}</CustomerLayout>;
}

export default function App() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    function onHashChange() {
      setPath(getPath());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Root redirect
  useEffect(() => {
    if (path === "/" || path === "") {
      if (isLoggedIn()) {
        window.location.hash = isAdmin()
          ? "#/admin/dashboard"
          : "#/tracker/loans";
      } else {
        window.location.hash = "#/login";
      }
    }
  }, [path]);

  // Match loan detail: /admin/loans/:id
  const loanDetailMatch = path.match(/^\/admin\/loans\/(\d+)$/);
  // Match customer tracker: /tracker/loans/:id
  const trackerDetailMatch = path.match(/^\/tracker\/loans\/(\d+)$/);

  const knownPaths = [
    "/login",
    "/admin/dashboard",
    "/admin/loans",
    "/admin/users",
    "/admin/users/team",
    "/admin/settings",
    "/tracker/loans",
    "/tracker/dashboard",
  ];
  const isUnmatched =
    !knownPaths.includes(path) &&
    !loanDetailMatch &&
    !trackerDetailMatch &&
    path !== "/" &&
    path !== "";

  return (
    <Suspense fallback={<Spinner />}>
      {path === "/login" && <LoginPage />}

      {path === "/admin/dashboard" && (
        <ProtectedAdmin currentPath={path}>
          <AdminDashboard />
        </ProtectedAdmin>
      )}

      {path === "/admin/loans" && (
        <ProtectedAdmin currentPath={path}>
          <AdminLoansPage />
        </ProtectedAdmin>
      )}

      {loanDetailMatch && (
        <ProtectedAdmin currentPath="/admin/loans">
          <AdminLoanDetailPage
            loanId={Number.parseInt(loanDetailMatch[1], 10)}
          />
        </ProtectedAdmin>
      )}

      {path === "/admin/users" && (
        <ProtectedAdmin currentPath={path}>
          <AdminUsersPage />
        </ProtectedAdmin>
      )}

      {path === "/admin/users/team" && (
        <ProtectedAdmin currentPath={path}>
          <AdminUsersTeamPage />
        </ProtectedAdmin>
      )}

      {path === "/admin/settings" && (
        <ProtectedAdmin currentPath={path}>
          <AdminSettingsPage />
        </ProtectedAdmin>
      )}

      {path === "/tracker/loans" && (
        <ProtectedCustomer currentPath={path}>
          <CustomerLoansPage />
        </ProtectedCustomer>
      )}

      {path === "/tracker/dashboard" && (
        <ProtectedCustomer currentPath={path}>
          <CustomerDashboardPage />
        </ProtectedCustomer>
      )}

      {trackerDetailMatch && (
        <ProtectedCustomer currentPath="/tracker/loans">
          <LoanTrackerPage
            loanId={Number.parseInt(trackerDetailMatch[1], 10)}
          />
        </ProtectedCustomer>
      )}

      {/* Fallback for unmatched routes */}
      {isUnmatched && (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center space-y-3">
            <p className="text-4xl font-display font-bold text-foreground">
              404
            </p>
            <p className="text-muted-foreground">Page not found.</p>
            <a href="#/login" className="text-primary underline text-sm">
              Go to login
            </a>
          </div>
        </div>
      )}
    </Suspense>
  );
}
