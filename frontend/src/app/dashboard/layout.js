"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch {
      // error handled
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/users", label: "Users", icon: "👥" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className={styles.dashboardLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <a href="/" className={styles.sidebarLogo}>
            <span>🛡️</span>
            <span className={styles.sidebarLogoText}>AdvancedAuth</span>
          </a>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navSection}>
            <span className={styles.navSectionLabel}>Menu</span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  pathname === item.href ? styles.navItemActive : ""
                }`}
              >
                <span className={styles.navItemIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.name || "User"}</span>
                <span className={styles.userEmail}>{user.email || ""}</span>
              </div>
            </div>
          )}
          <button
            className={`btn btn-ghost ${styles.logoutBtn}`}
            onClick={handleLogout}
          >
            🚪 Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <h2 className={styles.pageTitle}>
              {navItems.find((i) => i.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>
          <div className={styles.topBarRight}>
            {user && (
              <span className={`badge ${user.isVerified ? "badge-success" : "badge-warning"}`}>
                {user.isVerified ? "✓ Verified" : "⚠ Unverified"}
              </span>
            )}
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
