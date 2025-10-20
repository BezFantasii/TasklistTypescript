<template>
  <div class="task__card">
    <div class="title__field">
        {{ props.title }}
    </div>
    <div class="data__field">
        {{ props.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
interface Props extends Pick<Task, 'title' | 'description'{
    
}
const props = defineProps<Props>();
</script>

<style>

</style>