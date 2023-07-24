<template>
  <div class="container mx-auto text-center p-8">
    <h1 class="text-3xl font-bold">ToDo App</h1>
    <p>Manage your daily activity</p>
    <form class="my-8" @submit.prevent="addTodo()">
        <input type="text"
               placeholder="Add todo element..."
               class="p-5 shadow border rounded px-3"
               v-model="inputValue"
               required/>
        <br>
        <button type="submit" class="mt-5 bg-blue-500 hover:bg-blue-700 p-3 btn btn-blue text-white font-bold rounded-full">Add to list</button>
    </form>

    <button class="bg-blue-400 hover:bg-blue-500 py-3 px-5 btn btn-blue text-white font-bold rounded-full" @click="clearTodo()">Clear</button>

    <ul class="mt-5">
        <li v-for="todo in todos" :key="todo" class="p-5 shadow border rounded mt-3 flex justify-between">
            {{ todo }}
            <button
                class="btn bg-red-400 hover:bg-red-600 px-2 text-white font-bold rounded-md"
                @click="removeTodo(todo)"
            >x</button>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Array of strings for the todo list elements
let todos = ref<string[]>([
  'Buy groceries',
  'Clean the house',
  'Finish the report',
  'Go for a walk',
  'Call a friend',
]);

let inputValue = ref('');

//Add function to add elements to existing array of todos
function addTodo() {
  if (inputValue.value) {
    todos.value.push(inputValue.value);
    inputValue.value = ''; // Clear the input field
  }
}

//Delete function to remove elements from todos array
function removeTodo(todo: string) {
  const index = todos.value.indexOf(todo);
  if (index !== -1) {
    todos.value.splice(index, 1);

    // Updating the todos array to trigger reactivity
    todos.value = todos.value.slice();
  }
}

//Clear function to remove all elements from todos array
function clearTodo() {
    todos.value = [];
}   

</script>
