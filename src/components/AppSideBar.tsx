import { 
  Home, 
  Mail, 
  Bot, 
  History, 
  Settings, 
  CheckSquare,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items for AI Gmail Tool
const mainItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    active: true,
  },
  {
    title: "Email Scan",
    url: "#",
    icon: Mail,
    active: false,
  },
  {
    title: "Tasks",
    url: "#",
    icon: CheckSquare,
    active: false,
  },
  {
    title: "AI Chat",
    url: "#",
    icon: Bot,
    active: false,
  },
]

const secondaryItems = [
  {
    title: "History",
    url: "#",
    icon: History,
    active: false,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
    active: false,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    active: false,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <div className="sidebar-collapsed:hidden">
              <h1 className="text-lg font-semibold text-gray-900">InboxIQ</h1>
              <p className="text-xs text-gray-500">Task Management</p>
            </div>
          </div>
          {/* <SidebarTrigger className="sidebar-collapsed:hidden">
            <ChevronLeft className="h-4 w-4" />
          </SidebarTrigger> */}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-collapsed:hidden">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.active} tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="sidebar-collapsed:hidden">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-collapsed:hidden">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.active} tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="sidebar-collapsed:hidden">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Info */}
      <SidebarFooter className="border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 sidebar-collapsed:hidden">
            <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}