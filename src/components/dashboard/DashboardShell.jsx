import {
  BadgeCheck,
  Bell,
  CreditCard,
  FileText,
  Home,
  LifeBuoy,
  Search,
  Settings,
  Sparkles,
  UserCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const primaryItems = [
  { title: "Overview", icon: Home, active: true },
  { title: "Profile", icon: UserCircle },
  { title: "Resume", icon: FileText },
  { title: "Billing", icon: CreditCard },
];

const secondaryItems = [
  { title: "Notifications", icon: Bell },
  { title: "Settings", icon: Settings },
  { title: "Support", icon: LifeBuoy },
];

function DashboardSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">ProfilePro</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Creator workspace
            </p>
          </div>
        </div>
        <SidebarInput placeholder="Search dashboard..." />
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-3 text-sidebar-accent-foreground">
          <BadgeCheck className="size-5 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Pro Plan</p>
            <p className="truncate text-xs opacity-80">
              All premium profile tools enabled
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardShell() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-h-svh bg-app-bg">
        <header className="flex items-center gap-3 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-6">
          <SidebarTrigger />
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>
            <h1 className="text-xl font-semibold text-foreground">Welcome back</h1>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Profile score</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">86%</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Views this week</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">1,284</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Pending actions</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">4</p>
            </div>
          </section>

          <section className="mt-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Next step</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Complete your public profile to unlock more visibility
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Add your strongest projects, update your headline, and publish your
              availability so recruiters and clients can discover you faster.
            </p>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
