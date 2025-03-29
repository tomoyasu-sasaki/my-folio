<script setup lang="ts">
import Header from '../components/home/parts/HomeHeader.vue'
import Footer from '../components/global/FooterView.vue'
import AboutSection from '../components/home/section/AboutSection.vue'
import ProjectSection from '../components/home/section/ProjectSection.vue'
import SkillSection from '../components/home/section/SkillSection.vue'
// import BlogSection from '../components/home/section/BlogSection.vue'
import GallerySection from '../components/home/section/GallerySection.vue'
import CarrerSection from '../components/home/section/CarrerSection.vue'

import { onMounted, onUnmounted, reactive } from 'vue'
import { useScrollStore } from '../stores/scroll'
import { useTranslation } from '../composables/useTranslation'
import type { SectionName } from '../locales/types'
import { useRouter } from 'vue-router'
import { logger } from '../utils/logger'

const router = useRouter()
const store = useScrollStore()
const { t } = useTranslation()

// マウス位置トラッキング用の状態
const mousePos = reactive({ x: 0, y: 0 })
const updateMousePos = (e: MouseEvent): void => {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

// セクションのアニメーション状態
interface AnimatedSections {
  [key: string]: boolean;
}
const animatedSections = reactive<AnimatedSections>({})

// セクション定義
const sections = [
  { id: 'about', component: AboutSection, bgClass: 'bg-gradient-1' },
  { id: 'project', component: ProjectSection, bgClass: 'bg-gradient-2' },
  { id: 'skill', component: SkillSection, bgClass: 'bg-gradient-3' },
//   { id: 'blog', component: BlogSection, bgClass: 'bg-gradient-3' },
  { id: 'gallery', component: GallerySection, bgClass: 'bg-gradient-4' },
  { id: 'career', component: CarrerSection, bgClass: 'bg-gradient-5' }
]

// 翻訳されたセクションタイトルを取得する関数
const getSectionTitle = (sectionId: string): string => {
    const section: SectionName = 'navigation'
    return t({ section, key: sectionId, subKey: 'text' })
}

// Intersection Observerのコールバック
const observerCallback = (entries: IntersectionObserverEntry[]): void => {
  entries.forEach(entry => {
    const sectionId = entry.target.getAttribute('data-section-id')
    if (sectionId) {
      if (entry.isIntersecting) {
        // アニメーション状態を更新
        animatedSections[sectionId] = true
        logger.debug('Section became visible', { sectionId })
      }
    }
  })
}

// スクロールイベントのハンドラー
const handleScroll = (): void => {
    requestAnimationFrame(() => {
        store.updateActiveSection()
    })
}

onMounted(() => {
    router.push('/')
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', updateMousePos)
    
    // 初期値としてaboutセクションをすぐに表示
    animatedSections['about'] = true
    
    // Intersection Observerの設定
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1, // より早くアニメーションを開始
      rootMargin: '50px' // ビューポートの上下50pxの位置でトリガー
    })
    
    // 各セクションを監視し、スクロールストアに登録
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
        // スクロールストアにセクション要素を登録
        store.registerSectionRef(section.id, element)
        // 初期状態を設定（aboutセクション以外）
        if (section.id !== 'about') {
          animatedSections[section.id] = false
        }
      } else {
        logger.warn(`Section element not found: ${section.id}`)
      }
    })

    // 初期スクロール位置に基づいてアクティブセクションを設定
    store.updateActiveSection()

    // 初期表示時に画面内に表示されているセクションをアニメーション表示
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element && isElementInViewport(element)) {
        animatedSections[section.id] = true
      }
    })
})

// 要素が画面内に表示されているかを判定する関数
const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -50 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', updateMousePos)
})
</script>

<template>
    <Header />
    <main>
        <div 
            v-for="{ id, component, bgClass } in sections" 
            :id="id"
            :key="id" 
            :class="[
                'section-container',
                { 'animated-in': animatedSections[id] }
            ]"
            :data-section-id="id"
        >
            <div 
                v-if="bgClass"
                :class="[bgClass, 'section-header']"
                :style="{
                    '--mouse-x': `${mousePos.x}px`,
                    '--mouse-y': `${mousePos.y}px`
                }"
            >
                <div class="interactive-particle"></div>
                <div class="interactive-particle"></div>
                <div class="interactive-particle"></div>
                
                <h1 class="sec-title" :class="{ 'title-animated': animatedSections[id] }">
                    <span v-for="(char, index) in getSectionTitle(id)" :key="index" :style="`--char-index: ${index}`">
                        {{ char }}
                    </span>
                </h1>
            </div>
            <div class="section-content">
                <component :is="component" />
            </div>
        </div>
    </main>
    <Footer />
</template>

<style scoped>
.section-container {
    position: relative;
    scroll-margin-top: 64px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-container.animated-in {
    opacity: 1;
    transform: translateY(0);
}

.section-content {
    
    padding: 2rem 0;
}

.section-header {
    height: 400px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.5s ease;
}

.section-header:hover {
    height: 420px;
}

.section-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="none" width="100" height="100"/><rect fill-opacity="0.05" x="0" y="0" width="50" height="50"/><rect fill-opacity="0.05" x="50" y="50" width="50" height="50"/></svg>');
    background-size: 40px 40px;
    opacity: 0.3;
    z-index: 1;
    animation: backgroundScroll 30s linear infinite;
}

.sec-title {
    width: 100%;
    color: #ffffff;
    text-align: center;
    font-size: 72px;
    font-weight: 700;
    position: relative;
    z-index: 2;
    letter-spacing: 2px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
}

.sec-title span {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    transition-delay: calc(var(--char-index) * 0.05s);
}

.title-animated span {
    opacity: 1;
    transform: translateY(0);
}

/* モダンなグラデーション背景 */
.bg-gradient-1 {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.bg-gradient-2 {
    background: linear-gradient(135deg, #10b981, #3b82f6);
}

.bg-gradient-3 {
    background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.bg-gradient-4 {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

.bg-gradient-5 {
    background: linear-gradient(135deg, #14b8a6, #22c55e);
}

/* インタラクティブパーティクル */
.interactive-particle {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.8s ease-out;
}

.section-header:hover .interactive-particle:nth-child(1) {
    transform: translate(calc(var(--mouse-x) / 10 - 50%), calc(var(--mouse-y) / 10 - 50%));
}

.section-header:hover .interactive-particle:nth-child(2) {
    transform: translate(calc(-1 * var(--mouse-x) / 15 - 50%), calc(var(--mouse-y) / 15 - 50%));
}

.section-header:hover .interactive-particle:nth-child(3) {
    transform: translate(calc(var(--mouse-x) / 20 - 50%), calc(-1 * var(--mouse-y) / 20 - 50%));
}

/* アニメーション定義 */
@keyframes backgroundScroll {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 100px 100px;
    }
}

@media (max-width: 600px) {
    .section-container {
        scroll-margin-top: 56px;
    }

    .section-header {
        height: 300px;
    }

    .section-header:hover {
        height: 310px;
    }

    .sec-title {
        font-size: 48px;
    }
    
    .interactive-particle {
        width: 100px;
        height: 100px;
    }
}

main {
    min-height: 100vh;
}

h2 {
    padding-top: 2rem;
    color: var(--v-theme-on-surface);
}
</style>
