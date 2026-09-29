<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="border rounded-xl flex flex-col items-center justify-center p-5 m-100 bg-teal">
    <RouterLink to="/register" class="button m-2">Register</RouterLink>
    <RouterLink to="/login" class="button m-2">Log In</RouterLink>
  </div>
</template>