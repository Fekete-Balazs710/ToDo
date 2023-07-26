<template>
  <CircleCheckBlack
    v-if="!todo.isChecked"
    @click="changeChecked(todo)"
  />
  <div v-else class="flex flex-col items-center justify-center relative">
    <CheckedSvg @click="changeChecked(todo)" class="z-30 absolute bottom-1 left-0.5" />
    <CircleCheckGreen class="z-20" />
  </div>
  
</template>

<script setup lang="ts">

import CircleCheckBlack from './CircleCheckBlack.vue';
import CircleCheckGreen from './CircleCheckGreen.vue';
import CheckedSvg from './CheckedSvg.vue';

import { TodoType } from '../types/TodoType'

interface Props {
    todo: TodoType;
}
defineProps<Props>()

const emit = defineEmits(['changeChecked'])

function changeChecked(todo: TodoType) {
  emit('changeChecked', todo)
}

</script>