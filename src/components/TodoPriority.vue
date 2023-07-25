<template>
    <select 
        class="rounded-full text-white text-lg font-secondary
            font-semibold text-center
            w-32 appearance-none border-0 px-0 bg-none"
        :class="selectedColor"
        @change="updateColor"
        v-model="selectedOption"        
    >
            <option 
                value="high"
                class="bg-white text-black"
            >High</option>

            <option 
                value="medium"
                class="bg-white text-black"
            >Medium</option>

            <option 
                value="low"
                class="bg-white text-black"
            >Low</option>
    </select>
</template>

<script setup lang="ts">

import { ref } from "vue";

const selectedOption = ref("high");
const selectedColor = ref("bg-[#FF481F]");

const updateColor = () => {
  switch (selectedOption.value) {
    case "high":
      selectedColor.value = "bg-[#FF481F]";
      break;
    case "medium":
      selectedColor.value = "bg-[#FFAB00]";
      break;
    case "low":
      selectedColor.value = "bg-[#38CBCB]";
      break;
  }
};
</script>