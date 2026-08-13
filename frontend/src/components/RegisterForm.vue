<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const registerUser = async () => {

  try {
    const res = await axios.post('http://localhost:9000/api/register', {
      username: username.value,
      password: password.value
    })
    // console.log(res.data);
  } catch (error) {

    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 409){
        console.error('Conflict: An account with this username already exists.');
        return;
      }
      // Redirect to /error with query param ?status=403
      router.push({
        path: '/error',
        query: { status: statusCode.toString() }
      });
    } else {
      // General network/unknown error
      router.push({ path: '/error', query: { status: '500' } });
    }
  }
}

</script>

<template>
    <form @submit.prevent="registerUser">
        <h1 class="text-2xl mb-4">Register</h1>
        <label for="username">Username:</label>
        <input placeholder="Username" type="text" id="username" v-model="username" required/>
        <br/>
        <label for="Password">Password:</label>
        <input placeholder="Password" type="password" id="Password" v-model="password" required/>
        <br/>
        <button type="submit" class="">Register</button>
    </form>
</template>

<style scoped></style>
