<template>
  <select :value="modelValue" > <!-- Заменил v-model на :value и @change -->
    <option v-for="category in selectData" :key="category" :value="category" @click="u">{{ category }}</option>
  </select>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string; // Prop для значения
  selectData: Array<string>; // Массив опций
}

const props = defineProps<Props>();

// Эмит для обновления v-model в родительском компоненте
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Функция для обработки изменения и эмит обновления
const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value); // Эмитим новое значение
};
</script>

<style scoped>
/* Ваши стили */
</style>
