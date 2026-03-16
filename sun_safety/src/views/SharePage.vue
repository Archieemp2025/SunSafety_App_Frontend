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
        <h1>Share the Truth</h1>
        <p>Help your mates understand UV reality</p>
      </div>

      <div class="share-card">
        <h2>{{ myth }}</h2>
        <p>{{ fact }}</p>

        <div class="share-meta">
          <span>High UV Alert</span>
          <span>Australia 2026</span>
        </div>
      </div>

      <div class="share-section">
        <h3>Share on Social media</h3>

        <div class="social-grid">
          <button class="social-btn whatsapp" type="button"  @click="shareToWhatsApp">WhatsApp</button>
          <button class="social-btn instagram" type="button"  @click="handleInstagramShare">Instagram</button>
          <button class="social-btn facebook" type="button" @click="shareToFacebookFeed">Facebook Feed</button>
          <button class="social-btn messenger" type="button"  @click="handleMessengerShare">Messenger</button>
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
  max-width: 520px;
  margin: 0 auto;
}

.share-page-label {
  margin: 0 0 10px;
  font-size: 0.9rem;
  color: #9b938d;
}

.share-hero {
  background: linear-gradient(135deg, #ff6a00 0%, #ff2d6f 50%, #f000b8 100%);
  color: white;
  border-radius: 20px;
  padding: 34px 28px;
  margin-bottom: 26px;
}

.share-hero h1 {
  margin: 0 0 8px;
  font-size: 2.2rem;
  line-height: 1.1;
  font-weight: 800;
}

.share-hero p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
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
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid #c9a7ff;
  color: #4d4450;
  font-size: 0.95rem;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.social-btn {
  min-height: 72px;
  border-radius: 18px;
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  background: white;
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

@media (max-width: 480px) {
  .share-hero h1 {
    font-size: 1.8rem;
  }

  .share-card h2 {
    font-size: 1.5rem;
  }

  .social-grid {
    grid-template-columns: 1fr 1fr;
  }

  .link-row {
    flex-direction: column;
  }
}
</style>