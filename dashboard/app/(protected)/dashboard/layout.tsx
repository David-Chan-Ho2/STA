import AppSidebar from "@/app/(protected)/dashboard/_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        <main className="w-full p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
