export type taskPriority = "low"|"medium"|"high"
export type taskStatus = 'todo' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  priority: string|taskPriority
  status: string|taskStatus
}


