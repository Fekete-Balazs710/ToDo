<template>
    <button 
        class="p-3 btn btn-blue font-semibold rounded-2xl
               w-28 font-primary transform hover:scale-105 ease-out duration-300"
        :class="addButtonColor(color)">
        {{ buttonTitle }}
    </button>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface Props {
  buttonTitle: string
  color: string
}

defineProps<Props>()

const buttonColor = ref<string>("");;

function addButtonColor(color: string) {

  if(color === "green") {
    buttonColor.value = "bg-[#38CB89] hover:bg-[#32aa74] text-white" 
  } else if(color === "red") {
    buttonColor.value = "bg-red-400 hover:bg-red-500 text-white"
  } else {
    buttonColor.value = "bg-[#E6E6E6] hover:bg-[#c2c1c1] text-black"
  }
  
  return buttonColor.value
}

</script>