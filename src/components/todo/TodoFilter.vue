<template>
   <div class="container mx-auto sm:text-center p-7 lg:w-[38rem] -mt-8 -mb-10">
        <div class="container sm:flex items-center justify-between">
            <div class="sm:flex justify-start items-center sm:text-center">
                <BaseButton 
                    class="scale-[0.85] w-20"
                    button-title="Title"
                    color="green"
                    @click="sortByTitle"
                >
                </BaseButton>
                <BaseButton 
                    class="scale-[0.85] w-28"
                    button-title="Description"
                    color="black"
                >
                </BaseButton>
                <BaseButton 
                    class="scale-[0.85] w-20"
                    button-title="Priority"
                    color="white"
                >
                </BaseButton>
                <BaseButton 
                    button-title="Date"
                    color="white"
                    class="scale-[0.85] w-16"
                >
                </BaseButton>

            </div>   
            
            <div class="flex sm:justify-end justify-start items-center text-center mt-3 sm:mt-0">
                <BaseButton 
                    button-title="↑"
                    color="green"
                    class="scale-[0.85] w-11"
                >
                </BaseButton>
                <BaseButton 
                    button-title="↓"
                    color="black"
                    class="scale-[0.85] w-11"
                >
                </BaseButton>
            </div> 
        </div>
    </div>
</template>

<script setup lang="ts">

import BaseButton from '../base-components/BaseButton.vue';

import { TodoType } from '../../types/TodoType';

interface Props {
  todos: TodoType[]
}

defineProps<Props>()

const emit = defineEmits(['sortByTitle'])

function sortByTitle() {
    emit('sortByTitle')
}

</script>
