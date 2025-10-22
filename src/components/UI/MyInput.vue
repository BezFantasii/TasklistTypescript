<template>
  <input :value="props.modelValue" :type="props.dataType" :placeholder="props.placeholder" @input="emit('update:modelValue', $event.target.value)" class="input__form"/>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

// const data = ref('');
interface Props{
  modelValue: string,
  dataType: string,
  placeholder?: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.input__form {
  padding: var(--padding-input);
  margin: var(--margin-input);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-normal);
  transition: var(--transition-border), var(--transition-box-shadow);
  box-sizing: border-box;
}

.input__form:focus {
  outline: none;
  border-color: var(--color-blue);
  box-shadow: var(--box-shadow-focus);
}
</style>
