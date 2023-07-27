<template>
    <div class="container mx-auto text-center p-8 lg:w-[38rem]">
        <ul class="mt-5">
            <li v-for="todo in todos.slice().reverse()" :key="todo.id">
                <TodoListElement
                    :todo="todo"
                    :showingModal="showingModal"
                    @removeTodo="removeTodo"
                    @toggleEditMode="toggleEditMode"
                    @changeChecked="changeChecked"
                    @updatePriority="updatePriority"
                    @deleteTodo="deleteTodo"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import TodoListElement from './TodoListElement.vue';

import { TodoType } from '../types/TodoType'
import { OptionsType } from '../types/OptionsType'

//Receive data from parent component
interface Props {
    todos: TodoType[];
    showingModal: boolean;
}

defineProps<Props>()


//Add emit to modify data in parent component
const emit = defineEmits(['deleteTodo', 'toggleEditMode', 'allEditModeFalse', 
                          'changeChecked', 'removeTodo', 'updatePriority',
                          'deleteTodo'])

function toggleEditMode(todo: TodoType) {
    emit('toggleEditMode', todo)
}

function changeChecked(todo: TodoType) {
  emit('changeChecked', todo)
}

function removeTodo(todo: TodoType) {
    emit('removeTodo', todo);
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('updatePriority', todo, option)
}

function deleteTodo(todo: TodoType) {
    emit('deleteTodo', todo)
}

</script>