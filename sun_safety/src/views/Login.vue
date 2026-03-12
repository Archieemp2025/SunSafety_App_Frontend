<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const errorMessage = ref('')


const correctPassword = 'sunsafety'

const handleLogin = () => {
  if (password.value === correctPassword) {
    sessionStorage.setItem('authenticated', 'true')
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Incorrect password. Please try again.'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>UV Reality</h1>
      <p>Enter password to access the prototype</p>

      <input
        v-model="password"
        type="password"
        placeholder="Enter password"
        @keyup.enter="handleLogin"
      />

      <button @click="handleLogin">Continue</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f2ee;
  font-family: Georgia, 'Times New Roman', serif;
}

.login-card {
  width: 420px;
  background: white;
  padding: 32px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

h1 {
  margin-bottom: 8px;
  font-size: 2rem;
}

p {
  margin-bottom: 18px;
  color: #444;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d5d5d5;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 14px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #ff7a1a;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.95;
}

.error {
  color: #d62828;
  margin-top: 12px;
}
</style>