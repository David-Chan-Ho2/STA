import api from "@/api";
import StatCard from "./StatsCard";

function DeviceStatus() {
  const { stats, isLoading, error } = api.devices.stats();

  if (!stats && isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard title="Online Devices" value={stats!.online} />
      <StatCard title="Offline Devices" value={stats!.offline} />
      <StatCard title="Active Alerts" value={4} />
      <StatCard title="Total Devices" value={stats!.total} />
    </section>
  );
}

export default DeviceStatus;
