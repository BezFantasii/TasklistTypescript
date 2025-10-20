<template>
  <input :value="props.modelValue" :type="props.dataType" :placeholder="props.placeholder" @input="emit('update:modelValue', $event.target.value)"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref('');
interface Props{
  modelValue?: string,
  dataType: string,
  placeholder?: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style>

</style>
