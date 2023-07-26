<template>
    <div class="container mx-auto text-center p-8 flex items-center justify-between lg:w-[40rem] w-min-[20rem]">
        
        <h1 class="lg:text-7xl sm:text-6xl text-4xl font-primary font-semibold text-black">
            To do list
        </h1>

        <AddTodoButton @addTodo="todoCreate"/>

    </div>
</template>

<script setup lang="ts">

import AddTodoButton from './AddTodoButton.vue'

//Add emit to modify data in parent component
const emit = defineEmits(['addTodo'])

function todoCreate() {
    emit('addTodo');
}

</script>