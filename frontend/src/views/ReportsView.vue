<script setup>
    import { ref, onMounted } from 'vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import axios from 'axios';
    import BackButton from '@/components/BackButton.vue';

    const isLoading = ref(true);
    const route = useRoute();
    const id = route.params.id;
    const reports = ref([]);
    const toast = useToast();

    onMounted(async () => {
        try{
            const res = await axios.get(`/api/buildings/${id}/expenses/reports`);
            reports.value = res.data

        }catch(error){
            toast.error(`${error}`)
        }finally{
            isLoading.value = false;
        }
    })

</script>

<template>

    <div class="text-center m-4">
        <strong class="text-center border rounded p-2 uppercase text-2xl w-fit mx-auto"><i class="pi pi-clipboard"></i> Reports </strong>
    </div>
    <centered-container>
        <div v-for="report in reports" :key="report.id" class="my-1">
            <div class="bg-white">
                {{ report.id }}
            </div>
        </div>
    </centered-container>

    <BackButton :to="`/buildings/${id}`" />
</template>