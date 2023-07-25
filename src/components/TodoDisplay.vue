<template>
    <div class="container mx-auto text-center p-8 lg:w-[38rem]">
        <ul class="mt-5">
            <li v-for="todo in todos" :key="todo.id">
                <TodoListElement
                    :todoTitle="todo.text"
                    :todoId="todo.id"
                    @deleteTodo="removeTodo"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import TodoListElement from './TodoListElement.vue';

//Receive data from parent component
defineProps(['todos']);


//Add emit to modify data in parent component
const emit = defineEmits(['deleteTodo'])

function removeTodo(todoId: number) {
    emit('deleteTodo', todoId);
}

</script>