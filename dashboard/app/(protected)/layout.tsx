"use client";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <section>{children}</section>;
}
