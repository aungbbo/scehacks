"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Filter, 
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  ExternalLink
} from "lucide-react"
import { EmailWithTasks, Task } from "@/lib/api"

// Mock data before API integration
const mockTasks = [
  {
    id: 1,
    taskTitle: "Task Title",
    email: "email@email.com",
    priority: "high",
    dueDate: "Date (if applicable)",
    completed: false,
    emailLink: "Link to email" // we fetch the email link from the backend and we have text called open email for this and the when you cliick on iit it wll redirect you 
  },
  {
    id: 2,
    taskTitle: "Update project timeline",
    email: "project.manager@company.com",
    priority: "medium",
    dueDate: "May 2, 2025",
    completed: false,
    emailLink: "https://mail.google.com/mail/u/1/#inbox/FMfcgzQcpdlBxvChMJlCbGnmchGrptTm"
  },
  {
    id: 3,
    taskTitle: "Prepare client presentation",
    email: "sales@company.com",
    priority: "high",
    dueDate: "May 22, 2025",
    completed: true,
    emailLink: "https://mail.google.com/mail/u/1/#inbox/FMfcgzQcpdlBxvChMJlCbGnmchGrptTm"
  },
  {
    id: 4,
    taskTitle: "Submit expense reports",
    email: "hr@company.com",
    priority: "low",
    dueDate: "May 25, 2025",
    completed: false,
    emailLink: "https://mail.google.com/mail/u/1/#inbox/FMfcgzQcpdlBxvChMJlCbGnmchGrptTm"
  }
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
}

interface TodoSectionProps {
  generatedTasks?: EmailWithTasks[]
}

export function TodoSection({ generatedTasks }: TodoSectionProps) {
  // Example task to show the interface
  const exampleTask = {
    id: "example-1",
    taskTitle: "Review project proposal",
    email: "manager@company.com",
    priority: "high",
    dueDate: "Today",
    completed: false,
    emailLink: "https://mail.google.com/mail/u/0/#inbox/example123"
  }

  const [tasks, setTasks] = React.useState([exampleTask]) // Start with example task
  const [filter, setFilter] = React.useState("all")

  // Convert generated tasks to display format
  React.useEffect(() => {
    console.log('Generated tasks received:', generatedTasks)
    
    if (generatedTasks && Array.isArray(generatedTasks)) {
      const newTasks = generatedTasks.flatMap((email, emailIndex) => 
        email.tasks.map((task, taskIndex) => ({
          id: `generated-${emailIndex}-${taskIndex}`,
          taskTitle: task.task,
          email: task.sender,
          priority: "medium", // Default priority
          dueDate: task.due_date || "No due date",
          completed: false,
          emailLink: task.email_link
        }))
      )
      console.log('New tasks created:', newTasks)
      setTasks(prev => [...prev, ...newTasks])
    } else if (generatedTasks) {
      console.log('Generated tasks is not an array:', typeof generatedTasks, generatedTasks)
    }
  }, [generatedTasks])

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const clearTasks = () => {
    setTasks([])
  }

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600">
            {tasks.length === 0 
              ? "Search Gmail to find tasks" 
              : tasks.length === 1 && tasks[0].id === "example-1"
              ? "Example task - search Gmail to find real tasks"
              : `${tasks.length} task${tasks.length === 1 ? '' : 's'} found`
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {tasks.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearTasks}>
              Clear All
            </Button>
          )}
          <Button size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Tabs - Fixed */}
      <div className="flex space-x-1 mb-6 flex-shrink-0">
        {[
          { key: "all", label: "All Tasks", count: tasks.length },
          { key: "pending", label: "Pending", count: tasks.filter(t => !t.completed).length },
          { key: "completed", label: "Completed", count: tasks.filter(t => t.completed).length }
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(key)}
            className="relative"
          >
            {label}
            <Badge variant="secondary" className="ml-2">
              {count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Task List - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`transition-all hover:shadow-md ${task.completed ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTask(task.id)}
                  className="p-0 h-auto"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.taskTitle}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">From: {task.email}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-5 text-xs flex items-center hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors mt-1"
                        onClick={() => window.open(task.emailLink, '_blank')}
                      >
                        <ExternalLink className="h-2.5 w-2.5" />
                        Email Link
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge 
                        variant="outline" 
                        className={priorityColors[task.priority as keyof typeof priorityColors]}
                      >
                        {task.priority}
                      </Badge>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.dueDate}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                {filter === "completed" 
                  ? "No completed tasks yet." 
                  : filter === "pending"
                  ? "No pending tasks. Great job!"
                  : "Use the AI search to find tasks from your Gmail!"
                }
              </p>
              {filter === "all" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-800 font-medium mb-2">💡 How to get started:</p>
                  <ul className="text-xs text-blue-700 text-left space-y-1">
                    <li>• Type "assignment" in the search box</li>
                    <li>• Try "deadline" or "meeting"</li>
                    <li>• Click the quick search buttons</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  )
}
