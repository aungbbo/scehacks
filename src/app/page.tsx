import { AppSidebar } from "@/components/AppSideBar" 
import { TodoSection } from "@/components/TodoSection"
import { SidebarInset } from "@/components/ui/sidebar"
import RightSidePanel from "@/components/RightSidePanel"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Main Content */}  
      <SidebarInset className="flex-1 flex flex-col">
        {/* Header with Google Login */}
        <Header />
        
        {/* Main Dashboard */}
        <div className="flex-1 flex">
          {/* Todo Section */}
          <TodoSection />
        </div>
      </SidebarInset>
      
      {/* Right Side Panel - Login button and Chatbot */}
      <RightSidePanel />
    </div>
  )
}
