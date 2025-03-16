<script setup lang="ts">
import { useScrollStore } from '@/stores/scroll'
import { useRouter } from 'vue-router'

const store = useScrollStore()
const router = useRouter()

const sections = [
    { title: 'このサイトについて', target: 'About' },
    { title: '成果物', target: 'Project' },
    { title: '技術一覧', target: 'Skill' },
    // { title: '最新ブログ', target: 'Blog' },
    { title: '生成画像', target: 'Gallery' },
    { title: '経歴', target: 'Carrer' }
    // {title: 'お問い合わせ', target: 'Contact'},
]
const scrollToTarget = (sectionRef: string) => {
    store.setSectionToScroll(sectionRef)
}
const openInNewTab = () => {
    const url = router.resolve({ path: '/babylonfolio' }).href
    window.open(url, '_blank')
}
</script>

<template>
    <v-app-bar style="background-color: transparent !important; box-shadow: none !important">
        <v-spacer />
        <v-row>
            <v-col
                cols="auto"
                v-for="(section, index) in sections"
                :key="index"
                class="section-button"
            >
                <v-btn
                    flat
                    variant="elevated"
                    color="background"
                    @click.stop="scrollToTarget(section.target)"
                    :text="section.title"
                />
            </v-col>
            <v-col cols="auto">
                <v-btn
                    flat
                    variant="elevated"
                    color="background"
                    target="_blank"
                    text="BabylonJS"
                    @click="openInNewTab"
                />
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<style scoped>
@media (max-width: 860px) {
    .section-button {
        display: none;
    }
}
</style>
