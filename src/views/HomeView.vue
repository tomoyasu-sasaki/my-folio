<script setup lang="ts">
import Header from '@/components/home/parts/HomeHeader.vue'
import Footer from '@/components/global/FooterView.vue'
import AboutSection from '@/components/home/section/AboutSection.vue'
import ProjectSection from '@/components/home/section/ProjectSection.vue'
import SkillSection from '@/components/home/section/SkillSection.vue'
// import BlogSection from '@/components/home/section/BlogSection.vue'
import GallerySection from '@/components/home/section/GallerySection.vue'
import CarrerSection from '@/components/home/section/CarrerSection.vue'
// import ContactSection from '@/components/home/section/ContactSection.vue'

import { onMounted, ref, watch } from 'vue'
import { useScrollStore } from '@/stores/scroll'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useScrollStore()

const aboutRef = ref(null)
const projectRef = ref(null)
const skillRef = ref(null)
const blogRef = ref(null)
const galleryRef = ref(null)
const carrerRef = ref(null)
const contactRef = ref(null)

watch(
    () => store.sectionToScroll,
    (newSection) => {
        if (newSection) {
            let targetElement: any
            switch (newSection) {
                case 'About':
                    targetElement = aboutRef.value
                    break
                case 'Project':
                    targetElement = projectRef.value
                    break
                case 'Skill':
                    targetElement = skillRef.value
                    break
                case 'Blog':
                    targetElement = blogRef.value
                    break
                case 'Gallery':
                    targetElement = galleryRef.value
                    break
                case 'Carrer':
                    targetElement = carrerRef.value
                    break
                case 'Contact':
                    targetElement = contactRef.value
                    break
            }

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                })
            }

            // セクションをリセットする
            store.setSectionToScroll('')
        }
    }
)
onMounted(() => {
    router.push('/')
})
</script>

<template>
    <Header class="custom-header" />
    <v-main class="pt-0">
        <!-- サイトの説明 -->
        <section ref="aboutRef">
            <AboutSection name="AboutSection" />
        </section>

        <!-- プロジェクト一覧 -->
        <section ref="projectRef">
            <div class="background-image1 fixed-bg">
                <h1 class="sec-title">成果物</h1>
            </div>
            <ProjectSection name="ProjectSection" />
        </section>

        <!-- スキル一覧 -->
        <section ref="skillRef">
            <div class="background-image2 fixed-bg">
                <h1 class="sec-title">技術一覧</h1>
            </div>
            <SkillSection name="SkillSection" />
        </section>

        <!-- ブログリスト -->
        <!-- <section ref="blogRef">
            <div class="background-image3 fixed-bg">
                <h1 class="sec-title">最新ブログ</h1>
            </div>
            <BlogSection name="BlogSection" />
        </section> -->

        <!-- ギャラリー -->
        <section ref="galleryRef">
            <div class="background-image4 fixed-bg">
                <h1 class="sec-title">ギャラリー</h1>
            </div>
            <GallerySection name="GallerySection" />
        </section>

        <!-- 経歴紹介 -->
        <section ref="carrerRef">
            <div class="background-image5 fixed-bg">
                <h1 class="sec-title">経歴紹介</h1>
            </div>
            <CarrerSection name="CarrerSection" />
        </section>

        <!-- 問い合わせフォーム -->
        <!-- <section ref="contactRef">
        <ContactSection name="ContactSection" ></ContactSection>
    </section> -->
    </v-main>
    <Footer />
</template>

<style scoped>
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
</style>
