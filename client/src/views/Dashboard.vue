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
  
  import getAllTodos from '../service/todo.GetAll';
  import postTodos from '../service/todo.Post';
  import editTodosEditingMode from '../service/todo.UpdateEditing';
  import editTodosCheck from '../service/todo.UpdateCheck';
  import editTodosPriority from '../service/todo.UpdatePriority';
  import editTodosTitle from '../service/todo.UpdateTitle';
  import editTodosDescription from '../service/todo.UpdateDescription';
  import deleteTodos from '../service/todo.Delete';

  import { TodoType } from '../types/TodoType'
  import { OptionsType } from '../../src/types/OptionsType'
  
  // Array of TodoType objects for the todo list elements
  const todos = ref(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);
  
  // -------------------------------------
  
  //const todos2 = ref<TodoType[]>()
  
  const todosToShow = computed(() => todos2.value || []);
  
  const { todos2, GetAllTodos } = getAllTodos()

  onMounted(async () => {
  await GetAllTodos();
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
    const { todoCreate } = postTodos();
    todoCreate(); 
    todos2.value.push(newTodo);
  }

  //Add function to add elements to existing array of todos
  // function addTodo() {
  //     //define the largest id in the todos array
  //     //as a starting point (when no todos are added to list) maxId = 0
  //     let maxId = 0; 
  
  //     if (todos.value.length !== 0) {
  //       maxId = Math.max(...todos.value.map((todo: TodoType) => todo.id));
  //     } 
      
  //     //add new todo element to list, position: maxId + 1
  //     const emptyTodo: TodoType = { 
  //       id: maxId + 1, 
  //       title: "Title", 
  //       description: "Todo Description",
  //       priority: "Medium",
  //       isChecked: false,
  //       isEditing: true,
  //       date: dateFormat(new Date())
  //     };
  
  //     todos.value.push(emptyTodo);
  
  //     saveTodosToLocalStorage();
  //   }
  
  //Delete function to remove elements from todos array
  // function deleteTodo(todo: TodoType) {
   
  //   const todoId = todo._id;
  //   const index = todos.value.findIndex((todo: { _id: ObjectId; }) => todo._id === todoId);
  //   if (index == -1) {
  //     return
  //   }
  
  //   todos.value.splice(index, 1);
  
  //   // Updating the todos array to trigger reactivity
  //   todos.value = todos.value.slice();
  
  //   isShowingModal.value = false;
  
  //   saveTodosToLocalStorage()
  // } 

  function deleteTodo(todo: TodoType) {
   const todoId = todo._id
   deleteTodos().todoDelete(todoId)

   // Remove the deleted todo from the todos array
   const index = todosToShow.value.findIndex((t: TodoType) => t._id === todoId);
    if (index !== -1) {
        todosToShow.value.splice(index, 1);
    }
 } 

  function toggleEditMode(todo: TodoType) {
    
    if(!todo.isEditing) {     
      todo.isEditing = !todo.isEditing;
      editTodosEditingMode().todoEdit(todo._id, todo.isEditing); 
    }
}


  function closeEditMode(todo: TodoType) {
    todo.isEditing = false;
    editTodosEditingMode().todoEdit(todo._id, todo.isEditing)
  }
  
  function toggleTodoCheckedState(todo: TodoType) {
    todo.isChecked = !todo.isChecked;
    moveToPosition(todo);
    editTodosCheck().todoEdit(todo._id, todo.isChecked)
  }
  
  function updatePriority(todo: TodoType, option: OptionsType) {
      const priority = option.name;
      todo.priority = option.name;
      editTodosPriority().todoEdit(todo._id, priority)
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
      editTodosTitle().todoEdit(todo._id, todoTitle);
      editTodosDescription().todoEdit(todo._id, todoDescription);
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