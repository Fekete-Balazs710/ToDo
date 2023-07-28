<template>
    <div class="rounded-full text-white text-lg font-secondary
            font-semibold flex justify-center items-center
            sm:w-32 sm:h-9 border-0 w-5 h-5"
        :class="selectedColor"
        @click="toggleOptions"
    >
        <p
            class="hidden sm:flex"
        >
            {{ todo.priority }} 
        </p>   
    </div>

    <ul class=" text-black text-lg font-secondary
        font-semibold text-left p-3 rounded-2xl sm:mt-10 mt-1
        w-32 absolute z-50 bg-white border-2 border-black right-12 sm:right-auto"
        v-if="isShowingOptions"
        @click="toggleOptions" 
    >
        <li 
            class=""
            v-for="option in optionsObj" 
            @click="updatePriority(todo, option); updateColor(option)"
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
}

defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['UpdatePriority'])

//const selectedOption = ref("high");

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

const optionsObj: OptionsType[] = [
    {name: "High", value: "high"},
    {name: "Medium", value: "medium"},
    {name: "Low", value: "low"}
]

</script>