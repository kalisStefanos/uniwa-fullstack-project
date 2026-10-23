<script setup lang="ts">
  import RegisterForm from '@/components/RegisterForm.vue';
  import BackButton from '@/components/BackButton.vue';
</script>

<template>
  <div class="font-bold bg-orange text-center p-4 text-3xl border"><i class="pi pi-building"></i> Building Management App</div>

  <div class="m-5">
    <RegisterForm />
  </div>
  <div class="m-5">
    <BackButton />
  </div>
</template>
