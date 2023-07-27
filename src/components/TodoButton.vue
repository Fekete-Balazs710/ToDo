<template>
    <button 
        class="p-3 btn btn-blue font-semibold rounded-2xl
               w-28 font-primary"
        :class="{'bg-[#38CB89] hover:bg-[#32aa74] text-white': color === 'green',
                 'bg-red-400 hover:bg-red-500 text-white': color === 'red',
                 'bg-[#E6E6E6] hover:bg-[#c2c1c1] text-black': color === 'gray'}">
        {{ buttonTitle }}
    </button>
</template>

<script setup lang="ts">

interface Props {
  buttonTitle: string
  color: string
}

defineProps<Props>()

</script>