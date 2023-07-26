<template>
    <div class="container mx-auto text-center p-8 lg:w-[38rem]">
        <ul class="mt-5">
            <li v-for="todo in todos.slice().reverse()" :key="todo.id">
                <TodoListElement
                    :todo="todo"
                    @deleteTodo="removeTodo"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import TodoListElement from './TodoListElement.vue';

import { TodoType } from '../types/TodoType'

//Receive data from parent component
interface Props {
    todos: TodoType[];
}

defineProps<Props>()


//Add emit to modify data in parent component
const emit = defineEmits(['deleteTodo'])

function removeTodo(todoId: number) {
    emit('deleteTodo', todoId);
}

</script>