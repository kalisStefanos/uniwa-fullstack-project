<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    const router = useRouter();
    const user = ref(null);

    const logout = async () => {
    try {
        await axios.post('http://localhost:9000/api/auth/logout');
        router.push('/');
    } catch (error) {
        console.error('Error during logout:', error);
    }
  };

  onMounted(async () => {
    try {
        const res = await axios.get('http://localhost:9000/api/auth/verify', { withCredentials: true });
        if (res.status === 200) {
            user.value = res.data.user;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/');
    }
  });

</script>

<template>
    <div class="bg-orange p-3 mb-3 border rounded-b-full flex items-center justify-between px-10 min-w-max gap-20">
        <div class="">
            <RouterLink to="/dashboard" class="navButton"><i class="pi pi-grip mr-2"></i>Dashboard</RouterLink>
            <RouterLink to="/buildings" class="navButton"><i class="pi pi-building"></i> My Buildings</RouterLink>
            <RouterLink to="/apartments" class="navButton"><i class="pi pi-home"></i> My Apartments</RouterLink>
        </div>
        <div class=" flex items-center gap-4">
            <div><i class="pi pi-user text-2xl"></i> {{ user?.name }}</div>
            <button @click="logout" class="text-xs border rounded-full hover:bg-red-600 p-2 cursor-pointer" title="logout"><i class="pi pi-sign-out"></i></button>
        </div>
    </div>
</template>