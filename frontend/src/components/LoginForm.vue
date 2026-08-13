<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const loginUser = async () => {
  try {
    const res = await axios.post('http://localhost:9000/api/login', {
      username: username.value,
      password: password.value
    })
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="loginUser">
      <h1 class="text-2xl mb-4">Log In</h1>
      <label for="username">Username:</label>
      <input placeholder="Username" type="text" id="username" v-model="username" required class=""/>
      <br/>
      <label for="Password">Password:</label>
      <input placeholder="Password" type="password" id="Password" v-model="password" required class=""/>
      <br/>
      <button type="submit" class="">Log In</button>
  </form>
</template>

<style scoped></style>
