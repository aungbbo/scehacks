import { AppSidebar } from "@/components/AppSideBar" 
import { TodoSection } from "@/components/TodoSection"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Main Content */}  
      <SidebarInset className="flex-1 flex flex-col">
        {/* Top Navigation with Sidebar Toggle */}
        
        {/* Main Dashboard */}
        <div className="flex-1 flex">
          {/* Todo Section */}
          <TodoSection />
        </div>
      </SidebarInset>
    </div>
  )
}
