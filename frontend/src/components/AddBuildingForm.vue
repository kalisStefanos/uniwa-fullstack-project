<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const building = ref({
    strAddress: '',
    strNum: '',
    floors: 0
});

const addBuilding = async () => {
    try {
        const res = await axios.post('/api/buildings', building.value);
        if (res.status === 201) {
            toast.success('Building added successfully!');
        }
        router.push('/buildings'); // Redirect to the dashboard after successful addition
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            toast.error('A building with this address already exists.');
        } else {
            toast.error('Failed to add building!');
        }
    }
};

</script>

<template>
    <form @submit.prevent="addBuilding">
        <h1 class="text-3xl font-bold mb-4">Add Building</h1>

        <label for="strAddress"> <i class="pi pi-map-marker"></i> Street Name:</label>
        <input type="text" id="strAddress" v-model="building.strAddress" required/>

        <label for="strNum"> <i class="pi pi-hashtag"></i> Street Number:</label>
        <input type="number" id="strNum" v-model="building.strNum" required min="1" max="999"/>

        <label for="floors"> <i class="pi pi-sort"></i> Floors:</label>
        <input type="number" id="floors" v-model="building.floors" required min="0" max="10"/>

        <div class="flex justify-end pt-4">
            <button type="submit" class="button"> <i class="pi pi-check"></i> Confirm</button>
        </div>
    </form>
</template>