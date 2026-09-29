<script setup>
    import { isReadonly, ref } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import BackButton from './BackButton.vue';


    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const buildingId = route.params.id;
    const floor = parseInt(route.params.floor);

    const apt = ref({
        area: 50,
        doorNum: 1,
        floor: floor,
        buildingId: route.params.id
    });

    const addApartment = async () => {
        try{
            const res = await axios.post(`/api/buildings/${buildingId}/apartments`, apt.value)
            router.push(`/buildings/${buildingId}`)
            if(res.status === 201){
                toast.success('Apartment added successfully!');
            }
        }catch(error){
            if(error.response && error.response.status === 409){
                toast.error('An apartment with this door # Number already exists in this floor');
            } else if(error.response && error.response.status === 400){
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to add apartment!');
            } 
        }
    }
</script>

<template>
    <BackButton :to="`/buildings/${route.params.id}`"/>
    <form @submit.prevent="addApartment">
        <h1 class="text-2xl font-bold mb-4">Add Apartment</h1>
        <label for="floor" class="text-gray-500 p-2"><i class="pi pi-sort"></i> Floor</label>
        <input id="floor" type="number" required min="0" max="99" v-model="apt.floor" disabled class="disabled:border-gray-300  disabled:text-gray-400" >
        <br>
        <label for="doorNum" class="p-2"><i class="pi pi-hashtag"></i> Door Number</label>
        <input id="doorNum" type="number" required min="1" max="99" v-model="apt.doorNum">
        <br>
        <label for="area" class="p-2"><i class="pi pi-clone"></i> Area <sup>m²</sup></label>
        <input id="area" type="number" required min="1" max="999" v-model="apt.area">
        <br>
        <button type="submit" class="button"> <i class="pi pi-check"></i> Confirm</button>
    </form>
</template>