<template>
    <div class="rounded-full text-white text-lg font-secondary
            font-semibold h-9 flex justify-center items-center
            w-32 border-0"
        :class="selectedColor"
        @click="toggleOptions"
    >
        {{ todo.priority }}    
    </div>
    
        <ul class=" text-black text-lg font-secondary
            font-semibold text-left p-3 rounded-2xl mt-2
            w-32 absolute z-50 bg-white border-2 border-black"
            v-if="showingOptions"
            @click="toggleOptions" 
        >
            <li v-for="option in optionsObj" @click="updatePriority(todo, option); updateColor(option)">
                {{ option.name }}
            </li>
        </ul> 
    
</template>

<script setup lang="ts">

import { ref } from "vue";
import { OptionsType } from '../types/OptionsType'
import { ColormapType } from '../types/ColormapType'

import { TodoType } from '../types/TodoType'

//Receive data from parent component
interface Props {
    todo: TodoType;
}

defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['UpdatePriority'])

//const selectedOption = ref("high");

const selectedColor = ref("bg-[#FF481F]");

const showingOptions = ref(false);

const colorMap: ColormapType = {
  "High": 'bg-[#FF481F]' as const,
  "Medium": 'bg-[#FFAB00]' as const,
  "Low": 'bg-[#38CBCB]' as const
};

function updateColor(option: OptionsType) {
  selectedColor.value = colorMap[option.name];
  console.log('Color updated with: ' , selectedColor.value)
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('UpdatePriority', todo, option)
    // updateColor(option)
}

function toggleOptions() {
  showingOptions.value = !showingOptions.value; 
}

const optionsObj: OptionsType[] = [
    {name: "High", value: "high"},
    {name: "Medium", value: "medium"},
    {name: "Low", value: "low"}
]

</script>