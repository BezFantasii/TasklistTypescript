<template>
  <div class="task__card" :style="{ borderLeft: `5px solid ${statusColor}` }">
    <div v-if="!isEditing" class="title__field">
        {{ props.title }}
    </div>  
    <MyInput v-else v-model="card.editTitle" :dataType="'text'" :placeholder="'Название задачи'" />
    <div v-if="!isEditing" class="data__field">
        {{ props.description }}
    </div>
    <MyInput v-else v-model="card.editDescription" :dataType="'text'" :placeholder="'Описание задачи'"/>
    <div v-if="!isEditing" class="meta__field">
        Приоритет: {{ props.priority }} | Статус: {{ props.status }}
    </div>
    <div v-else class="edit__meta">
        <MySelect v-model="card.editPriority" :selectData="['high', 'medium', 'low']" />
        <MySelect v-model="card.editStatus" :selectData="['todo', 'in-progress', 'completed']" />
    </div>
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
import { onMounted, ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import MyInput from './UI/MyInput.vue';
import MySelect from './UI/MySelect.vue';

interface Props extends Pick<Task, 'title' | 'description' | 'priority'|'status'|'id'>{
};
const props = defineProps<Props>();

const statusColor = computed(() => {
  switch (props.status) {
    case 'todo':
      return '#ccc'; // gray
    case 'in-progress':
      return '#ffc107'; // yellow
    case 'completed':
      return '#28a745'; // green
    default:
      return '#ccc';
  }
});

const taskStore = useTaskStore();

const isMenu = ref<boolean>(false);
const isEditing = ref<boolean>(false);
let hideMenuTimeout: number | null = null;

const card = ref({
  editTitle: props.title,
  editDescription: props.description,
  editPriority: props.priority,
  editStatus: props.status
});
const deleteTask = () => {
  taskStore.removeTask(props.id);
};

const startEdit = () => {
  isEditing.value = true;
  card.value.editTitle = props.title;
  card.value.editDescription = props.description;
  card.value.editPriority = props.priority;
  card.value.editStatus = props.status;
};

const saveEdit = () => {
  taskStore.updateTask(props.id, { title: card.value.editTitle, description: card.value.editDescription, priority: card.value.editPriority, status: card.value.editStatus });
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
// const changeColor = () =>{
//   if (props.status)
// }
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
  border-left: 5px solid #ccc; /* default gray */
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

.meta__field {
  font-size: var(--font-size-small);
  color: var(--color-text-gray);
  margin-top: 0.5rem;
}

.edit__meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
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
