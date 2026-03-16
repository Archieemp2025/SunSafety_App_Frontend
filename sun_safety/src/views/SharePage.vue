<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const myth = computed(() => route.query.myth || 'UV is not Heat')
const fact = computed(
  () =>
    route.query.fact ||
    'Dangerous UV radiation occurs even on cool days. Temperatures and UV levels are completely independent.'
)

const shareLink = computed(() => window.location.href)

const shareTitle = computed(() => 'UV Reality - Share the Truth')

const shareText = computed(() =>
  `Myth: ${myth.value}\nFact: ${fact.value}`
)

const shareMessage = computed(() =>
  `UV Reality - Share the Truth

Myth: ${myth.value}
Fact: ${fact.value}

Learn more: ${shareLink.value}`
)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    alert('Link copied to clipboard')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const openNativeShare = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: shareTitle.value,
        text: shareText.value,
        url: shareLink.value,
      })
    } else {
      await navigator.clipboard.writeText(shareMessage.value)
      alert('Sharing is not supported on this browser. Share text copied instead.')
    }
  } catch (error) {
    console.error('Native share failed:', error)
  }
}

const shareToInstagram = async () => {
  await openNativeShare()
}

const shareToMessenger = async () => {
  await openNativeShare()
}

const shareToWhatsApp = async () => {
    const message = encodeURIComponent(
    `UV Reality - Share the Truth

    Myth: ${myth.value}
    Fact: ${fact.value}

    Learn more: ${shareLink.value}`
    )

    window.open(`https://wa.me/?text=${message}`, '_blank')
}

const shareToFacebookFeed = async () => {
  await openNativeShare()
}

const shareNow = async () => {
  await openNativeShare()
}

const goBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="share-page">
    <div class="share-shell">
      

      <div class="share-hero">
  <div class="share-hero-title-row">
    <span class="share-hero-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="hero-icon-svg">
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="12" y1="1.8" x2="12" y2="4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="12" y1="19.8" x2="12" y2="22.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="1.8" y1="12" x2="4.2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="19.8" y1="12" x2="22.2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="4.6" y1="4.6" x2="6.3" y2="6.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="17.7" y1="17.7" x2="19.4" y2="19.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="17.7" y1="6.3" x2="19.4" y2="4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="4.6" y1="19.4" x2="6.3" y2="17.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </span>

    <h1>Share the Truth</h1>
  </div>

  <p>Help your mates understand UV reality</p>
</div>

      <div class="share-card">
  <div class="share-card-title-row">
    <span class="share-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="card-icon-svg">
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="12" y1="1.8" x2="12" y2="4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="12" y1="19.8" x2="12" y2="22.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="1.8" y1="12" x2="4.2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="19.8" y1="12" x2="22.2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="4.6" y1="4.6" x2="6.3" y2="6.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="17.7" y1="17.7" x2="19.4" y2="19.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="17.7" y1="6.3" x2="19.4" y2="4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="4.6" y1="19.4" x2="6.3" y2="17.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </span>

    <h2>{{ myth }}</h2>
  </div>

  <p>{{ fact }}</p>

  <div class="share-meta">
    <span class="meta-dot red-dot"></span>
    <span>High UV Alert</span>
    <span class="meta-dot gray-dot"></span>
    <span>Australia 2026</span>
  </div>
</div>

      <div class="share-section">
        <h3>Share on Social media</h3>

        <div class="social-grid">
          <button class="social-btn whatsapp" type="button"  @click="shareToWhatsApp"> <span class="social-icon-wrap whatsapp-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="social-icon-svg">
        <path
          d="M12 3.2a8.6 8.6 0 0 0-7.43 12.94L3.4 20.6l4.59-1.14A8.6 8.6 0 1 0 12 3.2Zm0 15.66a7.04 7.04 0 0 1-3.58-.98l-.26-.15-2.72.67.72-2.64-.17-.27a7.04 7.04 0 1 1 6.01 3.37Zm3.86-5.24c-.21-.11-1.25-.61-1.44-.68-.19-.07-.33-.11-.46.11-.14.21-.53.68-.66.82-.12.14-.24.16-.45.05-.21-.11-.88-.32-1.67-1.02-.62-.55-1.03-1.22-1.15-1.43-.12-.21-.01-.32.09-.43.09-.09.21-.24.31-.36.1-.12.14-.21.21-.36.07-.14.03-.27-.02-.38-.05-.11-.46-1.12-.63-1.54-.17-.4-.34-.35-.46-.36h-.39c-.14 0-.36.05-.55.27-.19.21-.73.71-.73 1.72 0 1.01.75 1.98.85 2.12.1.14 1.45 2.22 3.51 3.11.49.21.87.34 1.17.44.49.16.93.14 1.28.09.39-.06 1.25-.51 1.42-1.01.18-.5.18-.93.12-1.01-.05-.09-.19-.14-.39-.25Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span class="social-label">WhatsApp</span></button>
          <button class="social-btn instagram" type="button"  @click="shareToInstagram"> <span class="social-icon-wrap instagram-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="social-icon-svg">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
      </svg>
    </span>
    <span class="social-label">Instagram</span></button>

          <button class="social-btn facebook" type="button" @click="shareToFacebookFeed"> <span class="social-icon-wrap facebook-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="social-icon-svg">
        <path
          d="M13.35 20v-6.52h2.2l.33-2.54h-2.53V9.32c0-.74.2-1.24 1.27-1.24H16V5.8c-.23-.03-1.01-.1-1.92-.1-1.9 0-3.2 1.16-3.2 3.3v1.94H8.72v2.54h2.16V20h2.47Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span class="social-label">Facebook Feed</span></button>

          <button class="social-btn messenger" type="button"  @click="shareToMessenger"> <span class="social-icon-wrap messenger-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="social-icon-svg">
        <path
          d="M12 4.2c-4.36 0-7.9 3.28-7.9 7.33 0 2.31 1.15 4.36 2.95 5.7V20l2.57-1.42c.69.19 1.42.29 2.18.29 4.36 0 7.9-3.28 7.9-7.34S16.36 4.2 12 4.2Zm.78 9.86-2.01-2.14-3.91 2.14 4.31-4.57 2.06 2.14 3.83-2.14-4.28 4.57Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span class="social-label">Messenger</span></button>
        </div>
      </div>

      <div class="share-section">
        <h3>Share link</h3>

        <div class="link-row">
          <input :value="shareLink" readonly class="share-link-input" />
          <button class="copy-btn" type="button" @click="copyLink">Copy</button>
        </div>
      </div>

      <div class="share-actions">
        <button class="share-now-btn" type="button" @click="shareNow">
          Share Now
        </button>
        <button class="back-btn" type="button" @click="goBack">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-page {
  min-height: 100vh;
  background: #f4f1ee;
  padding: 28px 16px 40px;
  box-sizing: border-box;
}

.share-shell {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
}

.share-page-label {
  margin: 0 0 10px;
  font-size: 0.9rem;
  color: #9b938d;
}

.share-hero {
  background: linear-gradient(135deg, #ff6a00 0%, #ff4a4a 45%, #f000b8 100%);
  color: white;
  border-radius: 30px;
  padding: 42px 48px 34px;
  margin-bottom: 36px;
}
.share-hero h1 {
  margin: 0 0 8px;
  font-size: 4.2rem;
  line-height: 1;
  font-weight: 800;
}

.share-hero p {
  margin: 10px 0 0 78px;
  font-size: 1.45rem;
  font-weight: 700;
}

.share-card {
  background: #e8def5;
  border: 1px solid #c9a7ff;
  border-radius: 22px;
  padding: 24px;
  margin-bottom: 26px;
}

.share-card h2 {
  margin: 0 0 12px;
  font-size: 2rem;
  line-height: 1.2;
  color: #1f1b18;
}

.share-card p {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #342f2c;
}

.share-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 3px solid #c79cff;
  color: #2f2930;
  font-size: 0.95rem;
}

.meta-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.red-dot {
  background: #ff2b1f;
}

.gray-dot {
  background: #8d8d8d;
}

.share-section {
  margin-bottom: 28px;
}

.share-section h3 {
  margin: 0 0 16px;
  font-size: 1.45rem;
  color: #1f1b18;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.social-btn {
  min-height: 92px;
  border-radius: 22px;
  border: 1px solid transparent;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  padding: 10px 8px;
}
.whatsapp {
  background: #dff5e5;
  border-color: #8ed6a1;
}

.instagram {
  background: #f8e0ef;
  border-color: #efafd6;
}

.facebook {
  background: #dfe8fb;
  border-color: #9db4ee;
}

.messenger {
  background: #dfe8fb;
  border-color: #aebff3;
}

.link-row {
  display: flex;
  gap: 12px;
}

.share-link-input {
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #ddd4ce;
  background: #f6f3f0;
  padding: 0 14px;
  font-size: 0.98rem;
}

.copy-btn {
  min-width: 90px;
  border-radius: 12px;
  border: 1px solid #ddd4ce;
  background: white;
  cursor: pointer;
  font-weight: 700;
}

.share-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-now-btn {
  height: 60px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #ff6a00 0%, #ff2d6f 50%, #f000b8 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
}

.back-btn {
  height: 48px;
  border: 1px solid #ddd4ce;
  border-radius: 14px;
  background: white;
  color: #3c3530;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.share-hero-title-row {
  display: flex;
  align-items: center;
  gap: 18px;
}

.share-hero-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-icon-svg {
  width: 38px;
  height: 38px;
  display: block;
}

.share-card-title-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 14px;
}

.share-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #9c3cf0;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon-svg {
  width: 30px;
  height: 30px;
  display: block;
}
@media (max-width: 768px) {
  .share-shell {
    max-width: 520px;
  }

  .share-hero {
    padding: 30px 24px 26px;
    border-radius: 22px;
  }

  .share-hero-title-row {
    gap: 14px;
  }

  .share-hero-icon {
    width: 54px;
    height: 54px;
  }

  .hero-icon-svg {
    width: 28px;
    height: 28px;
  }

  .share-hero h1 {
    font-size: 2.5rem;
  }

  .share-hero p {
    margin: 10px 0 0 0;
    font-size: 1.15rem;
  }

  .share-card {
    padding: 26px 22px 22px;
    border-radius: 24px;
  }

  .share-card-icon {
    width: 48px;
    height: 48px;
  }

  .card-icon-svg {
    width: 24px;
    height: 24px;
  }

  .share-card h2 {
    font-size: 2rem;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .link-row {
    flex-direction: column;
  }
}

.social-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.social-icon-svg {
  width: 17px;
  height: 17px;
  display: block;
}

.social-label {
  line-height: 1.1;
}

.whatsapp-icon {
  background: #25d366;
  color: #ffffff;
}

.instagram-icon {
  background: linear-gradient(135deg, #f58529 0%, #dd2a7b 55%, #8134af 100%);
  color: #ffffff;
}

.facebook-icon {
  background: #1877f2;
  color: #ffffff;
}

.messenger-icon {
  background: #1e88ff;
  color: #ffffff;
}
</style>