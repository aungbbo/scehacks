'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import GoogleLoginButton from './GoogleLoginButton';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-card dark:supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50 ${className}`}>
      <div className="flex h-19 items-center justify-between px-4">
        {/* Left side - Sidebar trigger and title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-primary">Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-primary/80">Welcome back!</p>
          </div>
        </div>

        {/* Right side - Google login button */}
        {/* <div className="flex items-center gap-4">
          <GoogleLoginButton />
        </div> */}
      </div>
    </header>
  );
}
