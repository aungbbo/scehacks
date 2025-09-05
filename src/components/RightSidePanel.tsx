'use client';

import GoogleLoginButton from './GoogleLoginButton';
import Chatbot from './chatbot';

export default function RightSidePanel() {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-4">
      {/* Google Login Button at the top */}
      <div className="flex justify-end">
        <GoogleLoginButton />
      </div>
      
      {/* Chatbot below the login button */}
      <div className="w-165 h-220 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.74-.35-3.9-.99L3 20l.99-5.1C3.35 13.74 3 12.4 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Chat Assistant</h3>
              <p className="text-xs text-white/70">Online • Ready to help</p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div className="flex-1 p-4 bg-gray-50">
          <div className="flex flex-col gap-3">
            {/* Welcome message */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.74-.35-3.9-.99L3 20l.99-5.1C3.35 13.74 3 12.4 3 11c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
                </svg>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-[500px]">
                <p className="text-base text-gray-800">Hi! I'm here to help you with anything you need. Ask me a question or let me help you organize your tasks!</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-100 space-y-3">
          {/* Input with integrated send button */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full h-11 pl-4 pr-12 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center group">
              <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          {/* Quick action button */}
          <div className="flex justify-center">
            <button className="h-9 px-4 text-xs bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create To-Do List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
