<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const statusCode = computed(() => Number(route.query.status) || 500);

    const errorMessage = computed(() => {
    switch (statusCode.value) {
        case 403:
        return 'Access Forbidden: Your account may be locked or pending approval.';
        case 500:
        default:
        return 'Internal Server Error: Something went wrong on our end. Please try again later.';
    }
    });

</script>

<template>
    <pTitle>Error View</pTitle>
    <div> 
        <h1 class="text-2xl mb-4">Error {{ statusCode }}</h1>
        <p>{{ errorMessage }}</p>
    </div>
</template>
