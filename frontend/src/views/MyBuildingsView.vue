<script setup>
    import BuildingCard from '@/components/BuildingCard.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    const buildings = ref([]); 
    const isLoading = ref(true);

    onMounted(async ()=> {
        try{
            const res = await axios.get('/api/buildings', {withCredentials: true})
            buildings.value = res.data;
        }catch(error){
            console.error(error);
        }finally{
            isLoading.value = false;
        }
    })
</script>

<template>
    <h1 class="text-2xl text-center"><strong><i class="pi pi-building"></i> Management</strong></h1>

    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    
    <centered-container v-else>
        <div class="grid grid-cols-3 gap-6 min-w-max">
            <div v-for="building in buildings" :key="building.id">
                <BuildingCard :building="building" />
            </div>
            <div class="grid place-items-center">
                <RouterLink to="/add-building" class="add-button"> <i class="pi pi-plus-circle"></i> Add Building</RouterLink>
            </div>
        </div>
    </centered-container>
</template>