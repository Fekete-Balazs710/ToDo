<template>
    <button 
        class="p-3 btn btn-blue font-semibold rounded-xl
               w-28 font-primary transform sm:hover:scale-105 ease-out duration-300"
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
  switch (color) {
    case "green":
      buttonColor.value = "bg-[#38CB89] hover:bg-[#32aa74] text-white";
      break;
    case "red":
      buttonColor.value = "bg-red-400 hover:bg-red-500 text-white";
      break;
    case "gray":
      buttonColor.value = "bg-[#E6E6E6] hover:bg-[#c2c1c1] text-black";
      break;
    case "black":
      buttonColor.value = "bg-black hover:bg-[#2b2b2b] text-white";
      break;
    case "white":
    buttonColor.value = "text-black border-2 border-black";
    break;
  }

  return buttonColor.value;
}

</script>