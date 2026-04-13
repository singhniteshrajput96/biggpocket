import { FileText, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const BRAND_ORANGE = "#F47B30";
const BRAND_NAVY = "#0f172a";

interface CustomerLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  ocid: string;
}

const navLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "#/tracker/dashboard",
    icon: <LayoutDashboard size={16} />,
    ocid: "customer-nav-dashboard",
  },
  {
    label: "My Loans",
    href: "#/tracker/loans",
    icon: <FileText size={16} />,
    ocid: "customer-nav-loans",
  },
];

export function CustomerLayout({ children, currentPath }: CustomerLayoutProps) {
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header — dark navy with BiggPocket logo */}
      <header
        className="no-print sticky top-0 z-50 border-b border-white/10 shadow-sm"
        style={{ backgroundColor: BRAND_NAVY }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/biggpocket-logo.png"
              alt="BiggPocket"
              className="h-9 w-auto object-contain"
              style={{ maxWidth: 160 }}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                    isActive
                      ? "text-orange-400"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: `${BRAND_ORANGE}22` }
                      : undefined
                  }
                  data-ocid={link.ocid}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                {session?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <span className="text-sm text-slate-300 font-medium">
                {session?.name ?? "User"}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="hidden md:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-smooth px-2 py-1.5 rounded-md hover:bg-white/10"
              data-ocid="customer-logout"
              aria-label="Logout"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden text-slate-300 hover:text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t border-white/10 px-4 py-3 space-y-1"
            style={{ backgroundColor: BRAND_NAVY }}
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium w-full ${
                    isActive
                      ? "text-orange-400"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  data-ocid={`${link.ocid}-mobile`}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-slate-300">
                {session?.name ?? "User"}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="no-print bg-muted/40 border-t py-3 px-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
