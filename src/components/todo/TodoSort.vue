<template>
   <div class="container mx-auto sm:text-center sm:p-10 p-5 lg:w-[38rem] -mt-8 -mb-10">
        <div class="container sm:flex items-center justify-between">
            <div class="sm:flex justify-start items-center sm:text-center">
                <BaseButton 
                    class="sm:scale-[0.85] w-[6rem] sm:-ml-2 scale-[0.7] ml-2"
                    button-title="Title"
                    color="green"
                    @click="sortTodos('title')"
                >
                </BaseButton>
                <BaseButton 
                    class="sm:scale-[0.85] w-[7rem] scale-[0.7] -ml-4 sm:ml-0"
                    button-title="Description"
                    color="black"
                    @click="sortTodos('description')"
                >
                </BaseButton>
                <BaseButton 
                    class="sm:scale-[0.85] w-[6rem] scale-[0.7] -ml-4 sm:ml-0"
                    button-title="Priority"
                    color="white"
                    @click="sortTodos('priority')"
                >
                </BaseButton>
                <BaseButton 
                    button-title="Date"
                    color="white"
                    class="sm:scale-[0.85] w-[5rem] scale-[0.7] -ml-4 sm:ml-0"
                    @click="sortTodos('date')"
                >
                </BaseButton>

            </div>   
            
            <div class="flex sm:justify-end justify-start items-center text-center mt-3 sm:mt-0">
                <UpArrowButton
                    class="ml-5 sm:ml-2"
                    @click="reverseTodos"
                >
                </UpArrowButton>
                <DownArrowButton
                    class="ml-2"
                    @click="reverseTodos"
                >
                </DownArrowButton>

            </div> 
        </div>
    </div>
    
</template>

<script setup lang="ts">

import BaseButton from '../base-components/BaseButton.vue';
import UpArrowButton from '../UpArrowButton.vue';
import DownArrowButton from '../DownArrowButton.vue';

import { TodoType } from '../../types/TodoType';

interface Props {
  todos: TodoType[]
}

defineProps<Props>()

const emit = defineEmits(['sortTodos', 'reverseTodos'])

function sortTodos(attribute: string) {
    emit('sortTodos', attribute)
}

function reverseTodos() {
    emit('reverseTodos')
}

</script>
