<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const props = defineProps({
        apartment: {
            type: Object,
            required: true
        }
    });
</script>
<template>
    <div class="flex flex-col">
        <div :title="'Door Number: ' + apartment.doorNum">
            <i class="pi pi-hashtag"></i> {{apartment.doorNum}}
        </div>
        <div>
            <i class="pi pi-clone"></i> {{apartment.area}} m²
        </div>
        <div class="w-32 truncate" :title="'Owner: ' + apartment.owner?.name || 'No Owner'">
            <i class="pi pi-user"></i> {{ apartment.owner?.name || 'No Owner' }}
        </div>
    </div>
    <RouterLink :to="`/buildings/${route.params.id}/apartments/${apartment.id}`" class="button rounded-full">
        <i class="pi pi-eye"></i>
    </RouterLink>
</template>