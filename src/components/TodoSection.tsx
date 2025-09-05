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
  MoreHorizontal
} from "lucide-react"

// Mock data before API integration
const mockTasks = [
  {
    id: 1,
    title: "Subject Line",
    description: "From: email@email.com",
    priority: "high",
    dueDate: "Date (if applicable)",
    completed: false,
    emailSubject: "Link to email"
  },
  {
    id: 2,
    title: "Update project timeline",
    description: "From: project.manager@company.com",
    priority: "medium",
    dueDate: "2024-01-20",
    completed: false,
    emailSubject: "Project Timeline Update"
  },
  {
    id: 3,
    title: "Prepare client presentation",
    description: "From: sales@company.com",
    priority: "high",
    dueDate: "2024-01-12",
    completed: true,
    emailSubject: "Client Meeting Next Week"
  },
  {
    id: 4,
    title: "Submit expense reports",
    description: "From: hr@company.com",
    priority: "low",
    dueDate: "2024-01-25",
    completed: false,
    emailSubject: "Monthly Expense Reports Due"
  }
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
}

export function TodoSection() {
  const [tasks, setTasks] = React.useState(mockTasks)
  const [filter, setFilter] = React.useState("all")

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600">Find your tasks here</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6">
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

      {/* Task List */}
      <div className="space-y-4">
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
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{task.emailSubject}</p>
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
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === "completed" 
              ? "No completed tasks yet." 
              : filter === "pending"
              ? "No pending tasks. Great job!"
              : "Get started by scanning your emails for tasks."
            }
          </p>
        </div>
      )}
    </div>
  )
}
