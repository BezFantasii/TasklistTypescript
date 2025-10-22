<template>
  <div class="task__form">
    <div class="input__form">
        <MyInput :model-value="task.title" @update:modelValue="$event => (task.title = $event)" :dataType="'text'" :placeholder="'Название задачи'"/>
        <MyInput :model-value="task.description" @update:modelValue="$event => (task.description = $event)" :dataType="'text'" :placeholder="'Описание задачи'"/>
     </div>
    <div class="submit__btn">
        <button class="btn btn-blue" @click="addTask">Поставить задачу</button>
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
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-family);
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
  @extend .input;
}

.submit__btn {
  display: flex;
  justify-content: center;
}

.submit__btn button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-normal);
  transform: none;
}

.submit__btn button:hover {
  transform: translateY(-2px);
}

.submit__btn button:active {
  transform: translateY(0);
}
</style>
