<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const ageGroupsUrl = 'https://cityfied-warmish-gena.ngrok-free.dev/api/age-groups'
const melanomaUrl = 'https://cityfied-warmish-gena.ngrok-free.dev/api/melanoma/incidence'

const isLoadingAgeGroups = ref(true)
const isLoadingChart = ref(true)
const errorMessage = ref('')

const ageGroups = ref([])
const selectedAgeGroup = ref('20-29')
const cancerData = ref([])

const chartData = computed(() => {
  return {
    labels: cancerData.value.map((item) => item.year),
    datasets: [
      {
        label: 'Incidence Count',
        data: cancerData.value.map((item) => item.count),
        backgroundColor: '#f0c27b',
        borderColor: '#d39a42',
        borderWidth: 1.5,
        borderRadius: 4,
        maxBarThickness: 40,
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
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 22,
          color: '#2f2a26',
          font: {
            size: 13,
            weight: '600',
          },
        },
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
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => `Year: ${tooltipItems[0].label}`,
          label: (context) => `Incidence Count: ${context.parsed.y}`,
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
        beginAtZero: true,
        title: {
          display: true,
          text: 'Incidence Count',
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

const fetchAgeGroups = async () => {
  try {
    isLoadingAgeGroups.value = true
    errorMessage.value = ''

    const response = await fetch(ageGroupsUrl, {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch age groups: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Unexpected age group response format.')
    }

    ageGroups.value = data
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load age groups.'
  } finally {
    isLoadingAgeGroups.value = false
  }
}

const fetchCancerData = async () => {
  try {
    isLoadingChart.value = true
    errorMessage.value = ''

    const query = new URLSearchParams({
      sex: 'Persons',
      age_group: selectedAgeGroup.value,
      year_from: '2007',
      year_to: '2023',
    })

    const response = await fetch(`${melanomaUrl}?${query.toString()}`, {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch cancer data: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Unexpected melanoma response format.')
    }

    cancerData.value = data
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load cancer chart data.'
  } finally {
    isLoadingChart.value = false
  }
}

onMounted(async () => {
  await fetchAgeGroups()

  const hasDefaultAgeGroup = ageGroups.value.some(
    (item) => item.age_bracket === '20-29',
  )

  if (!hasDefaultAgeGroup && ageGroups.value.length > 0) {
    selectedAgeGroup.value = ageGroups.value[0].age_bracket
  }

  await fetchCancerData()
})

watch(selectedAgeGroup, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchCancerData()
  }
})
</script>

<template>
  <div class="card">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Youth Risk Profile</h2>
        <p class="chart-subtitle">
          Melanoma incidence count by year for the selected age group
        </p>
      </div>

      <div class="filter-wrap">
        <label class="filter-label" for="age-group-select">Age Group</label>
        <select
          id="age-group-select"
          v-model="selectedAgeGroup"
          class="filter-select"
          :disabled="isLoadingAgeGroups"
        >
          <option
            v-for="group in ageGroups"
            :key="group.age_group_id"
            :value="group.age_bracket"
          >
            {{ group.age_bracket }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="isLoadingChart" class="chart-state">Loading cancer chart...</div>
    <div v-else-if="errorMessage" class="chart-state error-text">
      {{ errorMessage }}
    </div>
    <div v-else class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <div class="cancer-note">
      <strong>Reality Check:</strong> Melanoma risk is not only an older-age issue.
      Early exposure to harmful UV can contribute to rising incidence patterns in
      younger groups as well.
    </div>
  </div>
</template>

<style scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 18px;
}

.chart-title {
  margin: 0 0 6px;
  font-size: 2rem;
  color: var(--color-text-primary);
}

.chart-subtitle {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.filter-wrap {
  min-width: 180px;
}

.filter-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: #efefef;
  color: #2f2a26;
}

.chart-wrapper {
  height: 360px;
}

.chart-state {
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  background: #faf7f4;
  border-radius: 16px;
}

.cancer-note {
  margin-top: 18px;
  border-radius: 14px;
  padding: 14px 16px;
  line-height: 1.5;
  background: #f4d8b8;
  color: #443327;
}

@media (max-width: 980px) {
  .chart-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-wrap {
    min-width: unset;
  }
}
</style>