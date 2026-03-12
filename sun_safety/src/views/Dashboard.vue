<script setup>
import { useRouter } from 'vue-router'
import UVChart from '../components/UVChart.vue'

const router = useRouter()

const logout = () => {
  sessionStorage.removeItem('authenticated')
  router.push('/')
}
</script>

<template>
    <div class="page-container">
    <div class="app-shell">
        <div class="top-bar dashboard-top-bar">
        <div>
            <h1 class="brand-title">UV Reality</h1>
            <p class="brand-subtitle">Know the facts, share the truth</p>
        </div>

            <button class="btn-dark" @click="logout">Logout</button>
        </div>

        <UVChart />
        </div>
    </div>
</template>
    
<style scoped>
    .dashboard-top-bar{
        margin-bottom: 22px;
    }
</style>