"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Cloud,
  Command,
  Frame,
  KeySquare,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { useSession } from "next-auth/react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./themes/thmeToggle"
import { Skeleton } from "@/components/ui/skeleton"

// Define types for better type safety
interface NavItem {
  title: string
  url: string
  icon?: React.ComponentType<any>
  isActive?: boolean
  items?: { title: string; url: string }[]
}

interface Project {
  name: string
  url: string
  icon: React.ComponentType<any>
}

interface User {
  name: string
  email: string
  avatar: string
}

interface SidebarData {
  user: User
  navMain: NavItem[]
  navSecondary: NavItem[]
  projects: Project[]
}

// Separate the navigation data
const DEFAULT_NAV_DATA: SidebarData = {
  user: {
    name: "Guest User",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "/playground/history" },
        { title: "Starred", url: "/playground/starred" },
        { title: "Settings", url: "/playground/settings" },
      ],
    },
    {
      title: "API",
      url: "/api",
      icon: Cloud,
      items: [
        { title: "Genesis", url: "/api/genesis" },
        { title: "Explorer", url: "/api/explorer" },
        { title: "Quantum", url: "/api/quantum" },
      ],
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "/documentation" },
        //  { title: "Get Started", url: "/docs/getting-started" },
        //  { title: "Tutorials", url: "/docs/tutorials" },
        //  { title: "Changelog", url: "/docs/changelog" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "General", url: "/settings/general" },
        { title: "Team", url: "/settings/team" },
        { title: "Billing", url: "/settings/billing" },
        { title: "Limits", url: "/settings/limits" },
      ],
    },
  ],
  navSecondary: [
    { title: "Support", url: "/support", icon: LifeBuoy },
    { title: "Feedback", url: "/feedback", icon: Send },
  ],
  projects: [
    { name: "Design Engineering", url: "/projects/design", icon: KeySquare },
    { name: "Sales & Marketing", url: "/projects/sales", icon: KeySquare },
    { name: "Travel", url: "/projects/travel", icon: KeySquare },
  ],
}

// Loading skeleton component
const SidebarSkeleton = () => (
  <div className="w-64 p-4 space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  </div>
)

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = React.useState(false)

  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading skeleton while session is loading
  if (status === "loading" || !mounted) {
    return <SidebarSkeleton />
  }

  // Prepare data with session information
  const data: SidebarData = {
    ...DEFAULT_NAV_DATA,
    user: {
      name: session?.user?.name ?? DEFAULT_NAV_DATA.user.name,
      email: session?.user?.email ?? DEFAULT_NAV_DATA.user.email,
      avatar: session?.user?.image ?? DEFAULT_NAV_DATA.user.avatar,
    },
  }

  console.log({
    imageUrl: session?.user?.image,
    imageType: typeof session?.user?.image,
    sessionUser: session?.user
  });

  return (
    <Sidebar variant="inset" className={className} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                {mounted && <ModeToggle />}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}