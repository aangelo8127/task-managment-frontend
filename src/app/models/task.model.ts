export interface Task {
  id?: number;
  taskId?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
