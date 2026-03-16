<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const mythCards = [

  {
    id: 1,
    myth: "Cool skin doesn't mean safe skin",
    fact: "Australia's UV stays high even when the temperature doesn't.",
  },
  {
    id: 2,
    myth: 'Melanoma is not just a later-life problem',
    fact: 'Young Australians are already in the numbers.',
  },
  {
    id: 3,
    myth: 'Lower than before does not mean low risk',
    fact: 'Sun damage is still showing up in young Australians.',
  },
]

const openSharePage = (card) => {
  router.push({
    path: '/share',
    query: {
      myth: card.myth,
      fact: card.fact,
    },
  })
}

</script>

<template>
  <section class="myth-section">
    <h2 class="myth-title">Myth Busters</h2>
    <p class="myth-subtitle">Share the truth, save your mates</p>

    <div class="myth-grid">
      <article
        v-for="card in mythCards"
        :key="card.id"
        class="myth-card"
      >
        <div class="myth-line">
          <p class="myth-text">{{ card.myth }}</p>
        </div>

        <div class="myth-line">
          <p class="fact-text">{{ card.fact }}</p>
        </div>

        <button class="share-btn" type="button" @click="openSharePage(card)">
          <span class="share-btn-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="share-icon-svg">
              <circle cx="6" cy="12" r="2.6" fill="currentColor" />
              <circle cx="18" cy="6" r="2.6" fill="currentColor" />
              <circle cx="18" cy="18" r="2.6" fill="currentColor" />
              <line x1="8.2" y1="11" x2="15.6" y2="7.1" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
              <line x1="8.2" y1="13" x2="15.6" y2="16.9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            </svg>
          </span>
          <span>Share this</span>
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.myth-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 40px;
  box-sizing: border-box;
  text-align: center;
  overflow-x: hidden;
}

.myth-title {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text-primary);
}

.myth-subtitle {
  margin: 6px 0 24px;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
}

.myth-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 24px;
  align-items: stretch;
}

.myth-card {
  width: 100%;
  min-width: 0;
  background: #ffffff;
  border: 1px solid #e4ddd7;
  border-radius: 14px;
  padding: 18px 18px 16px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  min-height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.myth-line {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.myth-line + .myth-line {
  margin-top: 14px;
}

.myth-icon {
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.myth-icon-danger {
  color: #ff3b30;
}

.myth-icon-safe {
  color: #52c26d;
}

.myth-text,
.fact-text {
  margin: 0;
  line-height: 1.45;
  overflow-wrap: break-word;
  word-break: break-word;
}

.myth-text {
  color: #1f1f1f;
  font-weight: 700;
}

.fact-text {
  color: #3f3a36;
}

.share-btn {
  margin: 18px auto 0;
  min-width: 132px;
  padding: 9px 16px;
  border: 1px solid #e1dcd7;
  border-radius: 8px;
  background: #ffffff;
  color: #6a625c;
  font-size: 0.95rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 900px) {
  .myth-grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 640px) {
  .myth-section {
    padding: 28px 12px 36px;
  }

  .myth-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .myth-card {
    min-height: auto;
  }
}
  .share-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.share-icon-svg {
  width: 16px;
  height: 16px;
  display: block;
}
</style>