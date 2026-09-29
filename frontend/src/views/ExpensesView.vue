<script setup>
    import {ref, onMounted} from 'vue'
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useToast } from 'vue-toastification';
    import { RouterLink, useRoute } from 'vue-router';
    import BackButton from '@/components/BackButton.vue';
    import ExpenseCard from '@/components/ExpenseCard.vue';

    const expenses = ref([]);
    const isLoading = ref(true);
    const toast = useToast();
    const route = useRoute();
    const id = route.params.id;

    onMounted(async () => {
        try{
            const res = await axios.get(`/api/buildings/${id}/expenses`)
            expenses.value  = res.data;
        }catch(error){
            console.log(error)
            toast.error('Could not get expenses')
        }finally{
            isLoading.value = false;
        }
    })

</script>

<template>

    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    
    <div v-else>
        <div class="text-center m-4">
            <strong class="text-center border rounded p-2 uppercase text-2xl w-fit mx-auto"><i class="pi pi-receipt"></i> Expenses</strong>
        </div>
        <centered-container>
            <div class="flex justify-center gap-4 mb-4">
                <RouterLink :to="`/buildings/${route.params.id}/add-category`" class="button">
                    <i class="pi pi-plus-circle mr-1"></i>Add Category
                </RouterLink>
            </div>
            <!-- if we got any expenses? -->

            <div class="grid grid-cols-2 gap-6 min-w-max">
                <div v-for="expense in expenses" :key="expense.id">
                    <ExpenseCard :expense="expense"/>
                </div>
                <div class="grid place-items-center">
                    <RouterLink :to="`/buildings/${id}/add-expense`" class="add-button"> <i class="pi pi-plus-circle"></i> Add Expense</RouterLink>
                </div>
            </div>
        </centered-container>
         <!-- else show msg -->
        <div>

        </div>
    </div>

    <BackButton :to="`/buildings/${id}/`"/>
    
</template>
