<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import BackButton from '@/components/BackButton.vue';
import BillListing from '@/components/BillListing.vue';

    const route = useRoute();

    const id = route.params.id;
    const aid = route.params.aid;
    const bills = ref([]);
    const access = ref('none')
    const isLoading = ref(true)

    onMounted(async () => {
        try{
            const res = await axios.get(`/api/apartments/${aid}/bills`)
            bills.value = res.data.bills;
            access.value = res.data.accessLevel;
        }catch(err){
            console.error(err)
        }finally{
            isLoading.value = false;
        }
    })

</script>

<template>
    <h1 class="header"><i class="pi pi-money-bill"></i> Apartment Bills</h1>
    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    <div v-if="bills">
        <centered-container class="min-w-max">
            <div v-for="bill in bills" :key="bill.id">
                <BillListing :bill="bill" :accessLevel="access"/>
            </div>
        </centered-container>
    </div>

    <BackButton :to="`/buildings/${id}/apartments/${aid}`"/>

</template>