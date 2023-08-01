<template>
  <div>
    <Header 
      :todos="todos"
      @addTodo="addTodo"
      @onFilterTodos="filterTodos" 
      @sortByTitle="sortByTitle"
    >
    </Header>

    <Notodos v-if="!todos.length"/>
    
    <TodoDisplay
      v-else
      :todos="filteredTodos" 
      :isShowingModal="isShowingModal"
      @toggleEditMode="toggleEditMode"
      @toggleTodoCheckedState="toggleTodoCheckedState"
      @updatePriority="updatePriority"
      @deleteTodo="deleteTodo"
      @closeEditMode="closeEditMode"
      @moveToPosition="moveToPosition"
      @saveTodo="saveTodo"
    /> 

    <NoTodosFound
      v-if="!filteredTodos.length && todos.length"
    >
    </NoTodosFound>

    <TodoForm 
      class="hidden"
      :todos="todos"
      @clearTodo="clearTodo" 
      @addTodo="addTodo"
    /> 

  </div> 

</template>

<script setup lang="ts">

import { ref, computed } from 'vue';

import Header from './components/header/Header.vue';
import TodoForm from './components/TodoForm.vue';
import TodoDisplay from './components/TodoDisplay.vue';
import Notodos from './components/NoTodos.vue';
import NoTodosFound from './components/todo/NoTodosFound.vue';

import { TodoType } from './types/TodoType'
import { OptionsType } from '../src/types/OptionsType'

// Array of TodoType objects for the todo list elements
const todos = ref<TodoType[]>([]);

const isShowingModal = ref<boolean>(false);

const search = ref("")

const filteredTodos = computed(() => 
   todos.value.filter((todo: TodoType) => 
       search.value
            .toLowerCase()
            .split(" ")
            .every(v => todo.title.toLowerCase().includes(v) || todo.description.toLowerCase().includes(v))
    )
)

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

function moveToPosition(todo: TodoType) {
  const index = todos.value.findIndex((t) => t.id === todo.id);

  if (index === -1) {
    return;
  }

  todos.value.splice(index, 1)

  todo.isChecked ? todos.value.unshift(todo) : todos.value.push(todo)

  todos.value.forEach((todo: TodoType) => {
        todo.isEditing = false;
  });
}


function filterTodos(searchValue: string) {
  search.value = searchValue
}

function saveTodo(todo: TodoType, todoTitle: string, todoDescription: string) {
    todo.title = todoTitle;
    todo.description = todoDescription;
}

function sortByTitle() {
  todos.value.sort((a: TodoType, b: TodoType) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) return 1;
    if (titleA > titleB) return -1;
    return 0;
  });
}


const todosimple1: TodoType = {
      id: 888, 
      title: "Make dinner", 
      description: "Buy groceries and make dinner",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

const todosimple2: TodoType = {
      id: 943, 
      title: "Call a friend", 
      description: "Talk about the latest trends",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

const todosimple3: TodoType = {
      id: 999, 
      title: "Clean the house", 
      description: "Prepare the house for the guests",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

const todosimple4: TodoType = {
      id: 978, 
      title: "Pc setup", 
      description: "Do some cable management",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

const todosimple5: TodoType = {
      id: 348, 
      title: "Make some cleaning in the kitchen", 
      description: "Clean the kitchen after cooking",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

const todosimple6: TodoType = {
      id: 428, 
      title: "Add flour and sugar to shopping list", 
      description: "Groceries",
      priority: "High",
      isChecked: false,
      isEditing: false,
      date: dateFormat(new Date())
}

todos.value.push(todosimple1);
todos.value.push(todosimple2);
todos.value.push(todosimple3);
todos.value.push(todosimple4);
todos.value.push(todosimple5);
todos.value.push(todosimple6);
</script>

