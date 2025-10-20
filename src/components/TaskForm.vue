<template>
  <div class="task__form">
    <div class="input__form">
        <MyInput :model-value="task.title" @update:modelValue="$event => (task.title = $event)" :dataType="'text'" :placeholder="'Название задачи'"/>
        <MyInput :model-value="task.description" @update:modelValue="$event => (task.description = $event)" :dataType="'text'" :placeholder="'Описание задачи'"/>
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
import MyInput from './UI/MyInput.vue';

const taskStore = useTaskStore();

// Инициализируем реактивный объект для формы
const task = ref<Task>({
  title: '',
  description: '',
  id: ''
});

const  addTask = () => {
  // Проверяем, что все поля заполнены
  if (!task.value.title || !task.value.description) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  task.value.id = Date.now().toString();
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

<style scoped>
.task__form {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  width: 100%;
}

.input__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input__form input {
  padding: 0.75rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input__form input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 4px rgba(33, 150, 243, 0.3);
}

.submit__btn {
  display: flex;
  justify-content: center;
}

.submit__btn button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.submit__btn button:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}

.submit__btn button:active {
  transform: translateY(0);
}
</style>
