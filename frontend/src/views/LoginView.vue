<script setup lang="ts">
    import LoginForm from '@/components/LoginForm.vue';
    import BackButton from '@/components/BackButton.vue';
</script>

<template>
    <div>
        <h1 class="font-bold bg-orange text-center p-4 text-3xl border">Building Management App</h1>
    </div>
    <div class="m-5">
        <LoginForm/>
    </div>
    <div class="m-5">
        <BackButton />
    </div>
</template>
