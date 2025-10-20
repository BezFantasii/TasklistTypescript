<template>
  <div class="task__card">
    <div v-if="!isEditing" class="title__field">
        {{ props.title }}
    </div>
    <MyInput v-else v-model="editTitle" :dataType="'text'" :placeholder="'Название задачи'" />
    <div v-if="!isEditing" class="data__field">
        {{ props.description }}
    </div>
    <MyInput v-else v-model="editDescription" :dataType="'text'" :placeholder="'Описание задачи'"/>
    <button class="delete__btn" @click="deleteTask" title="Удалить задачу">×</button>
    <button v-if="!isEditing" class="edit__btn" @click="startEdit" title="Редактировать задачу">✎</button>
    <button v-else class="save__btn" @click="saveEdit" title="Сохранить изменения">✓</button>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import MyInput from './UI/MyInput.vue';

interface Props extends Pick<Task, 'title' | 'description' | 'id'>{
};
const props = defineProps<Props>();

const taskStore = useTaskStore();

const isEditing = ref(false);
const editTitle = ref(props.title);
const editDescription = ref(props.description);

const deleteTask = () => {
  taskStore.removeTask(props.id);
};

const startEdit = () => {
  isEditing.value = true;
  editTitle.value = props.title;
  editDescription.value = props.description;
};

const saveEdit = () => {
  taskStore.updateTask(props.id, { title: editTitle.value, description: editDescription.value });
  isEditing.value = false;
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
  display: flex;
  flex-direction: column;
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

.delete__btn {
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

.delete__btn:hover {
  background-color: #d32f2f;
  transform: scale(1.1);
}

.delete__btn:active {
  transform: scale(0.95);
}

.edit__btn {
  position: absolute;
  top: 10px;
  right: 50px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4caf50;
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

.edit__btn:hover {
  background-color: #388e3c;
  transform: scale(1.1);
}

.edit__btn:active {
  transform: scale(0.95);
}

.save__btn {
  position: absolute;
  top: 10px;
  right: 50px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #2196f3;
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

.save__btn:hover {
  background-color: #1976d2;
  transform: scale(1.1);
}

.save__btn:active {
  transform: scale(0.95);
}
</style>
