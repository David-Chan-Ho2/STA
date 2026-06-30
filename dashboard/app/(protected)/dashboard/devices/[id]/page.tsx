"use client";

import api from "@/api";
import ReadingsChart from "@/app/(protected)/dashboard/devices/[id]/_components/ReadingsChart";
import Link from "next/link";
import { useParams } from "next/navigation";

function DevicePage() {
  const params = useParams();

  const { device, error, isLoading } = api.devices.get(String(params!.id));

  if (error) return <div>failed to load</div>;
  if (isLoading || !device) return <div>loading...</div>;

  const readingsByType = (device.readings ?? []).reduce<
    Record<string, typeof device.readings>
  >((acc, r) => {
    const key = r.sensor_type_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Link
        href="/dashboard/devices"
        className="font-medium text-primary hover:underline"
      >
        Go Back to Devices
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">{device.name}</h1>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${device.status === "online" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
        >
          {device.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm border rounded-lg p-4">
        <div>
          <p className="text-muted-foreground">Location</p>
          <p className="font-medium">{device.location}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Serial Number</p>
          <p className="font-medium font-mono">{device.serial_number}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Created</p>
          <p className="font-medium">
            {device.created_at
              ? new Date(device.created_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.values(readingsByType).map((group) => (
          <ReadingsChart
            key={group[0].sensor_type_id}
            readings={group}
            title={`${group[0].type.name} (${group[0].type.unit})`}
          />
        ))}
      </div>
    </div>
  );
}

export default DevicePage;
