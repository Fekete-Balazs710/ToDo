<template>
    <div class="w-screen h-screen bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300">
         <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
             <div class="lg:flex items-start justify-center w-[45rem] mr-[-58rem] absolute text-center rotate-90 hidden">
                 <p class="text-white font-primary font-extrabold text-8xl opacity-20 mb-2 drop-shadow-2xl">To Do App</p>
             </div> 
             <div class="lg:flex lg:w-[65rem] w-full flex justify-center">
             <div class="lg:flex lg:w-[25rem] py-10 hidden">
                 <div class="bg-[url('../assets/img/background.png')] bg-cover bg-center bg-no-repeat w-full rounded-l-xl drop">
  
                 </div>
              </div>
             <div class="w-full backdrop-blur-lg bg-white/70 rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                 <div class="p-6 space-y-4 md:space-y-6 sm:p-8 font-primary">
                     <h1 class="text-xl font-bold text-gray-900 md:text-3xl">
                         Log in
                     </h1>
                     <form class="space-y-4 md:space-y-6" @submit="handleSubmit">
                         <div>
                             <label 
                                 for="email" 
                                 class="block mb-2 text-lg font-medium text-gray-900"
                             >
                                 Email
                             </label>
                             <input 
                                 v-model="emailInput"
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
                                 v-model="passwordInput"
                                 type="password" 
                                 name="password" 
                                 id="password" 
                                 placeholder="••••••••" 
                                 class="bg-transparent border-gray-600 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 
                                          focus:border-primary-600 block w-full p-3" 
                                 required
                             >
                         </div>
                         <BaseButton type="submit" class="w-full" button-title="Log in" color="black"></BaseButton>
                         
                         <p class="text-lg text-gray-500">
                             Don’t have an account yet? <a href="/signup" class="font-semibold hover:underline">Sign up</a>
                         </p>
                         <p v-if="isShowingError" class="font-primary font-semibold text-lg text-red-600">Invalid user credentials</p>
                     </form>
                 </div>
             </div>
         </div>
         </div>
     </div>
 </template>
 
 <script setup lang="ts">
 
 import { useRouter } from 'vue-router';
 import { ref } from 'vue';
 import BaseButton from '../components/base-components/BaseButton.vue';

 const emailInput = ref('');
 const passwordInput = ref('');
 
 const isShowingError = ref(false)
 
 const router = useRouter();
 
 const userId = ref('');
 
 const handleSubmit = (event: Event) => {
   event.preventDefault(); // Prevent the default form submission
 
   const email = emailInput.value;
   const password = passwordInput.value;
 
   fetch('http://localhost:3700/users/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email, password }),
   })
     .then(response => {
       if (response.status === 200) {
         return response.json(); // Parse response body
       } else {
         // Handle authentication error (display error message, etc.)
         isShowingError.value = true;
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
       userId.value = responseData.user._id;
 
       // Redirect to dashboard upon successful login
       router.push({ name: 'dashboard', params: { userId: userId.value } });
     })
     .catch(error => {
       isShowingError.value = true;
       console.error('An error occurred:', error);
     });
 };
 
 </script>