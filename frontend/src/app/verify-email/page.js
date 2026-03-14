"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "../signup/page.module.css";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);
  const { verifyEmail, loading, error, clearError } = useAuth();
  const router = useRouter();
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;

    try {
      await verifyEmail(fullCode);
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch {
      // error handled by context
    }
  };

  if (success) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authBg}>
          <div className={styles.authOrb}></div>
        </div>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✅</span>
              <p className={styles.successText}>Email Verified Successfully!</p>
              <p className={styles.successSub}>
                Redirecting to your dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authBg}>
        <div className={styles.authOrb}></div>
      </div>

      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <div className={styles.authIcon}>✉️</div>
            <h1 className={styles.authTitle}>Verify Your Email</h1>
            <p className={styles.authSubtitle}>
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.codeInputGroup}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={styles.codeInput}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${styles.authBtn}`}
              disabled={loading || code.join("").length !== 6}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
