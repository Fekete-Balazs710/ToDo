<template>
    <div class="w-screen h-screen bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300">
         <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="lg:flex items-start justify-center w-[45rem] mr-[64rem] absolute text-center rotate-[-90deg] hidden">
                <p class="text-white font-primary font-extrabold text-9xl opacity-20 mb-2 drop-shadow-2xl">To Do App</p>
            </div> 
            <div class="lg:flex lg:w-[60rem] w-full flex justify-center">
            <div class="lg:w-[30rem] w-full backdrop-blur-lg bg-white/70 rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                 <div class="p-6 space-y-4 md:space-y-6 sm:p-8 font-primary">
                     <h1 class="text-xl font-bold text-gray-900 md:text-3xl">
                         Sign up
                     </h1>
                     <form class="space-y-4 md:space-y-6" @submit.prevent="createUser">
                        <div>
                             <label 
                                 for="firstName" 
                                 class="block mb-2 text-lg font-medium text-gray-900"
                             >
                                 First Name
                             </label>
                             <input 
                                 v-model="firstName"
                                 type="text" 
                                 name="firstName" 
                                 id="firstName" 
                                 class="bg-transparent border-gray-600 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600
                                         focus:border-primary-600 block w-full p-3" 
                                 placeholder="John" 
                                 required
                                 pattern="[A-Za-z]+"
                                 title="Please enter only letters"
                             >
                         </div>
                         <div>
                             <label 
                                 for="lastName" 
                                 class="block mb-2 text-lg font-medium text-gray-900"
                             >
                                 Last Name
                             </label>
                             <input 
                                 v-model="lastName"
                                 type="text" 
                                 name="lastName" 
                                 id="lastName" 
                                 class="bg-transparent border-gray-600 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600
                                         focus:border-primary-600 block w-full p-3" 
                                 placeholder="Doe" 
                                 required
                                 pattern="[A-Za-z]+"
                                 title="Please enter only letters"
                             >
                         </div>
                         <div>
                             <label 
                                 for="email" 
                                 class="block mb-2 text-lg font-medium text-gray-900"
                             >
                                 Email
                             </label>
                             <input 
                                 v-model="email"
                                 type="email" 
                                 name="email" 
                                 id="email" 
                                 class="bg-transparent border-gray-600 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600
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
                                 v-model="password"
                                 type="password" 
                                 name="password" 
                                 id="password" 
                                 placeholder="••••••••" 
                                 class="bg-transparent border-gray-600 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 
                                          focus:border-primary-600 block w-full p-3" 
                                 required
                             >
                         </div>
                         <BaseButton type="submit" class="w-full" button-title="Sign up" color="black"></BaseButton>
                         
                         <p class="text-lg text-gray-500">
                             Already have an account? <a href="/login" class="font-semibold hover:underline">Log in</a>
                         </p>

                         <p v-if="isShowingError" class="font-primary font-semibold text-lg text-red-600">User with this email already exists</p>
                     </form>
                 </div>
                 
             </div>

             <div class="lg:flex lg:w-[30rem] py-10 hidden">
                <div class="bg-[url('../assets/img/background.png')] bg-cover bg-center bg-no-repeat w-full rounded-r-xl drop">
 
                </div>
             </div>
             </div>
         </div>
     </div>
 </template>
 
<script setup lang="ts">

import { ref } from 'vue';

import BaseButton from '../components/base-components/BaseButton.vue';
import todoService from '../service/todoService.ts';
import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const router = useRouter(); 
const userId = ref('');
const isShowingError = ref(false)

const createUser = async () => {
    try {
        const newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        };

        try {
            const existingUser = await todoService.getUserByEmail(email.value);
            if (existingUser) {
            isShowingError.value = true;
            return; 
        }
        } catch(e) {

        }

        await todoService.postUser(newUser);
 
        fetch('http://localhost:3700/todos/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
        })
            .then(response => {
            console.log('response fetched');
        
            if (response.status === 200) {
                return response.json(); // Parse response body
                console.log(response.json())
            } else {
                // Handle authentication error (display error message, etc.)
                console.error('Authentication failed');
                return Promise.reject('Authentication failed');
            }
            })
            .then(responseData => {
                // Get the token from the response data
            const token = responseData.token;
        
            // Store the token in a cookie
            document.cookie = `authToken=${token}; path=/`;

            // Add the token to the headers for future requests
            const headersWithToken = new Headers();
            headersWithToken.append('Authorization', `Bearer ${token}`);
        
            //console.log('Response Status:', response.status);
            console.log('Response Data:', responseData);
            userId.value = responseData.user._id;
                
            console.log('userId: ' + userId.value)
        
            // Redirect to dashboard upon successful login
            console.log('response 200');
            router.push({ name: 'dashboard', params: { userId: userId.value } });
            })
            .catch(error => {
            console.error('An error occurred:', error);
            });

    } catch (error) {
        console.error(error);
    } 
};

 </script>