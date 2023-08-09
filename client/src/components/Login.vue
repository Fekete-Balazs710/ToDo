<template>
   <div class="w-screen h-screen bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8 font-primary">
                    <h1 class="text-xl font-bold text-gray-900 md:text-3xl">
                        Log in
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label 
                                for="email" 
                                class="block mb-2 text-lg font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                        focus:border-primary-600 block w-full p-3" 
                                placeholder="name@company.com" 
                                required
                            >
                        </div>
                        <div>
                            <label 
                                for="password" 
                                class="block mb-2 text-lg font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                         focus:border-primary-600 block w-full p-3" 
                                required
                            >
                        </div>
                        <BaseButton type="submit" class="w-full" button-title="Log in" color="black"></BaseButton>
                        
                        <p class="text-lg text-gray-500">
                            Don’t have an account yet? <a href="/signup" class="font-semibold hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import BaseButton from './base-components/BaseButton.vue';

</script>