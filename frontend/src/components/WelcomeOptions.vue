<script setup lang="ts">

import router from '@/router';

const register = () => {
  router.push('/register');
};

const login = () => {
  router.push('/login');
};

</script>

<template>

  <div class="border rounded-xl flex flex-col items-center justify-center p-5 m-100 bg-gray-100">
    <button @click="register" class="border hover:bg-gray-200 active:bg-gray-300">Register</button>
    <button @click="login" class="border hover:bg-gray-200 active:bg-gray-300">Log In</button>
  </div>
</template>