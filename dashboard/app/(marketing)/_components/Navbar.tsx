"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
import config from '@/config/config.json'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-semibold text-gray-900">
           {config.name}
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#solutions" className="text-gray-600 hover:text-gray-900">
              Solutions
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900">
              Benefits
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
            <Button onClick={() => redirect("/register")}>Get Started</Button>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
