<template>
  <select :value="modelValue" @change="updateValue"> <!-- Заменил v-model на :value и @change -->
    <option v-for="item in props.selectData" :key="item" :value="item">{{ item }}</option>
  </select>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string; // Prop для значения
  selectData: Array<string>; // Массив опций
}

const props = defineProps<Props>();

const model = defineModel()
// Эмит для обновления v-model в родительском компоненте
// const emit = defineEmits<{
//   (e: 'update:modelValue', value: string): void;
// }>();

// Функция для обработки изменения и эмит обновления
const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  console.log(typeof(target.value))
  model.value = target.value
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

option {
  padding: 0.5rem;
}
</style>
