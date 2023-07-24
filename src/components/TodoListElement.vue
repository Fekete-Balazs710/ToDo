<template> 
    <div class="p-5 shadow border rounded mt-3 flex justify-between">
        <p>{{ props.todoTitle }}</p>
        <button
            class="btn bg-red-400 hover:bg-red-600 px-2 text-white font-bold rounded-md"
            @click="removeTodo(todoId)"
        >x</button>
    </div>
</template>

<script setup lang="ts">

//Receive data from parent component
const props = defineProps(['todoTitle', 'todoId']);

//Add emit to modify data in parent component
const emit = defineEmits(['deleteTodo'])

function removeTodo(todoId: number) {
    emit('deleteTodo', todoId);
}

</script>