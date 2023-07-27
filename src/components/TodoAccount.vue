<template>
    <div
        class="container mx-auto text-center p-8 flex justify-between
               items-center lg:w-[40rem] w-min-[20rem] border-b-2 border-[#E5E5E5]"
    >
        <p class="text-left text-base font-medium">
            Welcome <br> {{ username }}
        </p>
        <TodoButton :buttonTitle="'Logout'" :color="'gray'"></TodoButton>
    </div>
</template>

<script setup lang="ts">

import TodoButton from './TodoButton.vue';

//Receive data from parent component
interface Props {
    username: string;
}

defineProps<Props>()

</script>