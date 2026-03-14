<script setup>
import { computed, onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
)

const uvApiUrl ='https://sunsafetyapp-backend-api.onrender.com/api/uv/year-summary'
// const uvApiUrl = 'https://cityfied-warmish-gena.ngrok-free.dev/api/uv/year-summary'

const isLoading = ref(true)
const errorMessage = ref('')
const uvData = ref([])


const fetchUvSummary = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await fetch(uvApiUrl, {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch UV data: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Unexpected API response format.')
    }

    uvData.value = data
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load UV chart data.'
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchUvSummary()
})

const chartData = computed(() => {
  const labels = uvData.value.map((item) => item.year)

  return {
    labels,
    datasets: [
      {
        label: 'UV High',
        data: uvData.value.map((item) => item.australian_uv_high),
        borderColor: '#ff3b30',
        backgroundColor: '#ff3b30',
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'UV Median',
        data: uvData.value.map((item) => item.australian_uv_median),
        borderColor: '#7e57c2',
        backgroundColor: '#7e57c2',
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'UV Low',
        data: uvData.value.map((item) => item.australian_uv_low),
        borderColor: '#4caf50',
        backgroundColor: '#4caf50',
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10,
          padding: 24,
          color: '#2f2a26',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1f1f1f',
        bodyColor: '#1f1f1f',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 14,
        bodySpacing: 8,
        titleMarginBottom: 10,
        boxPadding: 6,
        displayColors: true,
        callbacks: {
          title: (tooltipItems) => `Year: ${tooltipItems[0].label}`,
          label: (context) => {
      const value =
        typeof context.parsed.y === 'number'
          ? context.parsed.y.toFixed(2)
          : context.parsed.y
      return ` ${context.dataset.label}: ${value}`
    },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: '#2f2a26',
          font: {
            size: 13,
            weight: '600',
          },
        },
        ticks: {
          color: '#2f2a26',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'UV Index Range',
          color: '#2f2a26',
          font: {
            size: 13,
            weight: '600',
          },
        },
        ticks: {
          color: '#2f2a26',
        },
        grid: {
          color: '#ece7e2',
        },
      },
    },
  }
})
</script>

<template>
  <div class="card">
    <div class="chart-head">
        <h2 class="chart-title">UV Index Range</h2>
        <p class="chart-subtitle">Annual comparison showing UV Index range</p>
    </div>

    <div v-if="isLoading" class="chart-state">Loading UV chart...</div>
    <div v-else-if="errorMessage" class="chart-state error-text">
      {{ errorMessage }}
    </div>
    <div v-else class="chart-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>

    <div class="message-box-soft message-box-purple chart-note">
      <strong>Myth Busted:</strong> High UV does not depend on high temperature.
      Even cool days can still record dangerous UV levels.
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-head {
  min-height: 88px;
}
.chart-title {
  margin: 0 0 6px;
  font-size: 2rem;
  color: var(--color-text-primary);
}

.chart-subtitle {
  margin: 0 0 18px;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.chart-wrapper {
    flex: 1;
  height: 360px;
}

.chart-state {
  flex: 1;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  background: #faf7f4;
  border-radius: 16px;
}

.chart-note {
  margin-top: 18px;
}
</style>