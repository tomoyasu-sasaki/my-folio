<script setup lang="ts">
import Header from '../components/home/parts/HomeHeader.vue'
import Footer from '../components/global/FooterView.vue'
import AboutSection from '../components/home/section/AboutSection.vue'
import ProjectSection from '../components/home/section/ProjectSection.vue'
import SkillSection from '../components/home/section/SkillSection.vue'
// import BlogSection from '../components/home/section/BlogSection.vue'
import GallerySection from '../components/home/section/GallerySection.vue'
import CarrerSection from '../components/home/section/CarrerSection.vue'
// import ContactSection from '../components/home/section/ContactSection.vue'

import { onMounted, onUnmounted, reactive } from 'vue'
import { useScrollStore } from '../stores/scroll'
import { useLanguageStore } from '../stores/language'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useScrollStore()
const languageStore = useLanguageStore()

// マウス位置トラッキング用の状態
const mousePos = reactive({ x: 0, y: 0 })
const updateMousePos = (e) => {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

// セクションのアニメーション状態
const animatedSections = reactive({})

// セクション定義
const sections = [
  { id: 'about', component: AboutSection, bgClass: '' },
  { id: 'project', component: ProjectSection, bgClass: 'bg-gradient-1' },
  { id: 'skill', component: SkillSection, bgClass: 'bg-gradient-2' },
  // { id: 'blog', component: BlogSection, bgClass: 'bg-gradient-3' },
  { id: 'gallery', component: GallerySection, bgClass: 'bg-gradient-4' },
  { id: 'career', component: CarrerSection, bgClass: 'bg-gradient-5' },
  // { id: 'contact', component: ContactSection, bgClass: '' }
]

// 翻訳されたセクションタイトルを取得する関数
const getSectionTitle = (sectionId) => {
  return languageStore.t('navigation', sectionId)
}

// Intersection Observerのコールバック
const observerCallback = (entries) => {
  entries.forEach(entry => {
    const sectionId = entry.target.getAttribute('data-section-id')
    if (sectionId) {
      if (entry.isIntersecting) {
        animatedSections[sectionId] = true
      }
    }
  })
}

// スクロールイベントのハンドラー
const handleScroll = () => {
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
      threshold: 0.2,
      rootMargin: '0px'
    })
    
    // 各セクションを監視
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
        // 初期状態を設定
        animatedSections[section.id] = false
      }
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', updateMousePos)
})
</script>

<template>
    <Header />
    <v-main class="pt-0">
        <!-- About セクション（特別扱い） -->
        <section
            :ref="el => store.registerSectionRef('about', el)"
            class="section-container"
            id="about"
            data-section-id="about"
            :class="{ 'animated-in': animatedSections['about'] }"
        >
            <AboutSection />
        </section>

        <!-- 他のセクションを動的に生成 -->
        <template v-for="section in sections.slice(1)" :key="section.id">
            <section 
                v-if="section.component" 
                :ref="el => store.registerSectionRef(section.id, el)" 
                class="section-container"
                :id="section.id"
                :data-section-id="section.id"
                :class="{ 'animated-in': animatedSections[section.id] }"
            >
                <div 
                    :class="[section.bgClass, 'section-header']" 
                    v-if="section.bgClass"
                    :style="{
                        '--mouse-x': `${mousePos.x}px`,
                        '--mouse-y': `${mousePos.y}px`
                    }"
                >
                    <div class="interactive-particle"></div>
                    <div class="interactive-particle"></div>
                    <div class="interactive-particle"></div>
                    
                    <h1 class="sec-title" :class="{ 'title-animated': animatedSections[section.id] }">
                        <span v-for="(char, index) in getSectionTitle(section.id)" :key="index" :style="`--char-index: ${index}`">
                            {{ char }}
                        </span>
                    </h1>
                </div>
                <component :is="section.component" />
            </section>
        </template>
    </v-main>
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

/* 装飾エフェクト */
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
</style>
