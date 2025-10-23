export type taskPriority = "low"|"medium"|"high"
export type taskCategory = "work"|"home"|"rest"
export type taskStatus = 'todo' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  category: taskCategory
  priority: taskPriority
  status: taskStatus
}


