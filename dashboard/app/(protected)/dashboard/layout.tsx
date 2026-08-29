import AppSidebar from "@/app/(protected)/dashboard/_components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/context/ThemeContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
