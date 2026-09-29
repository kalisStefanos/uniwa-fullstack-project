<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import NavBar from './components/NavBar.vue';

  const route = useRoute();
</script>

<template>
  <div>
    <NavBar v-if="!route.meta.hideNavbar" />
    <RouterView />
  </div>
</template>

<style scoped></style>
