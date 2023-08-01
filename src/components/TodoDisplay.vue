<template>
    <div class="container mx-auto text-center p-8 lg:w-[38rem]">
        <ul class="mt-5">
            <li v-for="todo in reversedTodos" :key="todo.id">
                <TodoElement
                    :todo="todo"
                    :isShowingModal="isShowingModal"
                    @removeTodo="removeTodo"
                    @toggleEditMode="toggleEditMode"
                    @toggleTodoCheckedState="toggleTodoCheckedState"
                    @updatePriority="updatePriority"
                    @deleteTodo="deleteTodo"
                    @closeEditMode="closeEditMode"
                    @moveToPosition="moveToPosition"
                    @saveTodo="saveTodo"
                >
                </TodoElement>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

import TodoElement from './todo/TodoElement.vue';

import { TodoType } from '../types/TodoType'
import { OptionsType } from '../types/OptionsType'

//Receive data from parent component
interface Props {
    todos: TodoType[];
    isShowingModal: boolean;
}

const props = defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['deleteTodo', 'toggleEditMode', 'allEditModeFalse', 
                          'toggleTodoCheckedState', 'removeTodo', 'updatePriority',
                          'deleteTodo', 'closeEditMode', 'moveToPosition', 'saveTodo'])

const reversedTodos = computed(() => props.todos.slice().reverse());

function toggleEditMode(id: number) {
    emit('toggleEditMode', id)
}

function toggleTodoCheckedState(todo: TodoType) {
  emit('toggleTodoCheckedState', todo)
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

function closeEditMode(todo: TodoType) {
    emit('closeEditMode', todo)
}

function moveToPosition(todo: TodoType) {
    emit('moveToPosition', todo)
}

function saveTodo(todo: TodoType, todoTitle: string, todoDescription: string) {
    emit('saveTodo', todo, todoTitle, todoDescription)
}

</script>