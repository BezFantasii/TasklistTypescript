<template>
  <div class="task__form">
    <div class="input__form">
        <input type="text" v-model="task.title" placeholder="Название задачи"/>
        <input type="text" v-model="task.description" placeholder="Описание задачи"/>
        <input type="text" v-model="task.id" placeholder="ID задачи"/>
    </div>
    <div class="submit__btn">
        <button @click="addTask">Поставить задачу</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

// Инициализируем реактивный объект для формы
const task = ref<Task>({
  title: '',
  description: '',
  id: ''
});

function addTask(): void {
  // Проверяем, что все поля заполнены
  if (!task.value.title || !task.value.description || !task.value.id) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  // Добавляем задачу в store
  taskStore.addTask(task.value);

  // Очищаем форму после добавления
  task.value = {
    title: '',
    description: '',
    id: ''
  };
}
</script>

<style>
/* Ваши стили */
</style>