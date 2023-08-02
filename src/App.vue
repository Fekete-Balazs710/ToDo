<template>
  <div>
    <Header 
      :todos="todos"
      @addTodo="addTodo"
      @onFilterTodos="filterTodos" 
      @sortTodos="sortTodos"
      @reverseTodos="reverseTodos"
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
const todos = ref(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);

const search = ref("")

const isShowingModal = ref(false);

const priorityValues: Record<string, number> = {
  'High': 3,
  'Medium': 2,
  'Low': 1,
};

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

    saveTodosToLocalStorage();
  }

//Delete function to remove elements from todos array
function deleteTodo(todo: TodoType) {
 
  const todoId = todo.id;
  const index = todos.value.findIndex((todo: { id: number; }) => todo.id === todoId);
  if (index == -1) {
    return
  }

  todos.value.splice(index, 1);

  // Updating the todos array to trigger reactivity
  todos.value = todos.value.slice();

  isShowingModal.value = false;

  saveTodosToLocalStorage()
}

function clearTodo() {
    todos.value = [];
    saveTodosToLocalStorage()
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
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

function toggleTodoCheckedState (todo: TodoType) {
  todo.isChecked = !todo.isChecked;
  saveTodosToLocalStorage()
}

function updatePriority(todo: TodoType, option: OptionsType) {
    todo.priority = option.name;
    saveTodosToLocalStorage()
}

function moveToPosition(todo: TodoType) {
  const index = todos.value.findIndex((t: TodoType) => t.id === todo.id);

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
    saveTodosToLocalStorage()
}

function sortTodos(attribute: string) {
  todos.value.sort((a: TodoType, b: TodoType) => {
    switch (attribute) {
      case 'title':
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return 1;
        if (titleA > titleB) return -1;
        return 0;

      case 'description':
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();
        if (descriptionA < descriptionB) return 1;
        if (descriptionA > descriptionB) return -1;
        return 0;

      case 'priority':
        const priorityA = priorityValues[a.priority];
        const priorityB = priorityValues[b.priority];
        return priorityB - priorityA;

      case 'date':
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();

      default:
        return 0;
    }
  });
}

function reverseTodos() {
  todos.value.reverse();
  saveTodosToLocalStorage()
}

// Function to save todos to localStorage
function saveTodosToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value));
}

</script>

