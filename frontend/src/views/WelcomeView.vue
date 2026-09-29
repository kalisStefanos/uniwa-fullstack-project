<script setup>
import WelcomeOptions from '@/components/WelcomeOptions.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter();
const isLoading = ref(true);

onMounted( async () => {
    try {
        const res = await axios.get('/api/auth/verify'); //uses authMiddleware that checks the cookie token
        if(res.status === 200) {    // if there is a JWT token
            router.push('/dashboard'); 
        }
        else{
            console.log('User is a guest');
        }
    } catch (error) {
        if(error.response && error.response.status === 401) {
            console.log('User is a guest');
        } else {
            console.error(error);
        }
    }finally{
        isLoading.value = false;
    }
});

</script>

<template>
    <h1 class="font-bold bg-orange text-center p-4 text-3xl border">Building Management App</h1>
    <div v-if="isLoading" class="h-100 flex items-center justify-center">
        <PulseLoader />
    </div>
    <div v-else>
        <div class="h-100 flex items-center justify-center">
            <WelcomeOptions /> 
        </div>
    </div>
</template>

<style scoped></style>
