"use client";
import { useState } from "react"
import { AppSidebar } from "@/components/AppSideBar" 
import { TodoSection } from "@/components/TodoSection"
import { SidebarInset } from "@/components/ui/sidebar"
import RightSidePanel from "@/components/RightSidePanel"
import Header from "@/components/Header"
import { EmailWithTasks } from "@/lib/api"

export default function Home() {
  const [generatedTasks, setGeneratedTasks] = useState<EmailWithTasks[]>([])

  const handleTasksGenerated = (tasks: EmailWithTasks[]) => {
    setGeneratedTasks(tasks)
  }

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
          <TodoSection generatedTasks={generatedTasks} />
        </div>
      </SidebarInset>
      
      {/* Right Side Panel - Login button and Chatbot */}
      <RightSidePanel onTasksGenerated={handleTasksGenerated} />
    </div>
  )
}
