<template>
    <div 
        class="relative flex items-center cursor-pointer 
               hover:scale-110 ease-out duration-300" 
        @click="todoCreate()"
    >
        <div class="absolute w-full h-full flex items-center justify-center shrink-0">
            <PlusIcon />
        </div>
        <CircleIcon />
    </div>
</template>

<script setup lang="ts">

//Import the svg components
import PlusIcon from './icons/PlusIcon.vue'
import CircleIcon from './icons/CircleIcon.vue'

//Add emit to modify data in parent component
const emit = defineEmits(['addTodo'])

function todoCreate() {
    emit('addTodo');
}

</script>