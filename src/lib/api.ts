const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface Task {
  sender: string
  task: string
  due_date: string | null
  email_link: string
}

export interface EmailWithTasks {
  subject: string
  tasks: Task[]
}

export const api = {
  // Search tasks by query
  searchTasks: async (query: string): Promise<EmailWithTasks[]> => {
    const response = await fetch(`${API_BASE_URL}/?query=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error(`Failed to search tasks: ${response.statusText}`)
    }
    return response.json()
  }
}
