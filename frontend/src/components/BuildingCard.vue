<script setup>
    import {RouterLink} from 'vue-router';

    const props = defineProps({
        building: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div class="flex w-44 bg-teal border rounded-xl text-gray-800 p-2">
        <div class="flex flex-col gap-2 w-full">
            <span class="max-w-full w-full info" :title="`Address: ${building.strAddress} ${building.strNum}`">
                <strong><i class="pi pi-map-marker"></i></strong> {{building.strAddress}} {{building.strNum}} 
            </span>
            <div class="flex justify-between items-center w-full">
                <div class="flex gap-2">
                    <span class="max-w-16 info" :title="`Floors: ${building.floors}`"><i class="pi pi-sort"></i> {{building.floors}}</span>
                    <span class="max-w-16 info" :title="`Active Apartments: ${building._count.apartments}`"><i class="pi pi-home"></i> {{building._count.apartments}} </span>
                </div>
                <RouterLink :to="`/buildings/${building.id}`" title="View Building" class="button rounded text-xs">
                    <i class="pi pi-eye"></i>
                </RouterLink>
            </div>
        </div>
    </div>
</template>