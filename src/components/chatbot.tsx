"use client";

import { Button } from "@/components/ui/button"

export default function Chatbot() {
  return (
    <div className="fixed top-4 right-4 w-80 h-96 bg-white border rounded-lg shadow-lg flex flex-col p-6 z-50">
      {/* Header - Top Middle */}
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Chat Assistant</h3>
        <p className="text-sm text-gray-600">Ask me anything!</p>
      </div>
      
      {/* Spacer to push content to bottom */}
      <div className="flex-1"></div>
      
      {/* Input area - Bottom */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="What can I help you with?" 
            className="flex-100 h-12 px-2 py-2 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="h-12 px-6 rounded-full">Send</Button>
        </div>
        
        {/* Button below input */}
        <div className="flex justify-center">
          <Button variant="outline" className="h-12 px-6 rounded-full">
            Make To-Do-List
          </Button>
        </div>
      </div>
    </div>
  );
}