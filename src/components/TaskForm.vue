<template>
  <div class="task__form">
    <div class="input__form">
        <input type="text" v-model="task.title"/>
        <input type="text" v-model="task.description"/>
        <input type="text" v-model="task.id"/>
    </div>
    <div class="submit__btn">
        <button @click="">Поставить задачу</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';

const task: Task;
</script>

<style>

</style>