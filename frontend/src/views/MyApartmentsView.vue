<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import ApartmentListing from '@/components/ApartmentListing.vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    const apts = ref([])
    const code = ref('')
    const isLoading = ref(true)

    const router = useRouter();
    const toast = useToast();

    const fetchApartments = async () => {
        try {
            const res = await axios.get('/api/apartments', { withCredentials: true });
            apts.value = res.data;
        }catch(err){
            throw err
        } 
        finally {
            isLoading.value = false;
        }
    };

    onMounted(async () =>{
        fetchApartments();
    })

    const submitCode = async () => {
        try{
            const res = await axios.put('/api/apartments/', { claimCode: code.value }, {withCredentials: true})
            fetchApartments();
            code.value = '';
            toast.success('Apartment joined successfully!');
        }catch(err){
            toast.error('Apartment not found');
        }
    }
</script>

<template>
    <section>
        <div v-if="isLoading" class="loader">
            <PulseLoader />
        </div>

        <div v-else class="list">
            <h1 class="text-2xl text-center"><strong><i class="pi pi-home mr"></i> My Apartments</strong></h1>
            <!-- <div v-if="!apts.value" class="text-center text-lg mt-10">
                <p>You have no apartments yet.</p>
                <p>Use the join code provided by your building administrator.</p>
            </div> -->
            <div v-for="apt in apts" :key="apt.id">
                <ApartmentListing :apartment="apt"/>
            </div>
        
            <div class="m-10">
                <form @submit.prevent="submitCode" class="w-84 flex-initial">
                    <div class="flex justify-between items-center gap-4">
                        <label for="code" class="inline-block w-1/3 text-center whitespace-nowrap"><strong>Claim Code:</strong></label>
                        <input id="code" type="text" required v-model="code" placeholder="XXXXXX" class="uppercase text-center" :maxlength="6" autocomplete="off">
                        <button type="submit" class="button w-1/3">Claim</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>