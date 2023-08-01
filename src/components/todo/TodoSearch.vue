<template>
    <div class="container mx-auto text-center p-8 lg:w-[38rem]">
        <div class="container p-3 border-2 border-black rounded-2xl
                    flex items-center justify-between">
            <div class="flex justify-start items-center text-center">
                <SearchIcon/>
                <input 
                    v-model="search"
                    class="lg:text-xl sm:text-lg font-primary font-semibold
                             text-[#4F4F4F] ml-3 border-0 sm:w-[22rem] w-[10rem]
                             shadow-none shadow-transparent"
                    type="text"
                    placeholder="Search todos..."
                    @input="onFilterTodos(search)"
                > 
            </div>   
            
            <BaseButton 
                class="scale-[0.85]"
                type="submit"
                button-title="Search"
                color="black"
                @click="onFilterTodos(search)"
            />

        </div>
    </div>
    
</template>

<script setup lang="ts">

import { TodoType } from '../../types/TodoType';
import SearchIcon from '../icons//SearchIcon.vue'
import BaseButton from '../base-components/BaseButton.vue';

interface Props {
  todos: TodoType[]
}

//Add emit to modify data in parent component
const emit = defineEmits(['onFilterTodos'])

defineProps<Props>()

const search = "";

function onFilterTodos(search: string) {
    emit('onFilterTodos', search)
}

</script>
