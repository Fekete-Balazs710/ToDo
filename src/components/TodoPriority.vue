<template>
    <select 
        class="rounded-full text-white text-lg font-secondary
            font-semibold text-center
            w-32 appearance-none border-0 px-0 bg-none"
        v-model="selectedOption" 
        :class="selectedColor"
        @change="updateColor()"       
    >
            <option 
                v-for="option in optionsObj" 
                :value="option.value"
                class="bg-white text-black"
            >
                {{ option.name }}
            </option>
            
    </select>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { OptionsType } from '../types/OptionsType'
import { ColormapType } from '../types/ColormapType'


const selectedOption = ref("high");
const selectedColor = ref("bg-[#FF481F]");

const colorMap: ColormapType = {
  "high": '#FF481F',
  "medium": '#FFAB00',
  "low": '#38CBCB'
};

function updateColor() {
  selectedColor.value = 'bg-' + '[' + colorMap[selectedOption.value] + ']';
  console.log(selectedColor.value)
  console.log(colorMap[selectedColor.value])
}

const optionsObj: OptionsType[] = [
    {name: "High", value: "high"},
    {name: "Medium", value: "medium"},
    {name: "Low", value: "low"}
]

</script>