"use client";

import api from "@/api";
import { Card, CardContent } from "@/components/ui/card";

/**
Latest readings
Recent alerts

Recent Alerts: 1

Latest Readings:
Temperature Avg: 72°F
Humidity Avg: 48%
 */

function Dashboard() {
  const { stats, isLoading, error } = api.devices.stats();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error has occured: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent>
          <p className="text-gray-500">Devices</p>
          <p className="text-3xl font-bold">Total {stats.total}</p>
          <p className="text-3xl font-bold">Online {stats.online}</p>
          <p className="text-3xl font-bold">Offline {stats.offline}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p>Latest Reading</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
