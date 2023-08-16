<template>
    <div>
      <Header 
        :todos="todosToShow"
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
  
    </div> 
  
  </template>
  
  <script setup lang="ts">
  
  import { ref, computed, onMounted } from 'vue';
  
  import Header from '../components/header/Header.vue';
  import TodoDisplay from '../components/TodoDisplay.vue';
  import Notodos from '../components/NoTodos.vue';
  import NoTodosFound from '../components/todo/NoTodosFound.vue';

  import todoService from '../service/todoService.ts'

  import { TodoType } from '../types/TodoType'
  import { OptionsType } from '../../src/types/OptionsType'
  
  // Array of TodoType objects for the todo list elements
  const todos = ref(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);
  
  // -------------------------------------
  
  //const todos2 = ref<TodoType[]>()
  
  const todosToShow = computed(() => todoService.getTodos().value || []);

  onMounted(async () => {
  await todoService.getAllTodos();
  });

  // -------------------------------------
  
  const search = ref("")
  
  const isShowingModal = ref(false);
  
  const priorityValues: Record<string, number> = {
    'High': 3,
    'Medium': 2,
    'Low': 1,
  };
  
  const filteredTodos = computed(() => 
     todosToShow.value.filter((todo: TodoType) => 
         search.value
              .toLowerCase()
              .split(" ")
              .every(v => todo.title.toLowerCase().includes(v) || todo.description.toLowerCase().includes(v))
      )
  )

  function addTodo(newTodo: TodoType) {
    todoService.addTodo();
    todosToShow.value.push(newTodo);
  }

  function deleteTodo(todo: TodoType) {
   const todoId = todo._id;
   todoService.deleteTodo(todoId);

   // Remove the deleted todo from the todos array
   const index = todosToShow.value.findIndex((t: TodoType) => t._id === todoId);
    if (index !== -1) {
        todosToShow.value.splice(index, 1);
    }
  } 

  function toggleEditMode(todo: TodoType) {
    
    if(!todo.isEditing) {     
      todo.isEditing = !todo.isEditing;
      todoService.editTodoEditingMode(todo._id, todo.isEditing); 
    }
  }

  function closeEditMode(todo: TodoType) {
    todo.isEditing = false;
    todoService.editTodoEditingMode(todo._id, todo.isEditing)
  }
  
  function toggleTodoCheckedState(todo: TodoType) {
    todo.isChecked = !todo.isChecked;
    moveToPosition(todo);
    todoService.editTodoCheck(todo._id, todo.isChecked)
  }
  
  function updatePriority(todo: TodoType, option: OptionsType) {
      const priority = option.name;
      todo.priority = option.name;
      todoService.editTodoPriority(todo._id, priority)
  }
  
  function moveToPosition(todo: TodoType) {
    const index = todosToShow.value.findIndex((t: TodoType) => t._id === todo._id);
  
    if (index === -1) {
      return;
    }
  
    todosToShow.value.splice(index, 1)
  
    todo.isChecked ? todosToShow.value.unshift(todo) : todosToShow.value.push(todo)
  
    todosToShow.value.forEach((todo: TodoType) => {
          todo.isEditing = false;
    });
  }
  
  
  function filterTodos(searchValue: string) {
    search.value = searchValue
  }
  
  function saveTodo(todo: TodoType, todoTitle: string, todoDescription: string) {
      todo.title = todoTitle;
      todo.description = todoDescription;
      todoService.editTodoTitle(todo._id, todoTitle);
      todoService.editTodoDescription(todo._id, todoDescription);
  }
  
  function sortTodos(attribute: string) {
    todosToShow.value.sort((a: TodoType, b: TodoType) => {
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
    todosToShow.value.reverse();
    saveTodosToLocalStorage()
  }
  
  // Function to save todos to localStorage
  function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  }
  
  </script>
  
  ../service/todo.UpdateEditing