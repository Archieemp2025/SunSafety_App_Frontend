<script setup>

defineOptions({
  name: 'Dashboard',
})

import { useRouter } from 'vue-router'
import UVChart from '../components/UVChart.vue'
import CancerTrendChart from '../components/CancerTrendChart.vue'
import MythBuster from '../components/MythBuster.vue'
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
        
        <div class = "charts-grid">
            <CancerTrendChart />
            <UVChart />
        </div>
        <div class="myth-section-row">
            <div class="myth-section-shell">
                <MythBuster />
            </div>
        </div>
            
        
        
    </div>
    </div>
</template>
    
<style scoped>
    .dashboard-top-bar{
        margin-bottom: 28px;
    }
    .charts-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(420px, 1fr));
    gap: 28px;
    align-items: stretch;
    }

    .charts-grid > * {
    min-width: 0;
    }

    .myth-section-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
}

.myth-section-shell {
  width: 100%;
  max-width: 1200px;
}

@media (max-width: 980px) {
    .charts-grid {
        grid-template-columns: 1fr;
    }
    .myth-section-row{
        margin-top: 28px;
    }
}
        
</style>