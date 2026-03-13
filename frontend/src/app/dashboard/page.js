"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { user } = useAuth();

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div>
      {/* Welcome Card */}
      <div className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>
          Welcome back,{" "}
          <span className={styles.welcomeGradient}>
            {user?.name || "User"}
          </span>{" "}
          👋
        </h1>
        <p className={styles.welcomeSubtitle}>
          Here&apos;s an overview of your account and security status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statCardIcon}>🛡️</span>
            <span className={styles.statCardLabel}>Status</span>
          </div>
          <div className={styles.statCardValue}>
            {user?.isVerified ? "Verified" : "Pending"}
          </div>
          <span className={styles.statCardSub}>Email verification status</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statCardIcon}>🕐</span>
            <span className={styles.statCardLabel}>Last Login</span>
          </div>
          <div className={styles.statCardValue} style={{ fontSize: "1.2rem" }}>
            {formatDate(user?.lastlogin)}
          </div>
          <span className={styles.statCardSub}>Most recent session</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statCardIcon}>📅</span>
            <span className={styles.statCardLabel}>Member Since</span>
          </div>
          <div className={styles.statCardValue} style={{ fontSize: "1.2rem" }}>
            {formatDate(user?.createdAt)}
          </div>
          <span className={styles.statCardSub}>Account creation date</span>
        </div>
      </div>

      {/* Info Cards */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>
            <span>👤</span> Account Details
          </h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Full Name</span>
            <span className={styles.infoValue}>{user?.name || "—"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Email</span>
            <span className={styles.infoValue}>{user?.email || "—"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Verified</span>
            <span className={`badge ${user?.isVerified ? "badge-success" : "badge-warning"}`}>
              {user?.isVerified ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>
            <span>🔒</span> Security
          </h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Authentication</span>
            <span className={`badge badge-success`}>JWT Active</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Cookie</span>
            <span className={`badge badge-success`}>HttpOnly</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Password</span>
            <span className={`badge badge-success`}>BCrypt Hashed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
