"use client";

import api from "@/api";
import { ILogin, IRegister, IToken, IUser } from "@/types/auth.types";
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
  register: (form: IRegister) => Promise<void>;
  login: (form: ILogin) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<IToken | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;
    setToken({ access_token: savedToken, token_type: "bearer" });
    api.auth
      .getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  const register = async (form: IRegister) => {
    await api.auth.email.register(form);
  };

  const login = async (form: ILogin) => {
    const token = await api.auth.email.login(form);
    localStorage.setItem("token", token.access_token);
    setToken(token);
    const userData = await api.auth.getMe();
    setUser(userData);
  };

  const logout = () => {
    api.auth.logout();
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
        register,
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
