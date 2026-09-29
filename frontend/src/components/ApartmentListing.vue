<script setup>
    const props = defineProps({
        apartment: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    
    <div class="listing">
        <div class="flex justify-between items-center gap-4 text-gray-700 p-2">
            <span class="w-62 border rounded px-1"><i class="pi pi-map-marker mr-1"></i>{{ apartment.building.strAddress }} {{ apartment.building.strNum }} </span>
            <span class="w-16 border rounded px-1"><i class="pi pi-sort mr-1"></i> {{ apartment.floor }}</span>
            <span class="w-16 border rounded px-1"><i class="pi pi-hashtag mr-1"></i> {{ apartment.doorNum }}</span>
            <span class="w-24 border rounded px-1"><i class="pi pi-clone mr-1"></i> {{ apartment.area }} <sup>m²</sup></span>
            <RouterLink :to="`/apartments/${apartment.id}`" class="button text-sm">View</RouterLink>
        </div>
    </div>

</template>