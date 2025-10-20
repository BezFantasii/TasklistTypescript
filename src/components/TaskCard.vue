<template>
  <div class="task__card">
    <div class="title__field">
        {{ props.title }}
    </div>
    <div class="data__field">
        {{ props.description }}
    </div>
    <button class="delete-btn" @click="deleteTask" title="Удалить задачу">×</button>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore.ts';

interface Props extends Pick<Task, 'title' | 'description' | 'id'>{
};
const props = defineProps<Props>();

const taskStore = useTaskStore();

const deleteTask = () => {
  taskStore.removeTask(props.id); // Предполагаю, что в store есть метод removeTask(id)
};

onMounted(() => console.log(props));
</script>

<style scoped>
.task__card {
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Arial', sans-serif;
  transition: box-shadow 0.2s ease;
}

.task__card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.title__field {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.5rem;
}

.data__field {
  font-size: 1rem;
  color: #666666;
  line-height: 1.4;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: scale(1.1);
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
