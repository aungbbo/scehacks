'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 ${className}`}>
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Sidebar trigger and title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>

        {/* Right side - Empty space (login button moved to fixed position) */}
        <div className="flex items-center gap-4">
          {/* Login button now positioned fixed on the right */}
        </div>
      </div>
    </header>
  );
}
