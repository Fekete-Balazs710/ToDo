<template> 
    <div class="container p-5 border-2 border-black rounded-2xl mt-8">
        <div class="flex justify-between ">
            <p
                class="text-black font-primary lg:text-4xl text-3xl font-semibold"
            >{{ todos.title }}</p>
            
            <TodoPriority />

        </div>
        <div class="flex justify-between mt-10">
            <p class="font-primary font-semibold text-[#757575] md:text-2xl text-base">
            Todo Description {{ todos.id }}</p>

            <TodoCheckbox />
        </div>
        
    </div>
    
</template>

<script setup lang="ts">

import TodoPriority from './TodoPriority.vue';
import TodoCheckbox from './TodoCheckbox.vue';

import { TodoType } from '../types/TodoType'

//Receive data from parent component
interface Props {
    todos: TodoType;
}

defineProps<Props>()

</script>