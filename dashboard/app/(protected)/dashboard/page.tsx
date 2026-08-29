"use client"

import {
  Bell,
  ChevronDown,
  ChevronUp,
  Circle,
  Droplets,
  Minus,
  Radio,
  Thermometer,
  WifiOff,
  Wind,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────

const energyData = [
  { time: "00:00", hvac: 42, lighting: 12, equipment: 28 },
  { time: "02:00", hvac: 38, lighting: 8, equipment: 24 },
  { time: "04:00", hvac: 35, lighting: 6, equipment: 22 },
  { time: "06:00", hvac: 41, lighting: 14, equipment: 26 },
  { time: "08:00", hvac: 68, lighting: 32, equipment: 48 },
  { time: "10:00", hvac: 84, lighting: 38, equipment: 62 },
  { time: "12:00", hvac: 91, lighting: 40, equipment: 71 },
  { time: "14:00", hvac: 88, lighting: 39, equipment: 68 },
  { time: "16:00", hvac: 79, lighting: 36, equipment: 59 },
  { time: "18:00", hvac: 72, lighting: 28, equipment: 53 },
  { time: "20:00", hvac: 58, lighting: 22, equipment: 41 },
  { time: "22:00", hvac: 49, lighting: 16, equipment: 33 },
  { time: "Now", hvac: 54, lighting: 18, equipment: 36 },
];

const tempData = [
  { time: "00:00", zone_a: 21.2, zone_b: 22.8, zone_c: 20.1, outdoor: 14.3 },
  { time: "04:00", zone_a: 20.8, zone_b: 22.1, zone_c: 19.8, outdoor: 12.7 },
  { time: "08:00", zone_a: 22.4, zone_b: 23.6, zone_c: 21.3, outdoor: 16.2 },
  { time: "12:00", zone_a: 23.9, zone_b: 24.8, zone_c: 22.7, outdoor: 22.4 },
  { time: "16:00", zone_a: 24.1, zone_b: 25.2, zone_c: 23.1, outdoor: 24.1 },
  { time: "20:00", zone_a: 22.6, zone_b: 23.9, zone_c: 21.8, outdoor: 19.8 },
  { time: "Now", zone_a: 21.8, zone_b: 23.2, zone_c: 20.9, outdoor: 17.3 },
];

const devices = [
  {
    id: "SEN-001",
    name: "HVAC Controller A",
    zone: "Zone A / Floor 1",
    type: "HVAC",
    status: "online",
    temp: 21.8,
    humidity: 48,
    lastSeen: "2s ago",
    battery: null,
    signal: 98,
  },
  {
    id: "SEN-002",
    name: "Air Quality Monitor",
    zone: "Zone B / Floor 2",
    type: "AQI",
    status: "online",
    temp: 23.2,
    humidity: 52,
    lastSeen: "5s ago",
    battery: 84,
    signal: 91,
  },
  {
    id: "SEN-003",
    name: "Energy Meter West",
    zone: "Utility / Basement",
    type: "Energy",
    status: "online",
    temp: null,
    humidity: null,
    lastSeen: "1s ago",
    battery: null,
    signal: 100,
  },
  {
    id: "SEN-004",
    name: "Smoke Detector B12",
    zone: "Zone B / Floor 1",
    type: "Safety",
    status: "warning",
    temp: 27.4,
    humidity: 61,
    lastSeen: "12s ago",
    battery: 23,
    signal: 74,
  },
  {
    id: "SEN-005",
    name: "HVAC Controller B",
    zone: "Zone C / Floor 3",
    type: "HVAC",
    status: "online",
    temp: 20.9,
    humidity: 45,
    lastSeen: "3s ago",
    battery: null,
    signal: 95,
  },
  {
    id: "SEN-006",
    name: "Water Leak Sensor",
    zone: "Server Room",
    type: "Safety",
    status: "offline",
    temp: null,
    humidity: null,
    lastSeen: "14m ago",
    battery: 12,
    signal: 0,
  },
  {
    id: "SEN-007",
    name: "CO₂ Sensor D4",
    zone: "Zone A / Floor 2",
    type: "AQI",
    status: "online",
    temp: 22.1,
    humidity: 50,
    lastSeen: "8s ago",
    battery: 71,
    signal: 88,
  },
  {
    id: "SEN-008",
    name: "Smart Lighting Bus",
    zone: "Zone B / Floor 1–3",
    type: "Lighting",
    status: "online",
    temp: null,
    humidity: null,
    lastSeen: "1s ago",
    battery: null,
    signal: 99,
  },
];

const alerts = [
  {
    id: 1,
    severity: "critical",
    message: "SEN-006 offline — Server Room water leak sensor unreachable",
    time: "14m ago",
  },
  {
    id: 2,
    severity: "warning",
    message: "SEN-004 battery critical (23%) — Smoke Detector B12",
    time: "1h ago",
  },
  {
    id: 3,
    severity: "warning",
    message: "Zone B humidity spike 61% — above threshold 58%",
    time: "2h ago",
  },
  {
    id: 4,
    severity: "info",
    message: "Peak demand event ended — energy consumption normalized",
    time: "3h ago",
  },
  {
    id: 5,
    severity: "info",
    message: "Scheduled maintenance window completed — HVAC Controller A",
    time: "5h ago",
  },
];

const kpis = [
  {
    label: "Avg Temp",
    value: "22.0",
    unit: "°C",
    icon: Thermometer,
    trend: 0.3,
    color: "#2563EB",
  },
  {
    label: "Avg Humidity",
    value: "51.2",
    unit: "%",
    icon: Droplets,
    trend: -1.4,
    color: "#007A65",
  },
  {
    label: "Total Power",
    value: "108",
    unit: "kW",
    icon: Zap,
    trend: 4.2,
    color: "#D97706",
  },
  {
    label: "CO₂ Level",
    value: "612",
    unit: "ppm",
    icon: Wind,
    trend: -8,
    color: "#7C3AED",
  },
  {
    label: "Devices Online",
    value: "6",
    unit: "/ 8",
    icon: Radio,
    trend: 0,
    color: "#007A65",
  },
  {
    label: "Active Alerts",
    value: "3",
    unit: "",
    icon: Bell,
    trend: 0,
    color: "#C8203C",
  },
];

// ── Small components ──────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: "#007A65",
    warning: "#D97706",
    offline: "#C8203C",
  };
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: colors[status] ?? "#7A8FA6" }}
    />
  );
}

function TrendBadge({ value }: { value: number }) {
  if (value === 0)
    return (
      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5">
        <Minus size={10} />—
      </span>
    );
  const up = value > 0;
  return (
    <span
      className={`text-[10px] font-mono flex items-center gap-0.5 ${up ? "text-[#FF6B35]" : "text-[#00C9A7]"}`}
    >
      {up ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
      {Math.abs(value)}
    </span>
  );
}

function SeverityPip({ sev }: { sev: string }) {
  const map: Record<string, string> = {
    critical: "#C8203C",
    warning: "#D97706",
    info: "#2563EB",
  };
  return (
    <span
      className="w-1 self-stretch rounded-full flex-shrink-0"
      style={{ backgroundColor: map[sev] ?? "#5A6878" }}
    />
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded px-3 py-2 text-[11px] font-mono shadow-xl">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
          {p.unit ?? ""}
        </p>
      ))}
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const ts = time.toLocaleTimeString("en-GB", { hour12: false });
  const date = time.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden bg-background text-foreground"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 h-10 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-foreground">
            FACILITY MONITOR
          </h1>
          <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-white/5 border border-border">
            BLDG-03 · San Francisco
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Circle size={6} fill="#007A65" className="text-[#007A65]" />
            <span className="text-[10px] font-mono text-muted-foreground">
              LIVE
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {date}
          </span>
          <span className="text-[11px] font-mono text-primary tabular-nums">
            {ts}
          </span>
        </div>
      </header>

      {/* Scrollable body */}
      <div
        className="flex-1 overflow-y-auto p-4 grid gap-3"
        style={{ scrollbarWidth: "none" }}
      >
        {/* KPI row */}
        <div className="grid grid-cols-6 gap-2">
          {kpis.map(({ label, value, unit, icon: Icon, trend, color }) => (
            <div
              key={label}
              className="bg-card border border-border rounded p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                  {label}
                </span>
                <Icon size={12} style={{ color }} />
              </div>
              <div className="flex items-end gap-1">
                <span
                  className="text-2xl font-semibold tabular-nums leading-none"
                  style={{ fontFamily: "'DM Mono', monospace", color }}
                >
                  {value}
                </span>
                <span className="text-xs text-muted-foreground mb-0.5">
                  {unit}
                </span>
              </div>
              <TrendBadge value={trend} />
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-5 gap-3">
          {/* Energy */}
          <div className="col-span-3 bg-card border border-border rounded p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                Energy Consumption — 24h (kW)
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground">
                Today 108 kWh total
              </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={energyData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="energy-hvac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="energy-lighting"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="energy-equipment"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#007A65" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#007A65" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="rgba(0,0,0,0.06)"
                />
                <XAxis
                  dataKey="time"
                  tick={{
                    fontSize: 9,
                    fill: "#7A8FA6",
                    fontFamily: "DM Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fontSize: 9,
                    fill: "#7A8FA6",
                    fontFamily: "DM Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hvac"
                  name="HVAC"
                  stroke="#2563EB"
                  fill="url(#energy-hvac)"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="lighting"
                  name="Lighting"
                  stroke="#D97706"
                  fill="url(#energy-lighting)"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="equipment"
                  name="Equipment"
                  stroke="#007A65"
                  fill="url(#energy-equipment)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[
                { label: "HVAC", color: "#2563EB", val: "54 kW" },
                { label: "Lighting", color: "#D97706", val: "18 kW" },
                { label: "Equipment", color: "#007A65", val: "36 kW" },
              ].map(({ label, color, val }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-0.5 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Temperature zones */}
          <div className="col-span-2 bg-card border border-border rounded p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                Temperature — Zones (°C)
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={tempData}
                margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="rgba(0,0,0,0.06)"
                />
                <XAxis
                  dataKey="time"
                  tick={{
                    fontSize: 9,
                    fill: "#7A8FA6",
                    fontFamily: "DM Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[10, 28]}
                  tick={{
                    fontSize: 9,
                    fill: "#7A8FA6",
                    fontFamily: "DM Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="zone_a"
                  name="Zone A"
                  stroke="#007A65"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="zone_b"
                  name="Zone B"
                  stroke="#2563EB"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="zone_c"
                  name="Zone C"
                  stroke="#7C3AED"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="outdoor"
                  name="Outdoor"
                  stroke="#94A3B8"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-3 mt-2 flex-wrap">
              {[
                { label: "Zone A", color: "#007A65", val: "21.8°" },
                { label: "Zone B", color: "#2563EB", val: "23.2°" },
                { label: "Zone C", color: "#7C3AED", val: "20.9°" },
                { label: "Outdoor", color: "#94A3B8", val: "17.3°" },
              ].map(({ label, color, val }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-0.5 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower row */}
        <div className="grid grid-cols-5 gap-3">
          {/* Device table */}
          <div className="col-span-3 bg-card border border-border rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                Device Registry
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground">
                8 nodes · 6 online · 1 warning · 1 offline
              </span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "ID",
                    "Name",
                    "Zone",
                    "Type",
                    "Status",
                    "Temp",
                    "Humidity",
                    "Signal",
                    "Last Seen",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-1.5 font-medium tracking-wider text-muted-foreground text-[10px] uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr
                    key={d.id}
                    className={`border-b border-border/50 transition-colors hover:bg-black/[0.02] ${d.status === "offline" ? "opacity-50" : ""}`}
                  >
                    <td className="px-3 py-2 font-mono text-muted-foreground">
                      {d.id}
                    </td>
                    <td className="px-3 py-2 text-foreground font-medium">
                      {d.name}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground text-[10px]">
                      {d.zone}
                    </td>
                    <td className="px-3 py-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {d.type}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-1.5">
                        <StatusDot status={d.status} />
                        <span
                          className={`font-mono text-[10px] capitalize ${d.status === "online" ? "text-[#007A65]" : d.status === "warning" ? "text-[#D97706]" : "text-[#C8203C]"}`}
                        >
                          {d.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono text-[10px] tabular-nums text-foreground">
                      {d.temp != null ? `${d.temp}°C` : "—"}
                    </td>
                    <td className="px-3 py-2 font-mono text-[10px] tabular-nums text-foreground">
                      {d.humidity != null ? `${d.humidity}%` : "—"}
                    </td>
                    <td className="px-3 py-2">
                      {d.status === "offline" ? (
                        <WifiOff size={10} className="text-destructive" />
                      ) : (
                        <span
                          className="font-mono text-[10px]"
                          style={{
                            color:
                              d.signal > 90
                                ? "#007A65"
                                : d.signal > 70
                                  ? "#D97706"
                                  : "#C8203C",
                          }}
                        >
                          {d.signal}%
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 font-mono text-[10px] text-muted-foreground">
                      {d.lastSeen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts + zone bars */}
          <div className="col-span-2 flex flex-col gap-3">
            {/* Alerts */}
            <div className="bg-card border border-border rounded flex-1 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Event Log
                </h2>
                <span className="text-[10px] font-mono text-[#C8203C]">
                  2 active
                </span>
              </div>
              <div className="flex flex-col divide-y divide-border/50">
                {alerts.map((a) => (
                  <div
                    key={a.id}
                    className="flex gap-2 px-3 py-2.5 hover:bg-black/[0.02] transition-colors"
                  >
                    <SeverityPip sev={a.severity} />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="text-[11px] text-foreground leading-snug">
                        {a.message}
                      </p>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {a.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone load bars */}
            <div className="bg-card border border-border rounded p-3">
              <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                Zone Load
              </h2>
              <div className="flex flex-col gap-2.5">
                {[
                  { zone: "Zone A — Floor 1–2", load: 68, color: "#007A65" },
                  { zone: "Zone B — Floor 1–3", load: 82, color: "#2563EB" },
                  { zone: "Zone C — Floor 3", load: 44, color: "#7C3AED" },
                  { zone: "Server Room", load: 91, color: "#C8203C" },
                ].map(({ zone, load, color }) => (
                  <div key={zone}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">
                        {zone}
                      </span>
                      <span
                        className="text-[10px] font-mono tabular-nums"
                        style={{ color }}
                      >
                        {load}%
                      </span>
                    </div>
                    <div className="h-1 bg-black/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${load}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
