'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 ${className}`}>
      <div className="flex h-19 items-center justify-between px-6">
        {/* Left side - Sidebar trigger and title */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900">InboxIQ Dashboard</h1>
            <p className="text-sm text-gray-500">AI-powered Gmail task management</p>
          </div>
        </div>

        {/* Right side - Google Login Button */}
        {/* <div className="flex items-center gap-4">
          <GoogleLoginButton className="shadow-md hover:shadow-lg transition-shadow" />
        </div> */}
      </div>
    </header>
  );
}
