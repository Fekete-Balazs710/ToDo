<template>
    <UserWelcome 
        username="Kovacs Roland"
    >
    </UserWelcome>

    <div class="container mx-auto text-center p-8 flex items-center justify-between lg:w-[40rem] w-min-[20rem]">

        <h1 class="lg:text-7xl sm:text-6xl text-4xl font-primary font-semibold text-black">
            To do list
        </h1>

        <AddTodoButton @addTodo="todoCreate"></AddTodoButton>

    </div>

    <TodoSearch 
        v-if="todos.length" 
        :todos="todos" 
        @onFilterTodos="onFilterTodos"
    >
    </TodoSearch>

    <TodoSort
        v-if="todos.length"
        :todos="todos"
        :whichArrow="whichArrow"
        @sortTodos="sortTodos"
        @reverseTodos="reverseTodos"
    >
    </TodoSort>

</template>

<script setup lang="ts">

import { ref } from 'vue';

import AddTodoButton from '../AddTodoButton.vue'
import UserWelcome from './UserWelcome.vue';
import TodoSearch from '../todo/TodoSearch.vue';
import TodoSort from '../todo/TodoSort.vue';

import { TodoType } from '../../types/TodoType';

interface Props {
  todos: TodoType[]
}

defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['addTodo', 'onFilterTodos', 'sortTodos', 'reverseTodos'])

const whichArrow = ref('up')

function todoCreate() {
    emit('addTodo');
}

function onFilterTodos(todos: TodoType[], search: string) {
    emit('onFilterTodos', todos, search)
}

function sortTodos(attribute: string) {
    emit('sortTodos', attribute)
}

function reverseTodos() {
    emit('reverseTodos')
    if(whichArrow.value === "down")
    {
        whichArrow.value = "up"
    } else {
        whichArrow.value = "down"
    }
    
}

</script>