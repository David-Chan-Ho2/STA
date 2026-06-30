"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/api";
import { useAuth } from "@/context/AuthContext";

function ClaimPage() {
  const params = useParams<{ claim: string }>();
  const { user, isAuthenticated } = useAuth();
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.org_id || claimed) return;
    api.devices
      .claim(params.claim, user.org_id)
      .then(() => setClaimed(true))
      .catch(() => setError("Failed to claim device."));
  }, [isAuthenticated, user]);

  if (!isAuthenticated) return <p>Please login to claim this device.</p>;
  if (!user?.org_id) return <p>You must belong to an organization to claim a device.</p>;
  if (error) return <p>{error}</p>;
  if (claimed) return <p>Device claimed successfully!</p>;
  return <p>Claiming device...</p>;
}

export default ClaimPage;
