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
    <div className="w-80 h-96 bg-white border-2 border-blue-200 rounded-xl shadow-xl flex flex-col p-6 z-50 hover:shadow-2xl transition-all duration-300">
      {/* Header - Top Middle */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Gmail Task Search</h3>
        <p className="text-sm text-gray-600 text-center">Search your emails for tasks!</p>
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
            placeholder="Search for tasks (e.g., 'assignment', 'deadline')" 
            className="flex-1 h-12 px-2 py-2 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <Button 
            onClick={handleSearch}
            disabled={loading || !message.trim()}
            className="h-12 px-6 rounded-full"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        
        {/* Quick search buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("assignment")}
            className="text-xs"
            disabled={loading}
          >
            Assignment
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("deadline")}
            className="text-xs"
            disabled={loading}
          >
            Deadline
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("meeting")}
            className="text-xs"
            disabled={loading}
          >
            Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}