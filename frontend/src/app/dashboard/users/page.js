"use client";

import styles from "../dashboard.module.css";

export default function UsersPage() {
  return (
    <div>
      <div className={styles.emptyState}>
        <span className={styles.emptyStateIcon}>👥</span>
        <p className={styles.emptyStateText}>User Management</p>
        <p className={styles.emptyStateSub}>
          User listing requires an admin API endpoint. This page will display
          all registered users once the backend provides a{" "}
          <code style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
            GET /api/auth/users
          </code>{" "}
          endpoint.
        </p>
      </div>
    </div>
  );
}
