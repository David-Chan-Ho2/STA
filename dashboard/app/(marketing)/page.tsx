"use client";

import Footer from "@/app/_components/Footer";
import HeroSection from "@/app/_components/HeroSection";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Real-Time Data",
      body: "Stream live sensor readings from your devices.",
    },
    {
      title: "Device Management",
      body: "Configure and monitor all your devices in one place.",
    },
    {
      title: "Secure Access",
      body: "Role-based authentication keeps your data safe.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <HeroSection>
        <h1 className="text-5xl font-bold tracking-tight drop-shadow-md">
          Smart Building Monitoring
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
          Monitor your HVAC systems and sensor data in real time. Stay informed,
          stay in control.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/login"
            className="rounded-md border border-white/60 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </HeroSection>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 py-24 max-w-4xl mx-auto w-full">
        {features.map(({ title, body }) => (
          <div
            key={title}
            className="rounded-lg border p-6 flex flex-col gap-2"
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
