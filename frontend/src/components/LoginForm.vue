<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);

const errorMessage = ref('');
const username = ref('');
const password = ref('');
const loginUser = async () => {
  try {
    errorMessage.value = '';
    isLoading.value = true;
    const res = await axios.post('http://localhost:9000/api/auth/login', {
      name: username.value,
      pass: password.value
    })
    if (res.status === 200) {
      router.push('/dashboard')
    }
    console.log(res.data);
  } catch (error: any) {
    if(error.response && error.response.status === 401) {
      errorMessage.value = 'Invalid username or password';
    } else {
      errorMessage.value = 'An error occurred. Please try again later.';
    }
    isLoading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="loginUser" class="w-1/3 shrink-0">
    <h1 class="text-2xl mb-4 font-bold text-center">Log In</h1>
    <label for="username"><i class="pi pi-user"></i> Username:</label>
    <input placeholder="Username" type="text" id="username" v-model="username" required class=""/>
    <label for="Password"><i class="pi pi-key"></i> Password:</label>
    <div class="flex items-center justify-between">
      <input placeholder="Password" :type="showPassword ? 'text' : 'password'" id="Password" v-model="password" required class=""/>
      <button type="button" @click="showPassword = !showPassword" class="border hover:border-transparent rounded cursor-pointer text-gray-500 hover:text-gray-700">
        <span v-if="showPassword"><i class="pi pi-eye px-2 text-black"></i></span>
        <span v-else><i class="pi pi-eye px-2 text-gray-500"></i></span>
      </button>
    </div>      
    <br/>
    <button type="submit" class="button">Log In</button>
    <div class="m-2">
      <PulseLoader v-if="isLoading"/>
      <div>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
    </div>
  </form>

</template>

<style scoped></style>
