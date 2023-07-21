<template>
    <h1>ToDo App</h1>
    <p>Manage your daily activity</p>
    <form class="inputForm" @submit.prevent="addTodo()">
        <input type="text"
               placeholder="Add todo element..."
               class="inputField"
               v-model="inputValue"
               required/>
        <br>
        <button type="submit" class="formButton">Add to list</button>
    </form>

    <button class="clearButton" @click="clearTodo()">Clear</button>

    <ul class="todoList">
        <li v-for="todo in todos" :key="todo" class="todoListElement">
            {{ todo }}
            <button
                class="deleteButton"
                @click="removeTodo(todo)"
            >x</button>
        </li>
    </ul>
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
function addTodo(): void {
  if (inputValue.value) {
    todos.value.push(inputValue.value);
    inputValue.value = ''; // Clear the input field
  }
}

//Delete function to remove elements from todos array
function removeTodo(todo: string): void {
  const index = todos.value.indexOf(todo);
  if (index !== -1) {
    todos.value.splice(index, 1);
    
    // Updating the todos array to trigger reactivity
    todos.value = todos.value.slice();
  }
}

//Clear function to remove all elements from todos array
function clearTodo(): void {
    todos.value.splice(0, todos.value.length);
}   

</script>

<style>
.todoListElement {
    list-style: none;
    padding: 1rem;
    background-color: rgb(237, 237, 237);
    margin-top: 0.5rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20rem;
}

.todoList {
    margin: auto;
    padding: 2rem;
}

.inputForm {
    padding: 2rem;
}

.inputField {
    height: 2rem;
    padding: 1rem;
    width: 14rem;
    border-radius: 0.5rem;
}

.formButton {
    padding: 1rem;
    margin-top: 1rem;
}

.clearButton {
    padding: 1rem;
}

.deleteButton {
    background-color: #DC4C64;
    color: white;
    padding: 0.5rem;
    border-radius: 0.3rem;
}
</style>