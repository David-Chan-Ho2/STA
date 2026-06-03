"use client";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  return (
    <main>
      {isAuthenticated ? (
        <>
          <h1>Hello, {user?.email}</h1>
        </>
      ) : (
        <p>Not authenticated</p>
      )}
    </main>
  );
}

export default Dashboard;
