<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useToast } from 'vue-toastification';
    import BackButton from '@/components/BackButton.vue';

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    //const id = route.params.id;
    const aid = route.params.aid;
    const apartment = ref(null);
    const isLoading = ref(true);

    onMounted(async () => {
        try{
            const res = await axios.get(`/api/apartments/${aid}`);
            apartment.value = res.data;
        }catch(error){
            console.error(error);
        }finally{
            isLoading.value = false;
        }
    })

    const deleteApartment = async () => {
        try{
            isLoading.value = true;
            await axios.delete(`/api/apartments/${aid}`);
            router.push(`/buildings/${apartment.value.buildingId}`);
            toast.success('Apartment deleted successfully!');
        }catch(error){
            console.error(error);
            toast.error('Failed to delete apartment!');
        }finally{
            isLoading.value = false;
        }
    }

    const generateCode = async (apt) => {
        const buildingId = apartment.id;
        const res = await axios.put(`http://localhost:9000/api/apartments/${apt.id}/code`)
        apt.claimCode = res.data.claimCode;
        toast.success(`Invitation code generated: ${apt.claimCode}`, 
        {pauseOnHover: true, timeout: 5000, showprogressBar: true, draggable: false, hideProgressBar: false, closeOnClick: false});
    }

</script>

<template>
    <div v-if="isLoading" class="loader">
        <PulseLoader />
    </div>
    <div v-else>
        <div v-if="apartment" class="flex justify-center gap-32 w-2/3 mx-auto min-w-max mt-24">
            <div class="bg-teal border rounded p-4 w-62">
                <h1 class="text-xl pb-8 underline"><strong>Apartment Details</strong></h1>
                <div class="flex flex-col items-baseline gap-4">
                    <span class="border rounded px-2"><strong><i class="pi pi-sort mr-1"></i></strong> {{apartment.floor}} </span>
                    <span class="border rounded px-2"><strong><i class="pi pi-hashtag"></i></strong> {{apartment.doorNum}} </span>
                    <span class="border rounded px-2"><strong><i class="pi pi-clone"></i></strong> {{apartment.area}} <sup>m²</sup> </span>
                    <span class="inline-block border rounded px-2 w-fit max-w-46 truncate" :title="apartment.owner?.name"><strong><i class="pi pi-user"></i></strong> {{apartment.owner?.name || 'No Owner'}}</span>
                </div>
            </div>
            <div class="bg-teal border rounded p-4 w-62">
                <h1 class="text-xl pb-8 underline"><strong>Actions</strong></h1>
                <div class="flex flex-col items-baseline gap-2">
                    <RouterLink :to="`/buildings/${apartment.buildingId}/apartments/${aid}/bills`" class="button"> <i class="pi pi-money-bill mr-1"></i>Bills</RouterLink>
                    <RouterLink :to="`/buildings/${apartment.buildingId}/apartments/${aid}/edit`" class="button"><i class="pi pi-file-edit mr-1"></i>Edit</RouterLink>
                    <button @click="generateCode(apartment)" class="button"><i class="pi pi-barcode mr-2"></i>Claim Code</button>
                    <button @click="deleteApartment" class="button bg-red-300 hover:bg-red-400"> <i class="pi pi-trash mr-1"></i>Delete</button>
                </div>
            </div>
        </div>
    </div>
    <BackButton :to="`/buildings/${apartment?.buildingId}`" />
</template>