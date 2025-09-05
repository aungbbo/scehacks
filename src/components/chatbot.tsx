"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { api, EmailWithTasks } from "@/lib/api"

interface ChatbotProps {
  onTasksGenerated?: (tasks: EmailWithTasks[]) => void
}

export default function Chatbot({ onTasksGenerated }: ChatbotProps) {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSearch = async () => {
        if (!message.trim()) return
        
        setLoading(true)
        setError("")
        
        try {
            console.log('Searching for:', message)
            const tasks = await api.searchTasks(message)
            console.log('Tasks received in chatbot:', tasks)
            onTasksGenerated?.(tasks)
            setMessage("") // Clear input after success
        } catch (err) {
            setError("Failed to search Gmail. Please try again.")
            console.error("Error searching tasks:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

  return (
    <div className="w-80 h-[450px] bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl shadow-lg flex flex-col p-5 z-50 hover:shadow-xl transition-all duration-300">
      {/* Header - Top Middle */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Gmail Task Search</h3>
        <p className="text-sm text-gray-500 text-center">Find tasks in your emails</p>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}
      
      {/* Spacer to push content to bottom */}
      <div className="flex-1"></div>
      
      {/* Input area - Bottom */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for tasks..." 
            className="flex-1 h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80"
            disabled={loading}
          />
          <Button 
            onClick={handleSearch}
            disabled={loading || !message.trim()}
            className="h-10 px-4 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "..." : "Search"}
          </Button>
        </div>
        
        {/* Quick search buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("assignment")}
            className="text-xs px-3 py-1.5 rounded-md hover:bg-blue-50 hover:border-blue-300 border-gray-200"
            disabled={loading}
          >
            📝 Assignment
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("deadline")}
            className="text-xs px-3 py-1.5 rounded-md hover:bg-blue-50 hover:border-blue-300 border-gray-200"
            disabled={loading}
          >
            ⏰ Deadline
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("meeting")}
            className="text-xs px-3 py-1.5 rounded-md hover:bg-blue-50 hover:border-blue-300 border-gray-200"
            disabled={loading}
          >
            🤝 Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}