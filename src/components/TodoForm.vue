<template>
    <div class="container mx-auto text-center p-8">
      <form class="my-4" @submit.prevent="addTodo()">
        <input 
          type="text"
          placeholder="Add todo element..."
          class="p-5 shadow border rounded px-3"
          v-model="inputValue"
          required
        />
        <br>
        <BaseButton
          button-title="Add to list"
          color="green"
          type="submit">
        </BaseButton>
      </form>

      <BaseButton 
        button-title="Clear"
        color="red"
        @click="clearTodo">
      </BaseButton>
    </div>
  </template>
  
<script setup lang="ts">
  import BaseButton from './base-components/BaseButton.vue';
  import { ref } from 'vue';
  
  //Add emit to modify data in parent component
  const emit = defineEmits(['clearTodo', 'addTodo'])

  const inputValue = ref('');
  
  //Add function to add elements to existing array of todos
  function addTodo() {
    emit('addTodo', inputValue.value);
    inputValue.value = "";
  }

  //Clear function to remove all elements from todos array
function clearTodo() {
    emit('clearTodo');
}  
  
</script>
  