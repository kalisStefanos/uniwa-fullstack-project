<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import BackButton from './BackButton.vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    const router = useRouter();
    const toast = useToast();
    const route = useRoute();
    const id = route.params.id;
    const isLoading = ref(true);
    const categories = ref([]);

    const expense = ref({
        categoryId: null,
        amount: 0,
        description: '',
    });

    const addExpense = async () => {
        try {
            const res = await axios.post(`/api/buildings/${id}/expenses`, expense.value);
            if (res.status === 201) {
                toast.success('Expense added successfully!');
            }
            router.push(`/buildings/${id}/expenses`); 
        } catch (error) {
            toast.error('Failed to add Expense!');
        }
    }

    onMounted( async () => {
        try {
            const res = await axios.get(`/api/buildings/${id}/expenses/categories`);
            categories.value = res.data;
            if(res.status !== 200){
                toast.error('Failed to get expense categories.')
            }
        }catch(error){

        }finally{
            isLoading.value = false;
        }
    })

</script>

<template>
    <BackButton :to="`/buildings/${id}/expenses`"/>

    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>

    <div v-else>
        <form @submit.prevent="addExpense">
            <h1 class="text-2xl font-bold mb-4">Add Expense</h1>
            
            <label for="categoryId"> <i class="pi pi-tag mr-1"></i> Category</label>
            <select v-model="expense.categoryId" class="border rounded w-full py-1 bg-white" required>
                <option :value="null" disabled>Select a category</option>
                <option v-for="cat in categories" :value="cat.id" :key="cat.id"> {{ cat.name }}</option>
            </select>
            <br>
            <label for="amount"> <i class="pi pi-euro mr-1"></i> Amount</label>
            <input type="number" step="0.01" id="amount" v-model="expense.amount" required autocomplete="off"/>
            
            <label for="description"> <i class="pi pi-pencil mr-1"></i> Description</label>
            <textarea 
                id="description" 
                v-model="expense.description" 
                rows="3"
                required 
                autocomplete="off"
                class="border rounded w-full p-2"
            ></textarea>
            
            <div class="flex justify-end pt-4">
                <button type="submit" class="button"> <i class="pi pi-check"></i> Confirm</button>
            </div>
        </form>
    </div>
</template>