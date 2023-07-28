<template> 
    <ConfirmDelete 
        v-if="isShowingModal" 
        :todo="todo"
        @deleteTodo="deleteTodo"
        @closeModal="closeModal"
    >
    </ConfirmDelete>
    <div class="container p-5 border-2 border-black rounded-2xl mt-8"
         @click="toggleEditMode(todo.id)"
    >
    <div class="flex sm:grid justify-between sm:justify-normal">
        <div class="sm:grid sm:grid-rows-1 sm:grid-flow-col gap-4 justify-between
                    flex items-center">
            <div class="col-span-1 sm:hidden">
                <TodoCheckbox 
                    v-if="!todo.isEditing" 
                    :todo="todo"
                    stroke="black"
                    @toggleTodoCheckedState="toggleTodoCheckedState"
                >
                </TodoCheckbox>
            </div>
            <div class="sm:row-span-3">
                <p
                    class="text-black font-primary lg:text-4xl text-3xl
                            font-semibold text-left"
                    :contenteditable="todo.isEditing"
                > 
                    {{ todo.title }}
                </p>
                <div class="flex items-center">
                    <DateIcon class="hidden sm:flex"></DateIcon>
                    <p
                        class="flex justify-start font-primary text-s font-normal
                            text-[#333] ml-1 mt-1"
                    >
                        {{ todo.date }}
                    </p>
                </div>
                
            </div>
            <div class="col-span-1 hidden sm:flex">
                <TodoPriority
                    :todo="todo"
                    @updatePriority="updatePriority"
                >
                </TodoPriority>
            </div>
        </div>

        <div class="sm:grid grid-rows-1 grid-flow-col gap-0 justify-between sm:mt-4 flex items-center">
            <div class="row-span-2 hidden sm:flex">
                <p class="font-primary font-semibold md:text-1xl text-left"
                   :class="todoDescriptionStyle"
                   :contenteditable="todo.isEditing"
                >
                    {{ todo.description }} 
                </p>
            </div>
            <div class="col-span-1 hidden sm:flex">
                <TodoCheckbox 
                    v-if="!todo.isEditing" 
                    :todo="todo"
                    stroke="black"
                    @toggleTodoCheckedState="toggleTodoCheckedState"
                >
                </TodoCheckbox>
            </div>
            <div class="col-span-1 sm:hidden">
                <TodoPriority
                    :todo="todo"
                    @updatePriority="updatePriority"
                >
                </TodoPriority>
            </div>
        </div>
    </div>
        <div v-if="todo.isEditing" class="flex items-start p-5">
            <div class="sm:hidden">
                <p class="font-primary font-medium text-left text-[#757575]"
                :contenteditable="todo.isEditing"
                >
                    {{ todo.description }} 
                </p>
            </div>
        </div>
        <div v-if="todo.isEditing" class="flex items-start p-5">
            <BaseButton
                button-title="Save"
                color="green"
                type="submit"
                @click.stop="closeEditMode(todo)"
            >
            </BaseButton>

            <BaseButton
                class="ml-3"
                button-title="Delete"
                color="gray"
                type="submit"
                @click="activateModal"
            >
            </BaseButton>
        </div>
        
    </div>
    
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';

import TodoPriority from './TodoPriority.vue';
import TodoCheckbox from './TodoCheckbox.vue';
import BaseButton from '../base-components/BaseButton.vue';
import DateIcon from '../icons/DateIcon.vue';
import ConfirmDelete from './ConfirmDelete.vue';

import { OptionsType } from '../../types/OptionsType'
import { TodoType } from '../../types/TodoType'

//Receive data from parent component
interface Props {
    todo: TodoType;
    isShowingModal: boolean;
}

const props = defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['toggleEditMode', 'toggleTodoCheckedState', 'removeTodo', 
                          'updatePriority', 'deleteTodo', 'closeEditMode'])

const todoDescriptionStyle = computed(() => {
    return {
        'text-black md:text-2xl': props.todo.isEditing,
        'text-[#757575] text-xl': !props.todo.isEditing,
    };
});

function toggleEditMode(id: number) {
    emit('toggleEditMode', id);
}

function toggleTodoCheckedState(todo: TodoType) {
  emit('toggleTodoCheckedState', todo)
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('updatePriority', todo, option)
}

const isShowingModal = ref<boolean>(false);

function activateModal() {
    isShowingModal.value = true;
}

function deleteTodo(todo: TodoType) {
    emit('deleteTodo', todo)
}

function closeModal() {
    isShowingModal.value = false;
}

function closeEditMode(todo: TodoType) {
    emit('closeEditMode', todo)
}

</script>