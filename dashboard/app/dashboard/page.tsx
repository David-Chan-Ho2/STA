"use client";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <main>
      {isAuthenticated ? (
        <>
          <h1>Hello, {user?.email}</h1>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not authenticated</p>
      )}
    </main>
  );
}

export default Dashboard;
