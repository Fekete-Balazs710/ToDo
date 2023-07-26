<template>
  <div>
    <TodoHeader @addTodo="addTodo"/>

      <Notodos v-if="!todos.length"/>
      
      <TodoDisplay v-else :todos="todos" @deleteTodo="removeTodo"/> 

    <TodoForm :todos="todos" @clearTodo="clearTodo" @addTodo="addTodo"/>
  </div> 

</template>

<script setup lang="ts">

import TodoHeader from './components/TodoHeader.vue';
import TodoForm from './components/TodoForm.vue';
import TodoDisplay from './components/TodoDisplay.vue';
import Notodos from './components/NoTodos.vue';

import { ref } from 'vue';

import { TodoType } from './types/TodoType'

// Array of TodoType objects for the todo list elements
const todos = ref<TodoType[]>([]);


//Add function to add elements to existing array of todos
function addTodo() {
    
    //define the largest id in the todos array
    const maxId = Math.max(...todos.value.map((todo: TodoType) => todo.id));

    //add new todo element to list, position: maxId + 1
    const emptyTodo: TodoType = { 
      id: maxId + 1, 
      title: "Title", 
      description: "Todo Description",
      priority: "High",
      status: "Unchecked"
    };

    todos.value.push(emptyTodo);
    
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

