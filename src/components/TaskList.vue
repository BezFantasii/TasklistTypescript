<template>
  <div class="task__list">
    <div v-for="task in tasks" :key="task.id">
      <TaskCard :task="task"></TaskCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TaskCard from './TaskCard.vue';
import { useTaskStore } from '@/stores/taskStore.ts';

const taskStore = useTaskStore();

// Получаем задачи из store (реактивно)
const tasks = computed(() => taskStore.tasks);
</script>

<style>
/* Ваши стили */
</style>