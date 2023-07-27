<template> 
    <ConfirmDelete 
        v-if="showingModal" 
        :todo="todo"
        @deleteTodo="deleteTodo"
        @closeModal="closeModal"
    />
    <div class="container p-5 border-2 border-black rounded-2xl mt-8"
         @click="toggleEditMode(todo)"
    >
        <div class="grid grid-rows-1 grid-flow-col gap-4 justify-between">
            <div class="row-span-3">
                <p
                    class="text-black font-primary lg:text-4xl text-3xl
                            font-semibold text-left"
                    :contenteditable="todo.isEditing"
                > 
                    {{ todo.title }}
                </p>
                <div class="flex items-center">
                    <DateSvg/>
                    <p
                        class="flex justify-start font-primary text-s font-normal
                            text-[#333] ml-1 mt-1"
                    >
                        
                        {{ todo.date }}
                    </p>
                </div>
            </div>
            <div class="col-span-1">
                <TodoPriority :todo="todo" @updatePriority="updatePriority"/>
            </div>
        </div>

        <div class="grid grid-rows-1 grid-flow-col gap-0 justify-between mt-4">
            <div class="row-span-2">
                <p class="font-primary font-semibold md:text-1xl text-left"
                   :class="{'text-black md:text-2xl text-lg': todo.isEditing,
                            'text-[#757575]': !todo.isEditing}"
                   :contenteditable="todo.isEditing"
                >
                    {{ todo.description }} 
                </p>
            </div>
            <div class="col-span-1">
                <TodoCheckbox 
                    v-if="!isEditing()" 
                    :todo="todo"
                    @changeChecked="changeChecked"/>
            </div>
        </div>

        <div class="flex items-start mt-5 " v-if="isEditing()">
            <TodoButton
                button-title="Save"
                color="green"
                type="submit"
                class=""
            >
            </TodoButton>

            <TodoButton
                button-title="Delete"
                color="gray"
                type="submit"
                class="ml-3"
                @click="activateModal"
            >
            </TodoButton>
        </div>
        
    </div>
    
</template>

<script setup lang="ts">

import TodoPriority from './TodoPriority.vue';
import TodoCheckbox from './TodoCheckbox.vue';
import TodoButton from './TodoButton.vue';
import DateSvg from './DateSvg.vue';
import ConfirmDelete from './ConfirmDelete.vue';

import { OptionsType } from '../types/OptionsType'

import { TodoType } from '../types/TodoType'

import { ref } from 'vue';

//Receive data from parent component
interface Props {
    todo: TodoType;
    showingModal: boolean;
}

const props = defineProps<Props>()

function isEditing() {
    return props.todo.isEditing
}

//Add emit to modify data in parent component
const emit = defineEmits(['toggleEditMode', 'changeChecked', 'removeTodo', 
                          'updatePriority', 'deleteTodo'])

function toggleEditMode(todo: TodoType) {
    emit('toggleEditMode', todo);
}

function changeChecked(todo: TodoType) {
  emit('changeChecked', todo)
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('updatePriority', todo, option)
}

const showingModal = ref<boolean>(false);

function activateModal() {
    showingModal.value = true;
}

function deleteTodo(todo: TodoType) {
    emit('deleteTodo', todo)
}

function closeModal() {
    showingModal.value = false;
}

</script>