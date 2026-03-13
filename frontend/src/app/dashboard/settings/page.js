"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../dashboard.module.css";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>
          <span>👤</span> Profile Settings
        </h3>
        <div className={styles.settingsCard}>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Display Name</span>
              <span className={styles.settingsRowDesc}>
                {user?.name || "Not set"}
              </span>
            </div>
            <button className="btn btn-secondary btn-sm" disabled>
              Edit
            </button>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Email Address</span>
              <span className={styles.settingsRowDesc}>
                {user?.email || "Not set"}
              </span>
            </div>
            <span className={`badge ${user?.isVerified ? "badge-success" : "badge-warning"}`}>
              {user?.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>
          <span>🔐</span> Security
        </h3>
        <div className={styles.settingsCard}>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Password</span>
              <span className={styles.settingsRowDesc}>
                Change your account password
              </span>
            </div>
            <a href="/forgot-password" className="btn btn-secondary btn-sm">
              Reset
            </a>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Active Sessions</span>
              <span className={styles.settingsRowDesc}>
                JWT token with 7-day expiration
              </span>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>
          <span>⚡</span> Preferences
        </h3>
        <div className={styles.settingsCard}>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Theme</span>
              <span className={styles.settingsRowDesc}>Dark mode is enabled</span>
            </div>
            <span className="badge badge-success">Dark</span>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingsRowInfo}>
              <span className={styles.settingsRowLabel}>Email Notifications</span>
              <span className={styles.settingsRowDesc}>
                Receive updates via Mailtrap
              </span>
            </div>
            <span className="badge badge-success">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
