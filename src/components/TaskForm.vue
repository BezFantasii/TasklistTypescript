<template>
  <form class="task__form" @submit.prevent="addTask">
    <div class="input__form">
      <MyInput
        :model-value="task.title"
        @update:modelValue="$event => (task.title = $event)"
        :dataType="'text'"
        :placeholder="'Название задачи'"
      />
      <MyInput
        :model-value="task.description"
        @update:modelValue="$event => (task.description = $event)"
        :dataType="'text'"
        :placeholder="'Описание задачи'"
      />
      <MySelect v-model="task.category" :selectData="taskCategory" /> <!-- Используем v-model -->
      <MySelect v-model="task.priority" :selectData="taskPriority" /> <!-- Аналогично -->
      <MySelect v-model="task.status" :selectData="taskStatus" /> <!-- Аналогично -->
    </div>
    <div class="submit__btn">
      <button class="btn btn-blue" type="submit">Поставить задачу</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Убрал computed, так как не используется
import type { Task } from '@/types/task'; // Убрал taskCategory и т.д., если они не типы — определены локально
import { useTaskStore } from '@/stores/taskStore';
import MyInput from './UI/MyInput.vue';
import MySelect from './UI/MySelect.vue';

const taskStore = useTaskStore();

// Инициализируем реактивный объект для формы
const task = ref<Task>({
  title: '',
  description: '',
  id: '',
  category: 'home',
  priority: 'high',
  status: 'todo'
});

// Определяем массивы локально (если taskCategory — тип, замените на константы)
const taskCategory: string[] = ["work", "home", "rest"];
const taskPriority: string[] = ["high", "medium", "low"];
const taskStatus: string[] = ["todo", "in-progress", "completed"];

onMounted(() => {
  console.log(taskCategory);
});

// Убрал categoryEmit, так как он не нужен
const addTask = () => {
  // Проверяем, что все поля заполнены
  if (!task.value.title.trim() || !task.value.description.trim()) {
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
    id: '',
    category: 'home',
    priority: 'high',
    status: 'todo'
  };
};
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
