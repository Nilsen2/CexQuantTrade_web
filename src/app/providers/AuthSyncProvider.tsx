"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthSyncProvider() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        uid: session.user.uid,
        pid: session.user.pid,
        userName: session.user.userName,
        nickName: session.user.nickName,
        email: session.user.email,
        phone: session.user.phone,
        balance: session.user.balance,
        freezeBalance: session.user.freezeBalance,
      });
      setToken(session?.token)
    } else if (status === "unauthenticated") {
      logout();
    }
  }, [session, status, setUser, setToken, logout]);

  return null;
}
