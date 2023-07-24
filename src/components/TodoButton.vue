<template>
    <button 
        class="mt-5 p-3 btn btn-blue text-white font-bold rounded-full"
        :class="{'bg-green-400 hover:bg-green-500 ': color === 'green',
                 'bg-red-400 hover:bg-red-500': color === 'red'}">
        {{ buttonTitle }}
    </button>
</template>

<script setup lang="ts">

defineProps(['buttonTitle', 'color']);

</script>