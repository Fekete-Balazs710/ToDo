<template>
  <div>
    <Header @addTodo="addTodo"></Header>

    <Notodos v-if="!todos.length"/>
    
    <TodoDisplay
      v-else
      :todos="todos" 
      :isShowingModal="isShowingModal"
      @toggleEditMode="toggleEditMode"
      @toggleTodoCheckedState="toggleTodoCheckedState"
      @updatePriority="updatePriority"
      @deleteTodo="deleteTodo"
      @closeEditMode="closeEditMode"
    /> 

    <TodoForm 
      :todos="todos"
      @clearTodo="clearTodo" 
      @addTodo="addTodo"
    /> 

  </div> 

</template>

<script setup lang="ts">

import { ref } from 'vue';

import Header from './components/header/Header.vue';
import TodoForm from './components/TodoForm.vue';
import TodoDisplay from './components/TodoDisplay.vue';
import Notodos from './components/NoTodos.vue';

import { TodoType } from './types/TodoType'
import { OptionsType } from '../src/types/OptionsType'

// Array of TodoType objects for the todo list elements
const todos = ref<TodoType[]>([]);


//Add function to add elements to existing array of todos
function addTodo() {
    
    //define the largest id in the todos array
    //as a starting point (when no todos are added to list) maxId = 0
    let maxId = 0; 

    if (todos.value.length !== 0) {
      maxId = Math.max(...todos.value.map((todo: TodoType) => todo.id));
    } 
    

    //add new todo element to list, position: maxId + 1
    const emptyTodo: TodoType = { 
      id: maxId + 1, 
      title: "Title", 
      description: "Todo Description",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
    };

    todos.value.push(emptyTodo);
    
  }

  const isShowingModal = ref<boolean>(false);

//Delete function to remove elements from todos array
function deleteTodo(todo: TodoType) {
 
  const todoId = todo.id;
  const index = todos.value.findIndex(todo => todo.id === todoId);
  if (index == -1) {
    return
  }

  todos.value.splice(index, 1);

  // Updating the todos array to trigger reactivity
  todos.value = todos.value.slice();

  isShowingModal.value = false;
}

function clearTodo() {
    todos.value = [];
}  

function toggleEditMode(id: number) {
  todos.value.map((todo: TodoType) => {
    todo.isEditing = (todo.id === id)
  })
}

function closeEditMode(todo: TodoType) {
  todo.isEditing = false;
}

function dateFormat(date: Date) {
  const formattedDate = date.toLocaleDateString('en', {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  }).replace(/\//g, '.');

  return formattedDate;
}

function toggleTodoCheckedState (todo: TodoType) {
  todo.isChecked = !todo.isChecked;
}

function updatePriority(todo: TodoType, option: OptionsType) {
    todo.priority = option.name;
}

</script>

