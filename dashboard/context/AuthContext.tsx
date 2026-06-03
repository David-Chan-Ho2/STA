"use client";

import api from "@/api";
import { IToken, IUser } from "@/types/auth.types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: IUser | null;
  token: IToken | null;
  isAuthenticated: boolean;
  login: (tokenData: IToken) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<IToken | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (!savedToken) return
    setToken({ access_token: savedToken, token_type: "bearer" })
    api.getMe().then(setUser).catch(() => {
      localStorage.removeItem("token")
    })
  }, []);

  const login = async (tokenData: IToken) => {
    localStorage.setItem("token", tokenData.access_token)
    setToken(tokenData)
    const userData = await api.getMe()
    setUser(userData)
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
