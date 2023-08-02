<template>
    <div 
        class="rounded-full text-white text-lg font-secondary
                font-semibold justify-center items-center
                sm:w-32 sm:h-9 border-0 w-5 h-5 cursor-pointer hidden sm:flex"
        :class="priorityColor"
        @click="toggleOptions"
    >
        <p
            class="hidden sm:flex"
        >
            {{ todo.priority }} 
        </p>   
    </div>

    <div class="rounded-full text-white text-lg font-secondary
                font-semibold flex justify-center items-center ml-1
                sm:w-32 sm:h-9 border-0 w-5 h-5 cursor-pointer sm:hidden
                bg-[#38CBCB]"
                :class="{ 'border-2 border-black': priorityColor === 'bg-[#38CBCB]' }"
        @click="updatePriorityColor(todo, {name: 'Low', value: 'low'})"
    >
        <p
            class="hidden sm:flex"
        >
            {{ todo.priority }} 
        </p>   
    </div>

    <div class="rounded-full text-white text-lg font-secondary
                font-semibold flex justify-center items-center ml-2
                sm:w-32 sm:h-9 border-0 w-5 h-5 cursor-pointer sm:hidden
                bg-[#FFAB00]"
        :class="{ 'border-2 border-black': priorityColor === 'bg-[#FFAB00]' }"
        @click="updatePriorityColor(todo, {name: 'Medium', value: 'medium'})"
    >
        <p
            class="hidden sm:flex"
        >
            {{ todo.priority }} 
        </p>   
    </div>

    <div class="rounded-full text-white text-lg font-secondary
                font-semibold flex justify-center items-center ml-2
                sm:w-32 sm:h-9 border-0 w-5 h-5 cursor-pointer sm:hidden
                bg-[#FF481F]"
        :class="{ 'border-2 border-black': priorityColor === 'bg-[#FF481F]' }"
        @click="updatePriorityColor(todo, {name: 'High', value: 'high'})"
    >
        <p
            class="hidden sm:flex"
        >
            {{ todo.priority }} 
        </p>   
    </div>


    <ul 
        v-if="isShowingOptions"
        class="text-gray-600 text-lg font-secondary cursor-pointer
                 font-semibold text-left p-3 rounded-2xl sm:mt-10 mt-2 
                 w-32 absolute z-50 bg-white border-2 border-black right-12 sm:right-auto"
        @click="toggleOptions" 
    >
        <li 
            v-for="option in optionsObj"
            class="hover:text-xl hover:font-bold hover:text-black"
            @click="updatePriorityColor(todo, option)"
        >
                {{ option.name }}
        </li>
    </ul> 
    
</template>

<script setup lang="ts">

import { ref } from "vue";

import { OptionsType } from '../../types/OptionsType'
import { ColormapType } from '../../types/ColormapType'
import { TodoType } from '../../types/TodoType'

//Receive data from parent component
interface Props {
    todo: TodoType;
    priorityColor: string
}

defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['UpdatePriority'])

const selectedColor = ref("bg-[#FF481F]");


const isShowingOptions = ref(false);

const colorMap: ColormapType = {
  "High": 'bg-[#FF481F]' as const,
  "Medium": 'bg-[#FFAB00]' as const,
  "Low": 'bg-[#38CBCB]' as const
};

function updateColor(option: OptionsType) {
  selectedColor.value = colorMap[option.name];
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('UpdatePriority', todo, option)
}

function toggleOptions() {
  isShowingOptions.value = !isShowingOptions.value; 
}

function updatePriorityColor(todo: TodoType, option: OptionsType) {
    updatePriority(todo, option); 
    updateColor(option)
}

const optionsObj: OptionsType[] = [
    {name: "High", value: "high"},
    {name: "Medium", value: "medium"},
    {name: "Low", value: "low"}
]

</script>