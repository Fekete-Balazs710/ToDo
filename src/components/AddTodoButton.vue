<template>
    <div class="relative flex items-center" @click="todoCreate()">
        <div class="absolute w-full h-full flex items-center justify-center shrink-0">
            <PlusSvg />
        </div>
        <CircleSvg />
    </div>
</template>

<script setup lang="ts">

//Import the svg components
import PlusSvg from './PlusSvg.vue'
import CircleSvg from './CircleSvg.vue'

//Add emit to modify data in parent component
const emit = defineEmits(['addTodo'])

function todoCreate() {
    emit('addTodo', 'Title');
}

</script>