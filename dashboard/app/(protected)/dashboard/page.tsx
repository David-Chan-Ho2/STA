"use client";

import { Badge } from "@/components/ui/badge";
import DeviceStatus from "./_components/DeviceStatus";

const devices = [
  {
    name: "Greenhouse Sensor",
    status: "Online",
    lastSeen: "10 sec ago",
  },
  {
    name: "Kitchen Sensor",
    status: "Warning",
    lastSeen: "2 min ago",
  },
  {
    name: "Office Camera",
    status: "Offline",
    lastSeen: "3 hrs ago",
  },
];

const alerts = [
  { title: "High Temperature", device: "Kitchen Sensor", time: "2 min ago" },
  { title: "Device Offline", device: "Office Camera", time: "3 hrs ago" },
];

export default function DashboardPage() {
  return (
    <main className="p-6">
      <DeviceStatus />

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-semibold">Recent Alerts</h2>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <p className="font-semibold text-red-700">{alert.title}</p>
                <p className="text-sm text-gray-600">{alert.device}</p>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-semibold">Device Status</h2>

          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-gray-500">
                    Last seen: {device.lastSeen}
                  </p>
                </div>

                <StatusBadge status={device.status} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-semibold">Recent Sensor Readings</h2>

        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-gray-400">
          Chart placeholder: temperature / humidity / battery
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status == "Online"
      ? "default"
      : status == "Offline"
        ? "destructive"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}
