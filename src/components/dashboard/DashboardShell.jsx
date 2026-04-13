import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell({ children }) {
  return (
    <SidebarProvider >
      <DashboardSidebar/>

      <SidebarInset className="min-h-svh bg-app-bg">
        {/* TOPBAR */}
        <header className="flex items-center h-[4rem] gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
          <SidebarTrigger />
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}