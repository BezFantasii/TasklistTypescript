<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
</script>

<template>
  <main>
    <task-form></task-form>
    <task-list></task-list>
  </main>
</template>
<style scoped>
main{
  display: flex;
  justify-content: space-around;
}
@media (max-width: 800px) {
  main{
    display: flex;
    flex-direction: column;
  }
}

</style>