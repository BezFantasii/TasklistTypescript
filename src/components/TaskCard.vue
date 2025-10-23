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
    <div class="editing__card" @mouseover="eventMenu" @mouseleave="eventRemoveMenu">
      <div v-if="!isMenu">
        <button class="menu__btn btn btn-circle">⋮</button>
      </div>
      <div v-else>
        <button class="delete__btn btn btn-circle btn-red" @click="deleteTask" title="Удалить задачу">×</button>
        <button v-if="!isEditing" class="edit__btn btn btn-circle btn-green" @click="startEdit" title="Редактировать задачу">✎</button>
        <button v-else class="save__btn btn btn-circle btn-blue" @click="saveEdit" title="Сохранить изменения">✓</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import MyInput from './UI/MyInput.vue';

interface Props extends Pick<Task, 'title' | 'description' | 'category'|'priority'|'status'>{
};
const props = defineProps<Props>();

const taskStore = useTaskStore();

const isMenu = ref<boolean>(false);
const isEditing = ref<boolean>(false); // Предполагаем, что это уже определено
let hideMenuTimeout: number | null = null; // Таймер для задержки
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
// Показать меню
const eventMenu = () => {
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout); // Отменить скрытие, если курсор вернулся
    hideMenuTimeout = null;
  }
  isMenu.value = true;
};

// Скрыть меню с задержкой
const eventRemoveMenu = () => {
  hideMenuTimeout = window.setTimeout(() => {
    isMenu.value = false;
  }, 300); // Задержка 300 мс — можно настроить
};
onMounted(() => console.log(props));
</script>

<style scoped>
.task__card {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-family);
  transition: var(--transition-box-shadow);
  display: flex;
  flex-direction: column;
}

.task__card:hover {
  box-shadow: var(--box-shadow-hover);
}

.title__field {
  font-size: var(--font-size-large);
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.data__field {
  font-size: var(--font-size-normal);
  color: var(--color-text-gray);
  line-height: 1.4;
}

.delete__btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.menu__btn{
  background-color: transparent;
  position: absolute;
  top: 10px;
  right: 10px;
}
.edit__btn {
  position: absolute;
  top: 10px;
  right: 50px;
}

.save__btn {
  position: absolute;
  top: 10px;
  right: 50px;
}
</style>
