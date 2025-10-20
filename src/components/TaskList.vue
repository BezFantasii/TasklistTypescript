<template>
  <div class="task__list">
    <div v-for="task in tasks" :key="task.id">
      <TaskCard :title="task.title" :description="task.description" :id="task.id"></TaskCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import TaskCard from './TaskCard.vue';
import { useTaskStore } from '@/stores/taskStore.ts';

onMounted(() => {
  console.log(taskStore.tasks)
})
const taskStore = useTaskStore();

// Получаем задачи из store (реактивно)
const tasks = computed(() => taskStore.tasks);

</script>

<style scoped>
.task__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
}

/* Для мобильных устройств */
@media (max-width: 600px) {
  .task__list {
    grid-template-columns: 1fr;
  }
}
</style>
