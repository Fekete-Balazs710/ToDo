<template>
    <div>
      <Header 
        :todos="todosToShow"
        :firstName="credentials.firstName"
        :lastName="credentials.lastName"
        @addTodo="addTodo"
        @onFilterTodos="filterTodos" 
        @sortTodos="sortTodos"
        @reverseTodos="reverseTodos"
      >
      </Header>

      <SkeletonLoader v-if="isLoading"></SkeletonLoader>

      <Notodos v-if="!todosToShow.length && !isLoading"/>

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
        v-if="!filteredTodos.length && todosToShow.length && !isLoading"
      >
      </NoTodosFound>
      
    </div> 
  
  </template>
  
  <script setup lang="ts">
  
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import Header from '../components/header/Header.vue';
  import TodoDisplay from '../components/TodoDisplay.vue';
  import Notodos from '../components/NoTodos.vue';
  import NoTodosFound from '../components/todo/NoTodosFound.vue';
  import SkeletonLoader from '../components/base-components/SkeletonLoader.vue'

  import todoService from '../service/todoService.ts'
  import { TodoType } from '../types/TodoType'
  import { OptionsType } from '../../src/types/OptionsType'

  import { debounce } from 'lodash';
  
  const route = useRoute();
  const userId = route.params.userId.toString(); 

  const todosToShow = computed(() => todoService.get().value || []);

  const isLoading = ref(true);

  const credentials = computed(() => {
    const credentialsData: any = todoService.getCredentials();
      return {
        firstName: credentialsData.value?.firstName.toString() || "",
        lastName: credentialsData.value?.lastName.toString() || ""
      };
  });

  const search = ref("")
  
  const isShowingModal = ref(false);
  
  const filteredTodos = ref<TodoType[]>([]);

  async function fetchFilteredTodos() {
  try {
    const data = await todoService.fetchFilteredTodos(userId, search.value);
    filteredTodos.value = data;
  } catch (error) {
    console.error('Error fetching filtered todos:', error);
  }
}

  function addTodo() {

    // const newTodo: TodoType = {
    //   _id: "1234",
    //   title: 'Todo Title',
    //   description: 'Todo Description',
    //   priority: 'High',
    //   isChecked: false,
    //   isEditing: true,
    //   date: Date().toString()
    // };

    todoService.create(userId);
    //todosToShow.value.push(newTodo);
    //filteredTodos.value.push(newTodo);
    window.location.reload();
  }

  function deleteTodo(todo: TodoType) {
   const todoId = todo._id;
   todoService.delete(todoId);

   // Remove the deleted todo from the todos array
   const index = todosToShow.value.findIndex((t: TodoType) => t._id === todoId);
    if (index !== -1) {
        todosToShow.value.splice(index, 1);
        filteredTodos.value.splice(index, 1);
    }
  } 

  function toggleEditMode(todo: TodoType) {
    if(!todo.isEditing) {     
      todo.isEditing = !todo.isEditing;
    }
  }

  function closeEditMode(todo: TodoType) {
    todo.isEditing = false;
  }
  
  function toggleTodoCheckedState(todo: TodoType) {
    todo.isChecked = !todo.isChecked;
    moveToPosition(todo);
    todoService.editCheck(todo._id, todo.isChecked)
  }
  
  function updatePriority(todo: TodoType, option: OptionsType) {
      todo.priority = option.name;
  }
  
  function moveToPosition(todo: TodoType) {
    const index = filteredTodos.value.findIndex((t: TodoType) => t._id === todo._id);
  
    if (index === -1) {
      return;
    }
  
    filteredTodos.value.splice(index, 1)
  
    todo.isChecked ? filteredTodos.value.unshift(todo) : filteredTodos.value.push(todo)
  
    filteredTodos.value.forEach((todo: TodoType) => {
          todo.isEditing = false;
    });
  }
  
  function filterTodos(searchValue: string) {
    search.value = searchValue
  }
  
  function saveTodo(todo: TodoType, todoTitle: string, todoDescription: string, todoPriority: string) {
      todo.title = todoTitle;
      todo.description = todoDescription;
      todo.priority = todoPriority;

      const updatedTodo = {
        title: todoTitle,
        description: todoDescription,
        priority: todoPriority
      }

      todoService.update(todo._id, updatedTodo);
  }

  async function sortTodos(attribute: string) {
  try {
    const data = await todoService.sortTodos(userId, attribute);

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid response data format');
    }

    filteredTodos.value = data;
  } catch (error) {
    console.error('Error sorting todos:', error);
  }
}

  function reverseTodos() {
    filteredTodos.value.reverse();
  }
  
 const debouncedFetchFilteredTodos = debounce(fetchFilteredTodos, 500);

  watch(search, () => {
    debouncedFetchFilteredTodos();
  });

  onMounted(async () => {
    await todoService.getAll(userId);
    await fetchFilteredTodos();
    await todoService.getUserCredentials(userId);
    isLoading.value = false;
  });

  </script>
