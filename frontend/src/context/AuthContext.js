"use client";

import { createContext, useContext, useState, useCallback } from "react";
import * as api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const handleSignup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.signup(name, email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVerifyEmail = useCallback(async (code) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.verifyEmail(code);
      setUser((prev) => (prev ? { ...prev, isVerified: true } : prev));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleForgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.forgotPassword(email);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    clearError,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    verifyEmail: handleVerifyEmail,
    forgotPassword: handleForgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
