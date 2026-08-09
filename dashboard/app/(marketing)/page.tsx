import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import config from "@/config/config.json";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Cloud,
  Mail,
  Phone,
  Settings,
  Shield,
  Zap,
} from "lucide-react";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import Navbar from "./_components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced IoT HVAC Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent systems provide comprehensive climate control
              monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cloud Connectivity
                </h3>
                <p className="text-gray-600">
                  Access and control your HVAC systems from anywhere with secure
                  cloud-based management and real-time data synchronization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Real-Time Monitoring
                </h3>
                <p className="text-gray-600">
                  Track temperature, humidity, and system performance across all
                  zones with live sensor data and instant alerts when readings
                  fall outside your defined thresholds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Energy Optimization
                </h3>
                <p className="text-gray-600">
                  Reduce energy consumption by up to 30% with AI-powered
                  automation that adapts to occupancy and weather patterns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-gray-600">
                  Make data-driven decisions with comprehensive reports on
                  system performance, efficiency trends, and maintenance needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Predictive Maintenance
                </h3>
                <p className="text-gray-600">
                  Prevent costly breakdowns with intelligent alerts that predict
                  maintenance needs before problems occur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Automation
                </h3>
                <p className="text-gray-600">
                  Set custom schedules, zones, and rules that automatically
                  adjust climate settings for optimal comfort and efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Solutions
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tailored for Every Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From commercial office buildings to industrial facilities, our
              platform scales to meet the unique demands of any environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1583009640887-eafd1a994d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMHZlbnRpbGF0aW9ufGVufDF8fHx8MTc4MTU4NDgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Commercial Buildings"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Commercial Buildings
                </h3>
                <p className="text-gray-600 mb-4">
                  Optimize climate control across multi-floor office buildings,
                  retail spaces, and hospitality venues with centralized zone
                  management.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-zone temperature and humidity scheduling</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Automated alerts for equipment malfunctions</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Energy usage reports for compliance and cost reduction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRoZXJtb3N0YXQlMjBjb250cm9sfGVufDF8fHx8MTc4MTU4NDgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Industrial Facilities"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Residential & Multi-Family
                </h3>
                <p className="text-gray-600 mb-4">
                  Give homeowners and property managers smart control over
                  individual units, with remote access and automated comfort
                  scheduling.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Per-unit thermostat management and scheduling</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tenant-facing mobile access for self-service control</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Usage insights to reduce utility costs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose {config.name}?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of building managers who trust STA Engineering to
              keep their systems running efficiently, reliably, and
              cost-effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Rapid Deployment
              </h3>
              <p className="text-blue-100">
                Get up and running in days, not months. Our plug-and-play
                sensors and guided onboarding make setup fast and simple.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-blue-100">
                Your data is protected with end-to-end encryption, role-based
                access controls, and SOC 2-compliant infrastructure.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Proven Reliability
              </h3>
              <p className="text-blue-100">
                Our platform maintains 99.9% uptime with redundant cloud
                infrastructure and continuous health monitoring of every device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your HVAC System?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started with a free consultation and discover how IoT technology
            can optimize your building's climate control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Schedule Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Download Brochure
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-600 mb-1">Call Us</div>
                  <div className="font-semibold text-gray-900">
                    {config.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-600 mb-1">Email Us</div>
                  <div className="font-semibold text-gray-900">
                    {config.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
