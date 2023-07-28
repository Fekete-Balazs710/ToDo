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
                    <DateIcon/>
                    <p
                        class="flex justify-start font-primary text-s font-normal
                            text-[#333] ml-1 mt-1"
                    >
                        {{ todo.date }}
                    </p>
                </div>
            </div>
            <div class="col-span-1">
                <TodoPriority
                    :todo="todo"
                    @updatePriority="updatePriority"
                >
                </TodoPriority>
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
                    v-if="!todo.isEditing" 
                    :todo="todo"
                    stroke="black"
                    @toggleTodoCheckedState="toggleTodoCheckedState"
                >
                </TodoCheckbox>
            </div>
        </div>

        <div class="flex items-start mt-5 " v-if="todo.isEditing">
            <BaseButton
                button-title="Save"
                color="green"
                type="submit"
                class=""
                @click.stop="closeEditMode(todo)"
            >
            </BaseButton>

            <BaseButton
                button-title="Delete"
                color="gray"
                type="submit"
                class="ml-3"
                @click="activateModal"
            >
            </BaseButton>
        </div>
        
    </div>
    
</template>

<script setup lang="ts">

import { ref } from 'vue';

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

defineProps<Props>()

//Add emit to modify data in parent component
const emit = defineEmits(['toggleEditMode', 'toggleTodoCheckedState', 'removeTodo', 
                          'updatePriority', 'deleteTodo', 'closeEditMode'])

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