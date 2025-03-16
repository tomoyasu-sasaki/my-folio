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

import { onMounted, onUnmounted } from 'vue'
import { useScrollStore } from '../stores/scroll'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useScrollStore()

// スクロールイベントのハンドラー
const handleScroll = () => {
    requestAnimationFrame(() => {
        store.updateActiveSection()
    })
}

onMounted(() => {
    router.push('/')
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <Header />
    <v-main class="pt-0">
        <!-- サイトの説明 -->
        <section :ref="el => store.registerSectionRef('about', el)" class="section-container">
            <AboutSection />
        </section>

        <!-- プロジェクト一覧 -->
        <section :ref="el => store.registerSectionRef('project', el)" class="section-container">
            <div class="background-image1 fixed-bg">
                <h1 class="sec-title">成果物</h1>
            </div>
            <ProjectSection />
        </section>

        <!-- スキル一覧 -->
        <section :ref="el => store.registerSectionRef('skill', el)" class="section-container">
            <div class="background-image2 fixed-bg">
                <h1 class="sec-title">技術一覧</h1>
            </div>
            <SkillSection />
        </section>

        <!-- ブログリスト -->
        <!-- <section ref="blogRef">
            <div class="background-image3 fixed-bg">
                <h1 class="sec-title">最新ブログ</h1>
            </div>
            <BlogSection name="BlogSection" />
        </section> -->

        <!-- ギャラリー -->
        <section :ref="el => store.registerSectionRef('gallery', el)" class="section-container">
            <div class="background-image4 fixed-bg">
                <h1 class="sec-title">ギャラリー</h1>
            </div>
            <GallerySection />
        </section>

        <!-- 経歴紹介 -->
        <section :ref="el => store.registerSectionRef('career', el)" class="section-container">
            <div class="background-image5 fixed-bg">
                <h1 class="sec-title">経歴紹介</h1>
            </div>
            <CarrerSection />
        </section>

        <!-- 問い合わせフォーム -->
        <!-- <section ref="contactRef">
            <ContactSection name="ContactSection" />
        </section> -->
    </v-main>
    <Footer />
</template>

<style scoped>
.section-container {
    position: relative;
    scroll-margin-top: 64px;
}

.background-image1 {
    background-image: url('/img/Background/Background1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.background-image2 {
    background-image: url('/img/Background/Background2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.background-image3 {
    background-image: url('/img/Background/Background3.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.background-image4 {
    background-image: url('/img/Background/Background4.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.background-image5 {
    background-image: url('/img/Background/Background5.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
}
.fixed-bg {
    height: 400px;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}
.sec-title {
    width: 100%;
    color: #afdcfd;
    text-align: center;
    font-size: 72px;
    filter: drop-shadow(1px 1px 10px #e3f2fd);
    position: absolute;
    top: 30%;
}

@media (max-width: 600px) {
    .section-container {
        scroll-margin-top: 56px;
    }

    .fixed-bg {
        height: 300px;
    }

    .sec-title {
        font-size: 48px;
    }
}
</style>
