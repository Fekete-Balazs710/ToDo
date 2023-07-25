<template>
    <div class="container mx-auto text-center p-8 flex justify-between w-[40rem]">
        
        <h1 class="text-7xl font-primary font-semibold text-black">
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
    emit('addTodo', 'Test value');
}

</script>