<script setup>
defineOptions({
  name: 'Dashboard',
})

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UVChart from '../components/UVChart.vue'
import CancerTrendChart from '../components/CancerTrendChart.vue'
import MythBuster from '../components/MythBuster.vue'

const router = useRouter()

const activeTab = ref('uv')
const searchQuery = ref('')
const selectedLocationId = ref('Melbourne')

const xmlUrl = 'https://uvdata.arpansa.gov.au/xml/'

const isLoading = ref(false)
const loadError = ref('')
const stations = ref([])

const logout = () => {
  sessionStorage.removeItem('authenticated')
  router.push('/')
}

const getRiskLevel = (uvIndex) => {
  const uv = Number(uvIndex)

  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

const getRiskClass = (uvIndex) => {
  const uv = Number(uvIndex)

  if (uv <= 2) return 'risk-low'
  if (uv <= 5) return 'risk-moderate'
  if (uv <= 7) return 'risk-high'
  if (uv <= 10) return 'risk-very-high'
  return 'risk-extreme'
}

const getProtectionMessage = (uvIndex) => {
  const uv = Number(uvIndex)

  if (uv <= 2) {
    return 'Low risk right now. Protection is still recommended for longer outdoor exposure.'
  }
  if (uv <= 5) {
    return 'Moderate UV. Use sunscreen, sunglasses, and seek shade during longer outdoor activity.'
  }
  if (uv <= 7) {
    return 'High UV. Sun protection is strongly recommended.'
  }
  if (uv <= 10) {
    return 'Very high UV. Minimise direct sun exposure and use full protection.'
  }
  return 'Extreme UV. Avoid direct sun exposure where possible and use full protection.'
}

const fetchUVData = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const response = await fetch(xmlUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch XML data: ${response.status}`)
    }

    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml')

    const parserError = xmlDoc.querySelector('parsererror')
    if (parserError) {
      throw new Error('Invalid XML response')
    }

    const locationNodes = Array.from(xmlDoc.querySelectorAll('location'))

    const parsedStations = locationNodes.map((node) => ({
      id: node.getAttribute('id') || '',
      name: node.querySelector('name')?.textContent?.trim() || '',
      index: node.querySelector('index')?.textContent?.trim() || '0.0',
      time: node.querySelector('time')?.textContent?.trim() || '',
      date: node.querySelector('date')?.textContent?.trim() || '',
      fullDate: node.querySelector('fulldate')?.textContent?.trim() || '',
      utcDateTime: node.querySelector('utcdatetime')?.textContent?.trim() || '',
      status: node.querySelector('status')?.textContent?.trim() || 'unknown',
    }))

    stations.value = parsedStations

    const hasDefaultLocation = parsedStations.some(
      (station) => station.id === selectedLocationId.value
    )

    if (!hasDefaultLocation && parsedStations.length > 0) {
      selectedLocationId.value = parsedStations[0].id
    }
  } catch (error) {
    console.error(error)
    loadError.value =
      'Unable to load live UV data at the moment. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const filteredStations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return stations.value

  return stations.value.filter((station) =>
    station.id.toLowerCase().includes(query)
  )
})

const selectedStation = computed(() => {
  return (
    stations.value.find((station) => station.id === selectedLocationId.value) ||
    null
  )
})

const topAustralianCities = computed(() => {
  const preferred = [
    'Melbourne',
    'Sydney',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Canberra',
    'Darwin',
    'Gold Coast',
    'Newcastle',
    'Townsville',
  ]

  return preferred
    .map((city) => stations.value.find((station) => station.id === city))
    .filter(Boolean)
})

const selectLocation = (cityId) => {
  selectedLocationId.value = cityId
  searchQuery.value = cityId
}

onMounted(() => {
  fetchUVData()
})
</script>

<template>
  <div class="page-container">
    <div class="app-shell dashboard-shell">
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

        <button type="button" class="btn-dark" @click="logout">Logout</button>
      </div>

      <div class="dashboard-tabs">
        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'uv' }"
          @click="activeTab = 'uv'"
        >
          Live UV Index
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'insights' }"
          @click="activeTab = 'insights'"
        >
          Insights
        </button>
      </div>

      <template v-if="activeTab === 'uv'">
        <section class="hero-card compact-hero">
          <div class="hero-content">
            <p class="hero-badge">Live ARPANSA UV Feed</p>
            <h2 class="hero-title-large">
              Check the current UV index for your city
            </h2>
            <p class="hero-text">
              Search a location, view the live UV index instantly, and follow the right
              protection advice.
            </p>
          </div>

          <div class="hero-info-panel compact-info-panel">
            <div class="hero-info-chip">Live city-based monitoring</div>
            <div class="hero-info-chip">Instant UV risk level</div>
            <div class="hero-info-chip">Simple protection guidance</div>
          </div>

          <div class="hero-actions compact-actions">
            <button type="button" class="btn-primary" @click="fetchUVData">
              Refresh Live Data
            </button>
            <button type="button" class="btn-secondary" @click="activeTab = 'insights'">
              View Insights
            </button>
          </div>
        </section>

        <section class="search-section">
          <div class="search-card">
            <div class="search-header">
              <div>
                <h3 class="section-title">Find a location</h3>
                <p class="section-text">
                  Type a city name or choose one from the quick locations below.
                </p>
              </div>
            </div>

            <div class="search-controls">
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                placeholder="Search city, e.g. Melbourne"
              />

              <select
                v-model="selectedLocationId"
                class="search-select"
              >
                <option
                  v-for="station in filteredStations"
                  :key="station.id"
                  :value="station.id"
                >
                  {{ station.id }}
                </option>
              </select>
            </div>

            <div class="quick-city-list">
              <button
                v-for="station in topAustralianCities"
                :key="station.id"
                type="button"
                class="quick-city-btn"
                :class="{ active: selectedLocationId === station.id }"
                @click="selectLocation(station.id)"
              >
                {{ station.id }}
              </button>
            </div>
          </div>
        </section>

        <section v-if="isLoading" class="state-card">
          <h3 class="section-title">Loading live UV data...</h3>
          <p class="section-text">Please wait while the latest data is fetched.</p>
        </section>

        <section v-else-if="loadError" class="state-card error-card">
          <h3 class="section-title">Could not load live data</h3>
          <p class="section-text">{{ loadError }}</p>
        </section>

        <template v-else-if="selectedStation">
          <section class="uv-summary-grid">
            <div class="uv-main-card">
              <div class="uv-main-top">
                <div>
                  <p class="mini-label">Selected Location</p>
                  <h3 class="uv-location">{{ selectedStation.id }}</h3>
                </div>

                <div
                  class="risk-pill"
                  :class="getRiskClass(selectedStation.index)"
                >
                  {{ getRiskLevel(selectedStation.index) }}
                </div>
              </div>

              <div class="uv-index-wrap">
                <span class="uv-index-number">{{ selectedStation.index }}</span>
                <span class="uv-index-label">Current UV Index</span>
              </div>

              <p class="uv-message">
                {{ getProtectionMessage(selectedStation.index) }}
              </p>
            </div>

            <div class="info-card">
              <p class="mini-label">Local Time</p>
              <h4>{{ selectedStation.time }}</h4>
              <p class="muted-text">{{ selectedStation.fullDate }}</p>
            </div>

            <div class="info-card">
              <p class="mini-label">Status</p>
              <h4 class="status-ok">{{ selectedStation.status }}</h4>
              <p class="muted-text">Feed updated from ARPANSA XML</p>
            </div>

            <div class="info-card">
              <p class="mini-label">UTC Datetime</p>
              <h4>{{ selectedStation.utcDateTime }}</h4>
              <p class="muted-text">Reference timestamp from live feed</p>
            </div>
          </section>

          <section class="awareness-grid">
            <div class="awareness-card">
              <h3 class="section-title">Awareness</h3>
              <p class="section-text">
                UV radiation and temperature are not the same thing. A cooler day can
                still have harmful UV exposure, so checking the live UV index is more
                reliable than judging by heat alone.
              </p>
            </div>

            <div class="awareness-card">
              <h3 class="section-title">Protection Tips</h3>
              <ul class="tips-list">
                <li>Use SPF 30+ or higher sunscreen.</li>
                <li>Wear sunglasses, a hat, and protective clothing.</li>
                <li>Seek shade during stronger UV periods.</li>
                <li>Reapply sunscreen if you stay outdoors.</li>
              </ul>
            </div>

            <div class="awareness-card">
              <h3 class="section-title">Why it matters</h3>
              <p class="section-text">
                Consistent UV awareness helps reduce skin damage risk and supports
                healthier outdoor habits, especially for young adults who spend long
                hours outside.
              </p>
            </div>
          </section>
        </template>
      </template>

      <template v-else>
        <div class="charts-grid">
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
              When your whole crew knows the facts, staying sun-safe becomes the norm,
              not the chore. Share this with your mates and make UV awareness a social habit.
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  padding: 20px 16px;
  background:
    radial-gradient(circle at top left, rgba(255, 195, 80, 0.14), transparent 28%),
    radial-gradient(circle at top right, rgba(255, 128, 0, 0.12), transparent 24%),
    linear-gradient(180deg, #fffaf3 0%, #fff7ee 100%);
}

.dashboard-shell {
  width: min(1280px, 100%);
  margin: 0 auto;
  border-radius: 28px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(242, 106, 19, 0.12);
  box-shadow: 0 18px 50px rgba(16, 24, 40, 0.08);
  backdrop-filter: blur(10px);
}

.dashboard-top-bar {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
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
  font-size: 2.3rem;
  color: #111827;
}

.brand-subtitle {
  margin: 6px 0 0 32px;
  color: #6b7280;
  font-size: 1rem;
}

.dashboard-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  border: none;
  background: transparent;
  color: #475569;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: linear-gradient(135deg, #f26a13, #ffb347);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(242, 106, 19, 0.22);
}

.btn-primary,
.btn-secondary,
.btn-dark {
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  border-radius: 14px;
  padding: 12px 18px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #f26a13, #ffad43);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(242, 106, 19, 0.22);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(242, 106, 19, 0.28);
}

.btn-secondary {
  background: #ffffff;
  color: #374151;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
}

.btn-secondary:hover {
  transform: translateY(-1px);
  background: #fff7ef;
  border-color: #f7c59f;
  color: #d95500;
}

.btn-dark {
  background: #1f1f1f;
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
}

.btn-dark:hover {
  transform: translateY(-1px);
  background: #111111;
}

.hero-card {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 18px;
  border-radius: 24px;
  padding: 20px 24px;
  margin-bottom: 18px;
  background: linear-gradient(135deg, #fff4e6 0%, #ffffff 100%);
  border: 1px solid rgba(242, 106, 19, 0.14);
  box-shadow: 0 10px 24px rgba(242, 106, 19, 0.07);
}

.compact-hero {
  align-items: center;
}

.hero-badge {
  margin: 0 0 10px;
  font-size: 0.84rem;
  font-weight: 800;
  color: #e35b00;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-title-large {
  margin: 0 0 10px;
  font-size: clamp(1.55rem, 2.3vw, 2.3rem);
  line-height: 1.12;
  color: #111827;
}

.hero-text {
  margin: 0;
  color: #4b5563;
  line-height: 1.55;
  max-width: 700px;
  font-size: 0.98rem;
}

.hero-info-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.compact-info-panel {
  gap: 10px;
}

.hero-info-chip {
  padding: 14px 16px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-left: 4px solid #f26a13;
  font-weight: 600;
  color: #374151;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.compact-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.search-section,
.uv-summary-grid,
.awareness-grid,
.charts-grid,
.myth-section-row,
.group-banner-row {
  width: 100%;
}

.search-card,
.uv-main-card,
.info-card,
.awareness-card,
.state-card {
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.search-card {
  margin-bottom: 18px;
}

.search-header {
  margin-bottom: 18px;
}

.section-title {
  margin: 0 0 8px;
  color: #111827;
  font-size: 1.1rem;
}

.section-text {
  margin: 0;
  color: #6b7280;
  line-height: 1.65;
}

.search-controls {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  margin-bottom: 16px;
}

.search-input,
.search-select {
  width: 100%;
  border: 1px solid #dbe3ec;
  border-radius: 14px;
  padding: 13px 14px;
  font-size: 0.98rem;
  outline: none;
  background: #fcfdff;
  color: #111827;
}

.search-input:focus,
.search-select:focus {
  border-color: #f26a13;
  box-shadow: 0 0 0 4px rgba(242, 106, 19, 0.1);
}

.quick-city-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-city-btn {
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.quick-city-btn:hover,
.quick-city-btn.active {
  background: #fff3e8;
  border-color: #f7c59f;
  color: #d95500;
}

.uv-summary-grid {
  display: grid;
  grid-template-columns: 1.45fr 1fr 1fr 1fr;
  gap: 16px;
  align-items: stretch;
  margin-bottom: 18px;
}

.uv-main-card {
  background: linear-gradient(135deg, #fff7ef 0%, #ffffff 100%);
}

.uv-main-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}

.mini-label {
  margin: 0 0 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #f26a13;
}

.uv-location {
  margin: 0;
  font-size: 1.6rem;
  color: #111827;
}

.uv-index-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

.uv-index-number {
  font-size: 3.4rem;
  line-height: 1;
  font-weight: 800;
  color: #111827;
}

.uv-index-label {
  margin-top: 8px;
  color: #6b7280;
  font-weight: 600;
}

.uv-message {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

.risk-pill {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 800;
  white-space: nowrap;
}

.risk-low {
  background: #e8f7ec;
  color: #166534;
}

.risk-moderate {
  background: #fff7db;
  color: #9a6700;
}

.risk-high {
  background: #ffe7cc;
  color: #c2410c;
}

.risk-very-high {
  background: #ffe2e2;
  color: #b91c1c;
}

.risk-extreme {
  background: #f3e8ff;
  color: #7e22ce;
}

.info-card h4 {
  margin: 0 0 8px;
  font-size: 1.05rem;
  color: #111827;
  word-break: break-word;
}

.muted-text {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.status-ok {
  text-transform: capitalize;
  color: #15803d;
}

.awareness-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 8px;
}

.tips-list {
  margin: 0;
  padding-left: 18px;
  color: #4b5563;
  line-height: 1.8;
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
  margin-top: 40px;
}

.myth-section-shell {
  width: 100%;
  max-width: 1200px;
}

.group-banner-row {
  display: flex;
  justify-content: center;
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

.error-card {
  border: 1px solid #fecaca;
  background: #fff7f7;
}

@media (max-width: 1080px) {
  .hero-card,
  .uv-summary-grid,
  .awareness-grid,
  .search-controls,
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .compact-actions {
    grid-column: auto;
  }
}

@media (max-width: 980px) {
  .myth-section-row {
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

@media (max-width: 640px) {
  .dashboard-shell {
    padding: 18px;
    border-radius: 24px;
  }

  .dashboard-top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-tabs {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    text-align: center;
  }

  .hero-card {
    padding: 20px;
  }

  .uv-index-number {
    font-size: 2.8rem;
  }

  .brand-title {
    font-size: 2rem;
  }

  .brand-subtitle {
    margin-left: 0;
  }
}
</style>