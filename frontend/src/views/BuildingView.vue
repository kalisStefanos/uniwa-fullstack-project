<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, RouterLink} from 'vue-router';
    import axios from 'axios';
    import BackButton from '@/components/BackButton.vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import ApartmentCard from '@/components/ApartmentCard.vue';

    const route = useRoute();
    const building = ref(null);
    const apts = ref([]);
    const notFound = ref(false);
    const buildingId = route.params.id;
    const isLoading = ref(true)
    const id = route.params.id;

    onMounted( async () => {
        try{
            const buildingRes = await axios.get(`/api/buildings/${buildingId}`);
            building.value = buildingRes.data;
            if(building.value){
                const aptsRes = await axios.get(`/api/buildings/${buildingId}/apartments`)
                apts.value = aptsRes.data;
            }
        }catch(error){
            if(error.response?.status === 404){
                notFound.value = true;
            }
        }finally{
            isLoading.value = false;
        }
    });
</script>

<template>
    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>

    <div v-else class="w-2/3 mx-auto min-w-max mb-10">
        <BackButton to="/buildings"/>
        <div v-if="building">
            <div class="border rounded text-center uppercase text-2xl w-fit mx-auto p-4">
                <i class="pi pi-building mr-2"></i>
                <strong>{{ building.strAddress }} {{ building.strNum }}</strong>
            </div>
            <centered-container>
            <div class="flex justify-center gap-4 my-2">
                <RouterLink :to="`/buildings/${buildingId}/expenses`" class="button">
                    <i class="pi pi-receipt"></i>
                    Expenses
                </RouterLink>
                <RouterLink :to="`/buildings/${buildingId}/reports`" class="button">
                    <i class="pi pi-clipboard"></i>
                    Reports
                </RouterLink>
                <RouterLink :to="`/buildings/${id}/issue`" class="button">
                    <i class="pi pi-pen-to-square"></i>
                    Issue Bills
                </RouterLink>
            </div>
            <div v-for="floor in building.floors+1" :key="floor" class="bg-teal border rounded my-2 p-2 ">
                <div class="text-center border rounded bg-tealess w-fit min-w-32 mx-auto">
                    <div v-if="building.floors - floor + 1 === 0">
                        <i class="pi pi-sort"></i> Ground Floor
                    </div>
                    
                    <div v-else>
                        <i class="pi pi-sort"></i> Floor {{ building.floors - floor + 1 }}
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 mt-2">
                    <div v-for="apt in apts.filter(a => a.floor === building.floors - floor + 1)" :key="apt.id" class="w-fit bg-tealess border rounded-b-3xl flex justify-between items-center p-2">
                        <ApartmentCard :apartment="apt"/>
                    </div>
                    <div class="grid place-items-center">
                        <RouterLink :to="`/buildings/${route.params.id}/add-apartment/${building.floors - floor + 1}`" class="add-button rounded-t-none rounded-b-3xl">
                            <i class="pi pi-plus-circle mr-1"></i>
                            Add Apartment
                        </RouterLink>
                    </div>
                </div>
            </div>
            </centered-container>
        </div>
    </div>
</template>