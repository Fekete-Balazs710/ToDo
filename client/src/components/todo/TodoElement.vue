<template> 
    <ConfirmDelete 
        v-if="isShowingModal" 
        :todo="todo"
        @closeModal="closeModal"
        @deleteTodo="deleteTodo"
    >
    </ConfirmDelete>
    
    <div class="container p-5 border-2 border-black rounded-2xl mt-8
                transform hover:scale-105 ease-out duration-300 bg-white"
         @click="toggleEditMode(todo)" 
         v-on-click-outside="onClickOutsideHandler"
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
                    @moveToPosition="moveToPosition"
                >
                </TodoCheckbox>
            </div>
            <div class="sm:row-span-3">
                <p
                    ref="newTitle"
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
                        {{ formatDate(todo.date) }}
                    </p>
                </div>
                
            </div>
            <div class="col-span-1 hidden sm:flex">
                <TodoPriority
                    :todo="todo"
                    :priorityColor="priorityColor"
                    @updatePriority="updatePriority"
                >
                </TodoPriority>
            </div>
        </div>

        <div class="sm:grid grid-rows-1 grid-flow-col gap-0 justify-between sm:mt-4 flex items-center">
            <div class="row-span-2 hidden sm:flex">
                <p 
                   ref="newDescriptionDesktop"
                   class="font-primary font-semibold md:text-1xl text-left"
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
                    @moveToPosition="moveToPosition"
                >
                </TodoCheckbox>
            </div>
            <div class="col-span-1 sm:hidden flex">
                <TodoPriority
                    :todo="todo"
                    :priorityColor="priorityColor"
                    @updatePriority="updatePriority"
                >
                </TodoPriority>
            </div>
        </div>
    </div>
        <div v-if="todo.isEditing" class="flex items-start p-5">
            <div class="sm:hidden">
                <p 
                    ref="newDescriptionMobile"
                    class="font-primary font-medium text-left text-[#757575]"
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
                @click.stop="saveTodo(todo)"
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
import { vOnClickOutside } from '@vueuse/components'

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
}

const props = defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['toggleEditMode', 'toggleTodoCheckedState', 'removeTodo', 
                          'updatePriority', 'deleteTodo', 'closeEditMode', 'moveToPosition',
                          'saveTodo'])

const isShowingModal = ref(false);

const todoDescriptionStyle = computed(() => props.todo.isEditing ? 'text-black md:text-2xl' : 'text-[#757575] text-xl');

const priorityColor = computed(() => {
    if(props.todo.priority === "High") {
        return "bg-[#FF481F]"
    } else if(props.todo.priority === "Medium") {
        return "bg-[#FFAB00]"
    } else return "bg-[#38CBCB]"
})

function toggleEditMode(todo: TodoType) {
    emit('toggleEditMode', todo); 
}

function toggleTodoCheckedState(todo: TodoType) {
  emit('toggleTodoCheckedState', todo)
}

function updatePriority(todo: TodoType, option: OptionsType) {
    emit('updatePriority', todo, option)
}

function activateModal() {
    isShowingModal.value = true;
}

function deleteTodo(todo: TodoType) {
    isShowingModal.value = false;
    emit('deleteTodo', todo)
}

function closeModal() {
    isShowingModal.value = false;
}

const newTitle = ref<HTMLElement | null>(null);
const newDescriptionMobile = ref<HTMLElement | null>(null);
const newDescriptionDesktop = ref<HTMLElement | null>(null);

function formatDate(date: string | Date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

function saveTodo(todo: TodoType) {

    const updatedTitle = newTitle.value?.innerHTML || ''
    let updatedDescription = '';

    updatedDescription = newDescriptionDesktop.value?.innerHTML || newDescriptionMobile.value?.innerHTML || ''

    emit('saveTodo', todo, updatedTitle, updatedDescription, todo.priority)
    emit('closeEditMode', todo)
}

function moveToPosition(todo: TodoType) {
    emit('moveToPosition', todo)
}

function onClickOutsideHandler() {
    emit('closeEditMode', props.todo)
}

</script>