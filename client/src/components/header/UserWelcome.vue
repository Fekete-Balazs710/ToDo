<template>
    <div class="p-8">
        <div
            class="container mx-auto text-center p-2 pb-8 flex justify-between
                items-center lg:w-[40rem] w-min-[20rem] border-b-2 border-[#E5E5E5]"
        >
            <p class="text-left text-base font-medium">
                Welcome <br>{{ firstName }} {{ lastName }}
            </p>
            <BaseButton 
                buttonTitle="Logout" 
                color="gray"
                @click="handleLogout(userId)"
            >
            </BaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">

import BaseButton from '../base-components/BaseButton.vue';
import router from '../../router/router';
import todoService from '../../service/todoService';
import { useRoute } from 'vue-router';

//Receive data from parent component
interface Props {
    firstName: string;
    lastName: string;
}

defineProps<Props>()

const route = useRoute();
const userId = route.params.userId.toString(); 

function handleLogout(userId: string) {
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    todoService.deleteFromWhitelist(userId);
    router.push('/login')
}

</script>