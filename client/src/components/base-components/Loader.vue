<template>
    <div class="flex justify-center align-middle text-center">
          <div role="status" class="font-primary text-lg absolute text-center bg-white w-[30rem] h-[30rem]">
            <div class="flex mx-auto mt-48 w-12 h-12">
              <LoaderIcon></LoaderIcon>
            </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
</template>

<script setup lang="ts">

import LoaderIcon from '../icons/LoaderIcon.vue';

</script>
