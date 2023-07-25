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
                v-for="option in OptionsObj" 
                :value="option.value"
                class="bg-white text-black"
            >
                {{ option.name }}
            </option>
            
    </select>
</template>

<script setup lang="ts">

import { ref } from "vue";

const selectedOption = ref("high");
const selectedColor = ref("bg-[#FF481F]");

const updateColor = () => {
  selectedColor.value = colorMap[selectedOption.value];
};

interface OptionsType {
    name: string,
    value: string
}

const colorMap: { [key: string]: string } = {
    "high": 'bg-[#FF481F]',
    "medium": 'bg-[#FFAB00]',
    "low": 'bg-[#38CBCB]'
}

const OptionsObj: OptionsType[] = [
    {name: "High", value: "high"},
    {name: "Medium", value: "medium"},
    {name: "Low", value: "low"}
]

</script>