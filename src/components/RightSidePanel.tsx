'use client';

import GoogleLoginButton from './GoogleLoginButton';
import Chatbot from './chatbot';
import { EmailWithTasks } from '@/lib/api';

interface RightSidePanelProps {
  onTasksGenerated?: (tasks: EmailWithTasks[]) => void
}

export default function RightSidePanel({ onTasksGenerated }: RightSidePanelProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-4">
      {/* Google Login Button at the top */}
      <div className="flex justify-end">
        <GoogleLoginButton className="shadow-md hover:shadow-lg transition-shadow" />
      </div>
      
      {/* Chatbot below the login button */}
      <Chatbot onTasksGenerated={onTasksGenerated} />
    </div>
  );
}
