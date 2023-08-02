<template>
    <div 
        class="relative flex items-center cursor-pointer transform hover:scale-105 ease-out duration-300" 
    >
        <div class="absolute w-full h-full flex items-center justify-center">
            <UpArrowIcon />
        </div>
        <button 
        class="p-3 btn font-semibold rounded-xl bg-[#38CB89] w-11 h-11"
        >
        </button>
    </div>
</template>

<script setup lang="ts">

//Import the svg components
import UpArrowIcon from './icons/UpArrowIcon.vue';

</script>