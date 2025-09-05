"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Chatbot() {

    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        setPosition ({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    }

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
            className="flex-1 h-12 px-2 py-2 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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