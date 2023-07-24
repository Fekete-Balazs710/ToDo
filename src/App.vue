<template>
  <div>
    <TodoHeader />

    <TodoForm :todos="todos" @clearTodo="clearTodo" @addTodo="addTodo"
            :inputValue="inputValue"/>

    <TodoDisplay :todos="todos" @deleteTodo="removeTodo"/> 
  </div> 

</template>

<script setup lang="ts">

import TodoHeader from './components/TodoHeader.vue';
import TodoForm from './components/TodoForm.vue';
import TodoDisplay from './components/TodoDisplay.vue';

import { ref } from 'vue';


// Array of numbers and strings for the todo list elements
const todos = ref<{ id: number; text: string }[]>([
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Clean the house' },
  { id: 3, text: 'Finish the report' },
  { id: 4, text: 'Go for a walk' },
  { id: 5, text: 'Call a friend' },
]);

//Add function to add elements to existing array of todos
function addTodo(inputValue: string) {
    
    if (!inputValue) {
      return;
    }

    //define the largest id in the todos array
    const maxId = Math.max(...todos.value.map((todo: { id: number; text: string }) => todo.id));

    //add new todo element to list, position: maxId + 1
    const newTodo = { id: maxId + 1, text: inputValue};

    todos.value.push(newTodo);
    
  }

//Delete function to remove elements from todos array
function removeTodo(todoId: number) {
  const index = todos.value.findIndex(todo => todo.id === todoId);
  if (index == -1) {
    return
  }

  todos.value.splice(index, 1);

  // Updating the todos array to trigger reactivity
  todos.value = todos.value.slice();
  
}

function clearTodo() {
    todos.value = [];
}  

</script>

