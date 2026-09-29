<script setup>

import {ref, onMounted, computed } from 'vue'
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useToast } from 'vue-toastification';
    import { useRoute, useRouter } from 'vue-router';
    import BackButton from '@/components/BackButton.vue';
    import ExpenseCard from '@/components/ExpenseCard.vue';

    const router = useRouter();
    const expenses = ref([]);
    const isLoading = ref(true);
    const toast = useToast();
    const route = useRoute();
    const id = route.params.id;
    const selectedExpenses = ref([]);
    const description = ref('')

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

    const unissuedExpenses = computed(() => {
        return expenses.value.filter(exp => exp.expenseReportId === null);
    });

    const getTotalAmount = computed(() =>{
        return expenses.value
        .filter(exp => selectedExpenses.value.includes(exp.id))
        .reduce((total, exp) => total + (parseFloat(exp.amount) || 0), 0);
    });

    const issueBills = async () => {
        try{
            isLoading.value = true;
            const res = await axios.post(`/api/buildings/${id}/expenses/issue`, {expenseIds: selectedExpenses.value, description: description.value})
            toast.success("Issued new Bills Succesfully")
            router.push(`/buildings/${id}`)
        }catch(error){
            toast.error(`${error}`)
        }finally{
            isLoading.value = false;
        }
    }
</script>

<template>

     <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    
    <div v-else>
        <div class="text-center m-4">
            <strong class="text-center border rounded p-2 uppercase text-2xl w-fit mx-auto"><i class="pi pi-list-check"></i> Choose Expenses</strong>
        </div>
        <centered-container>
            <div class="grid grid-cols-2 gap-6 min-w-max mb-8">
                <div v-for="expense in unissuedExpenses" :key="expense.id" >
                    <div v-if="expense?.expenseReportId === null" class="flex items-center gap-4">
                        <input type="checkbox" class="size-4" :value="expense.id" v-model="selectedExpenses">
                        <ExpenseCard :expense="expense"/>
                    </div>
                </div>
            </div>
            <div v-if="selectedExpenses.length > 0" class="flex justify-between items-center">
                <button @click="issueBills" class="button">
                    <i class="pi pi-pen-to-square mr-1"></i>Issue
                </button>
                <textarea 
                    id="description" 
                    v-model="description" 
                    rows="3"
                    required 
                    autocomplete="off"
                    class="bg-gray-100 border rounded w-56 h-16 p-2" 
                    placeholder="Report Description"
                ></textarea>
                <span class="text-base font-bold">
                    Total: {{ Number(getTotalAmount).toFixed(2) }} €
                </span>
            </div>
        </centered-container>
    </div>
    <BackButton :to="`/buildings/${id}/`"/>
</template>