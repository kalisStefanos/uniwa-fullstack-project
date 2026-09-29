<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const router = useRouter();
const toast = useToast();

const registerUser = async () => {
  try {
    errorMessage.value = '';
    isLoading.value = true;
    const res = await axios.post('http://localhost:9000/api/auth/register', {
      name: username.value,
      pass: password.value
    })
    if(res.status === 201){
      toast.success('Registration was successful! You can now log in.');
      router.push('/');
    }
  } catch (error) {
    isLoading.value = false;

      if (axios.isAxiosError(error) && error.response?.status === 409){
        toast.error('An account with this username already exists.');
      }
      else {
        toast.error('Registration failed. Please try again.');
      }
  }
}

</script>

<template>
    <form @submit.prevent="registerUser" class="w-1/3 shrink-0"> 
      <h1 class="text-2xl mb-4 font-bold text-center">Register</h1>
      <label for="username"><i class="pi pi-user"></i> Username:</label>
      <input placeholder="Username" type="text" id="username" v-model="username" required autocomplete="off"/>
      <br/>
      <label for="username"><i class="pi pi-key"></i> Password:</label>
      <div class="flex items-center justify-between">
        <input placeholder="Password" :type="showPassword ? 'text' : 'password'" id="Password" v-model="password" required class=""/>
        <button type="button" @click="showPassword = !showPassword" class="border hover:border-transparent rounded cursor-pointer text-gray-500 hover:text-gray-700">
        <span v-if="showPassword"><i class="pi pi-eye px-2 text-black"></i></span>
        <span v-else><i class="pi pi-eye px-2 text-gray-500"></i></span>
        </button>
      </div> 
      <br/>
      <button type="submit" class="button">Register</button>
      <div class="m-2">
        <PulseLoader v-if="isLoading"/>
        <div>
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
      </div>
    </form>
</template>

<style scoped></style>
