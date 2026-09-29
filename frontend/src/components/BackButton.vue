<script setup>
    import { RouterLink } from 'vue-router';
    import { defineProps } from 'vue';

    const props = defineProps({
        to: {
            type: String,
            required: true
        }
    });

</script>

<template>
    <RouterLink :to="props.to || '/'" class="button fixed bottom-6 right-6 z-50">
        <i class="pi pi-arrow-circle-left mr-2"></i>Back
    </RouterLink>
</template>