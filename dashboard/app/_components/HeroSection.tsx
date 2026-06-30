import { ReactNode } from "react";

interface HeroSectionProps {
  children?: ReactNode;
}

function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[560px] flex items-center justify-center overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1615309662243-70f6df917b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBodmFjJTIwc3lzdGVtJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzgxNTg0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Modern HVAC system"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export default HeroSection;
