import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              IoT HVAC Solutions
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Smart HVAC Control for Modern Buildings
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your building's climate control with intelligent IoT sensors and real-time analytics. Our platform connects your HVAC systems to the cloud, giving you full visibility and control — reducing energy costs and improving occupant comfort.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">30%</div>
                <div className="text-sm text-gray-600">Energy Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl opacity-50 blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1615309662243-70f6df917b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBodmFjJTIwc3lzdGVtJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzgxNTg0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern HVAC System"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
