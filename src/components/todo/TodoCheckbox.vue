<template>
  <CircleCheckIcon
    v-if="!todo.isChecked"
    stroke="#4FDA9B"
    @click.stop="toggleTodoCheckedState(todo)"
  >
  </CircleCheckIcon>

  <div v-else class="flex flex-col items-center justify-center relative">
    <CheckedIcon 
      class="z-30 absolute bottom-1 left-0.5" 
      @click.stop="toggleTodoCheckedState(todo)" 
    >
    </CheckedIcon>
    <CircleCheckIcon 
      stroke="#4FDA9B"
      class="z-20">
    </CircleCheckIcon>
  </div>
  
</template>

<script setup lang="ts">

import CircleCheckIcon from '../icons/CircleCheckIcon.vue';
import CheckedIcon from '../icons/CheckedIcon.vue';

import { TodoType } from '../../types/TodoType'

interface Props {
    todo: TodoType;
}
defineProps<Props>()

const emit = defineEmits(['toggleTodoCheckedState'])

function toggleTodoCheckedState(todo: TodoType) {
  emit('toggleTodoCheckedState', todo)
}

</script>