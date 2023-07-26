<template> 
    <div class="container p-5 border-2 border-black rounded-2xl mt-8"
         @dblclick="toggleEditMode(todo)"
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
                <TodoPriority />
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
        
        

        <div class="flex items-start" v-if="isEditing()">
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
                @click="removeTodo(todo)"
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

import { TodoType } from '../types/TodoType'

//Receive data from parent component
interface Props {
    todo: TodoType;
}

const props = defineProps<Props>()

function isEditing() {
    return props.todo.isEditing
}

//Add emit to modify data in parent component
const emit = defineEmits(['toggleEditMode', 'changeChecked', 'removeTodo'])

function toggleEditMode(todo: TodoType) {
    emit('toggleEditMode', todo);
}

function changeChecked(todo: TodoType) {
  emit('changeChecked', todo)
}

function removeTodo(todo: TodoType) {
    emit('removeTodo', todo);
}

</script>