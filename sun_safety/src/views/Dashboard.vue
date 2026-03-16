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

<div class="group-banner-row">
  <div class="group-banner">
    <h3 class="group-banner-title">Make it a group thing</h3>
    <p class="group-banner-text">
      When your whole crew knows the facts, staying sun-safe becomes the norm, not the chore.
      Share this with your mates and make UV awareness a social habit.
      <span class="group-banner-emoji" aria-hidden="true">🙂</span>
    </p>
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

.group-banner-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
}

.group-banner {
  width: 100%;
  max-width: 1200px;
  border-radius: 28px;
  background: linear-gradient(135deg, #f2b206 0%, #f68a2d 35%, #ff4b6d 65%, #ef00b8 100%);
  color: #ffffff;
  text-align: center;
  padding: 18px 28px 20px;
  box-sizing: border-box;
}

.group-banner-title {
  margin: 0 0 6px;
  font-size: 2rem;
  line-height: 1.05;
  font-weight: 800;
}

.group-banner-text {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.45;
  font-weight: 600;
}

.group-banner-emoji {
  display: inline-block;
  margin-left: 4px;
}
@media (max-width: 980px) {
    .charts-grid {
        grid-template-columns: 1fr;
    }
    .myth-section-row{
        margin-top: 28px;
    }

    .group-banner {
  padding: 16px 18px 18px;
  border-radius: 22px;
}

.group-banner-title {
  font-size: 1.5rem;
}

.group-banner-text {
  font-size: 0.9rem;
}
}
        
</style>