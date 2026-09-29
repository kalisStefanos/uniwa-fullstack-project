<script setup>
    import BackButton from '@/components/BackButton.vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useToast } from 'vue-toastification';
    import axios from 'axios';


    const apartment = ref(null);
    const isLoading = ref(true);
    const route = useRoute();
    const aid = route.params.aid;
    const toast = useToast();

    onMounted(async () => {
        try{
            const res = await axios.get(`/api/apartments/${aid}`)
            apartment.value = res.data 
            console.log(apartment.value)         
        }catch(error){
            toast.error(error);
        }finally{
            isLoading.value = false;
        }
    })

    const getTotalAmount = computed(() =>{
        if (!apartment.value?.bills) return 0;
        return apartment.value.bills
        .filter(bill => !bill.paid)
        .reduce((total, bill) => total + (parseFloat(bill.amount) || 0), 0);
    });

</script>

<template>
    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    <div v-else>
        <div v-if="apartment" class="flex justify-center gap-12 w-150 p-4 mx-auto">
            <div class="bg-teal border rounded p-4 w-62">
                <h1 class="text-xl pb-8 underline"><strong>Apartment Details</strong></h1>
                <div class="flex flex-col items-baseline gap-4">
                    <span class="border rounded px-2"><strong><i class="pi pi-sort mr-1"></i></strong> {{apartment.floor}} </span>
                    <span class="border rounded px-2"><strong><i class="pi pi-hashtag"></i></strong> {{apartment.doorNum}} </span>
                    <span class="border rounded px-2"><strong><i class="pi pi-clone"></i></strong> {{apartment.area}} <sup>m²</sup> </span>
                    <span class="border rounded px-2 button"><strong><i class="pi pi-building"></i></strong> Building </span>
                </div>
            </div>
            <div>
                <div class="bg-teal border rounded p-4 w-62">
                    <h1 class="text-xl pb-4 underline"><strong>Bills</strong></h1>
                    <div v-if="getTotalAmount">
                        <div class="text-lg"><strong>Outstanding Balance: </strong></div>
                        <div class="bg-gray-100 mb-4 p-2 border rounded-2xl">
                            <div class="flex justify-end text-2xl">{{ getTotalAmount.toFixed(2) }} €</div>
                        </div>
                    </div>
                    <div v-else class="text-center p-2">
                        All your bills are paid!
                    </div>
                    <div class="flex items-center justify-center gap-4 pb-4">
                        <RouterLink to="/#" class="button">All Bills</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-teal border rounded p-4 w-150 mx-auto ">
        <div v-for="bill in apartment?.bills" class="flex justify-between border rounded p-1 items-center w-2/3 mx-auto m-2">
            <span>
                {{ bill.amount }} €
            </span>
            <i class="pi pi-question-circle cursor-help ml-2" :title="'Description: ' + bill.expenseReport.description"></i>   
        </div>
    </div>


    <BackButton to="/apartments" />

</template>