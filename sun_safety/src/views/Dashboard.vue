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
            <div class="brand-block">
                <div class="brand-row">
                    <span class="brand-logo" aria-hidden="true">
                        <span class="brand-logo-triangle"></span>
                    </span>
                    <h1 class="brand-title">UV Reality</h1>
                </div>
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

    .brand-block {
  display: flex;
  flex-direction: column;
}

    .brand-row {
    display: flex;
    align-items: center;
    gap: 10px;
    }

    .brand-logo {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #f26a13;
    position: relative;
    flex-shrink: 0;
    display: inline-block;
    }

    .brand-logo-triangle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    transform: translate(-50%, -46%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 9px solid #ffffff;
    }

    .brand-logo-triangle::after {
    content: '';
    position: absolute;
    left: -1px;
    top: 3px;
    width: 2px;
    height: 3px;
    background: #f26a13;
    border-radius: 1px;
    }

    .brand-title {
    margin: 0;
    line-height: 1;
    }

    .brand-subtitle {
    margin: 6px 0 0 32px;
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