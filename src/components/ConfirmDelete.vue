<template>
    <div
        class="fixed z-50 bg-black top-0 left-0 w-full h-full bg-opacity-70"
    >
        <div class="w-96 p-8 bg-white mt-[100px] mx-auto rounded-2xl">
            <p class="text-black font-primary font-bold text-3xl">
                Are you sure you want to delete this item?
            </p>
            <p class="font-primary text-gray-600 mt-3 text-lg">
                This operation is permanent and you will not be able to undo this action.
            </p>
            <div class="mt-10">
                <TodoButton 
                    :button-title="'Delete'" 
                    :color="'red'"
                    @click="deleteTodo(todo)"
                />
                <TodoButton 
                    :button-title="'Cancel'" 
                    :color="'gray'"
                    class="ml-3"
                    @click="closeModal()"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { TodoType } from '../types/TodoType';
import TodoButton from './TodoButton.vue';


//Receive data from parent component
interface Props {
    todo: TodoType;
}

defineProps<Props>()

const emit = defineEmits(['handleModal', 'closeModal', 'deleteTodo'])

function deleteTodo(todo: TodoType) {
    emit('deleteTodo', todo)
}

function closeModal() {
    emit('closeModal')
}

</script>