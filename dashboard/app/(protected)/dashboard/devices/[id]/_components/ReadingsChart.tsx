"use client";
import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ISensorReading from "@/types/sensor_reading";

interface IChart {
  readings: ISensorReading[];
  title?: string;
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
};

export default function ReadingsChart({ readings, title }: IChart) {
  const formatted = readings.map((r) => ({
    time: new Date(r.time).toLocaleTimeString(),
    value: r.value,
  }));

  return (
    <div className="w-full">
      {title && <h3 className="mb-2 font-semibold">{title}</h3>}
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart data={formatted}>
        <XAxis dataKey="time" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="value" stroke="#2563eb" dot={true} />
      </LineChart>
    </ChartContainer>
    </div>
  );
}
