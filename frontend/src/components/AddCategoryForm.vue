<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import BackButton from './BackButton.vue';

    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const id = route.params.id;

    const category = ref({
        name: '',
        areaWeight: 1,
        floorWeight: 1,
    });

    const addCategory = async () => {
        try {
            const res = await axios.post(`/api/buildings/${id}/expenses/categories`, category.value);
            if (res.status === 201) {
                toast.success('Category added successfully!');
            }
            router.push(`/buildings/${id}/expenses`); 
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                toast.error('A Category with this name already exists.');
            } else {
                toast.error('Failed to add Category!');
            }
        }
    };

</script>

<template>
    <BackButton :to="`/buildings/${id}/expenses`"/>
    <form @submit.prevent="addCategory">
        <h1 class="text-2xl font-bold mb-4">Add Expense Category</h1>

        <label for="name"> <i class="pi pi-tag mr-1"></i>Tag Name:</label>
        <input type="text" id="name" v-model="category.name" required autocomplete="off"/>

        <label for="areaWeight"> <i class="pi pi-clone mr-1"></i> Area Weight:</label>
        <input type="number" step="0.001" id="areaWeight" v-model="category.areaWeight" required min="1" max="10" autocomplete="off"/>

        <label for="floorWeight"> <i class="pi pi-sort mr-1"></i> Floor Weight</label>
        <input type="number" step="0.001" id="floorWeight" v-model="category.floorWeight" required min="1" max="10" autocomplete="off"/>

        <div class="flex justify-end pt-4">
            <button type="submit" class="button"> <i class="pi pi-check"></i> Confirm</button>
        </div>
    </form>
</template>