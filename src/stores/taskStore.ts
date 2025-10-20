// stores/taskStore.ts
import { defineStore } from 'pinia';
import type { Task } from '../types/task';

export const useTaskStore = defineStore('taskStore', {
  state: () => {
    // Загружаем задачи из localStorage при инициализации
    const storedTasks = localStorage.getItem('tasks');
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    return {
      tasks
    };
  },
  actions: {
    // Функция добавления задачи
    addTask(task: Task) {
      this.tasks.push(task);
      // Сохраняем в localStorage после добавления
      this.saveTasks();
    },
    // Функция сохранения задач в localStorage
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    // Опционально: функция загрузки задач (если нужно перезагрузить вручную)
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }

    },
    removeTask (id: string){
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    updateTask(id: string, updatedTask: Omit<Task, 'id'>) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updatedTask } as Task;
        this.saveTasks();
      }
    }
  }
});
