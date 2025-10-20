import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ListFormat } from 'typescript'
import type { Task } from '../types/task.ts'

export const useTaskStore = defineStore('taskStore', () => {
  state: ()=>{
    const tasks: Array<Task> = [];

  }
  actions:{
    addTask(task: Task){
        this.tasks.push(task);
    }
  }

})
