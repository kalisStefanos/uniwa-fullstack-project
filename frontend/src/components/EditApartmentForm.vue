<script setup>
    import BackButton from '@/components/BackButton.vue';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import axios from 'axios';

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const aptId = route.params.aid;

    const apartment = ref({
        area: 0,
        doorNum: 0,
        floor: 0,
    });

    onMounted(async () => {
        try {        
            const res = await axios.get(`http://localhost:9000/api/apartments/${aptId}`, { withCredentials: true });
            if (res.status === 200) {
                const { area, doorNum, floor } = res.data;
                apartment.value = { area, doorNum, floor };
            } else {
                toast.error('Failed to fetch apartment.');
            }
        } catch (error) {
            console.error('Error fetching apartment details:', error);
            router.push('/buildings');
        }
    });

    const updateApartment = async () => {
        try {
            const res = await axios.put(`http://localhost:9000/api/apartments/${aptId}/edit`, apartment.value, { withCredentials: true });
            console.log(res.status)
            if (res.status === 204) {
                toast.success('Apartment updated successfully!');
                router.push(`/buildings/${route.params.id}/apartments/${aptId}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('An apartment with this door # Number already exists in this floor');
            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to update apartment.');
            }
        }
    };
</script>

<template>
    <form @submit.prevent="updateApartment">
        <h1 class="text-2xl font-bold mb-4">Edit Apartment</h1>
        <label for="floor" class="p-2"><i class="pi pi-sort"></i> Floor</label>
        <input id="floor" type="number" required min="0" max="99" v-model="apartment.floor">
        <br>
        <label for="doorNum" class="p-2"><i class="pi pi-hashtag"></i> Number</label>
        <input id="doorNum" type="number" required min="1" max="99" v-model="apartment.doorNum">
        <br>
        <label for="area" class="p-2"><i class="pi pi-clone"></i> Area <sup>m²</sup></label>
        <input id="area" type="number" required min="1" max="999" v-model="apartment.area">
        <br>
        <button type="submit" class="button"> <i class="pi pi-check"></i> Confirm</button>
    </form>
    <BackButton :to="`/buildings/${route.params.id}/apartments/${aptId}`" />
</template>