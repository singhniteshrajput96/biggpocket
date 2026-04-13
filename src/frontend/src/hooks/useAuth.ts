import { useCallback, useEffect, useState } from "react";
import { clearSession, getSession, isAdmin, isLoggedIn } from "../lib/auth";
import type { Session } from "../types";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(() => getSession());

  useEffect(() => {
    setSession(getSession());
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    window.location.hash = "#/login";
  }, []);

  const refreshSession = useCallback(() => {
    setSession(getSession());
  }, []);

  return {
    session,
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin(),
    logout,
    refreshSession,
  };
}
