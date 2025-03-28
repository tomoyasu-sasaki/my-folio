<script setup lang="ts">
import { computed } from 'vue'
import { useTranslation } from '../../composables/useTranslation'
import type { ProjectWithTranslation } from '../../composables/useProjectData'
// 機能アイコンの型定義
type FeatureKey = `feature-${1 | 2 | 3 | 4}`
type FeatureIconMap = {
  readonly [K in FeatureKey]: string
}

const props = defineProps<{
  project: ProjectWithTranslation
}>()

const { t } = useTranslation()

// 画像パスの設定
const imageConfig = {
  hero: '/my-folio/img/Project/GastronomeJourney/gastronome-hero.jpg',
  architecture: '/my-folio/img/Project/gastronome-architecture.png',
  dataFlow: '/my-folio/img/Project/gastronome-data-flow.png',
  mockupBase: '/my-folio/img/Project/GastronomeJourney/mockup'
} as const

// モックアップ画像の数を取得
const mockupCount = computed(() => {
  const count = props.project?.details?.mockupCount
  return typeof count === 'number' ? count : 5
})

// 機能アイコンマッピング
const featureIcons: FeatureIconMap = {
  'feature-1': 'mdi-store',
  'feature-2': 'mdi-image-multiple',
  'feature-3': 'mdi-eye-settings',
  'feature-4': 'mdi-magnify'
} as const

// リンクを開く関数
function openExternalLink(url: string): void {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank')
  }
}

// モックアップ画像のパスを生成する関数
function getMockupImagePath(index: number): string {
  return `${imageConfig.mockupBase}-${props.project.id}-${index}.png`
}

// 基本情報の翻訳を取得する関数
function getBasicInfo(key: string): string {
  return t({ section: 'projectDetail', key: 'basicInfo', subKey: key, itemId: 'text' })
}

// ボタンの翻訳を取得する関数
function getButton(key: string): string {
  return t({ section: 'projectDetail', key: 'buttons', subKey: key, itemId: 'text' })
}

// セクションタイトルの翻訳を取得する関数
function getSectionTitle(key: string): string {
  return t({ section: 'projectDetail', key: 'sections', subKey: key, itemId: 'text' })
}

// 機能の翻訳を取得する関数
function getFeature(key: string, subKey: string = 'text'): string {
  // project.idとkeyを使って、正しい翻訳キーを生成
  const featureKey = `${props.project?.id}-${key}`;
  return t({ section: 'projectDetail', key: 'feature', subKey: featureKey, itemId: subKey });
}

// スクリーンの翻訳を取得する関数
function getScreen(key: string): string {
  return t({ section: 'projectDetail', key: 'screen', subKey: key, itemId: 'text' })
}

// プロジェクトタイプの翻訳を取得する関数
function getType(key: string): string {
  return t({ section: 'projectDetail', key: 'type', subKey: key, itemId: 'text' })
}

// カスタムコンテンツの翻訳を取得する関数
function getCustomContent(key: string): string {
  return t({ section: 'projectDetail', key: 'customContent', subKey: key, itemId: 'text' })
}

</script>

<template>
  <div class="gastronome-journey-detail">
    <!-- ヒーローセクション -->
    <div class="hero-section mb-12">
      <v-parallax
        :src="imageConfig.hero"
        height="400"
        class="rounded-xl"
      >
        <div class="hero-overlay">
          <h1 class="text-h2 font-weight-bold text-white">{{ project.title }}</h1>
          <p class="text-h5 text-white mt-4">{{ project.subtitle }}</p>
          <v-btn 
            v-if="project.details?.demoUrl" 
            color="primary" 
            size="large"
            class="mt-6"
            prepend-icon="mdi-play-circle"
            @click="openExternalLink(project.details.demoUrl)"
          >
            {{ getButton('demoButton') }}
          </v-btn>
        </div>
      </v-parallax>
    </div>

    <!-- アプリ概要 -->
    <v-row>
      <v-col cols="12" md="7">
        <h2 class="text-h4 mb-4">{{ getBasicInfo('description') }}</h2>
        <v-card class="pa-6 mb-8" variant="outlined">
          <p class="text-body-1">{{ project.description }}</p>
          <div class="mt-4 d-flex flex-wrap">
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              size="small"
              class="mr-2 mb-2"
              color="primary"
              variant="flat"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card>

        <!-- 主要機能セクション -->
        <h2 class="text-h4 mt-8 mb-6">{{ getBasicInfo('features') }}</h2>
        <v-row>
          <v-col v-for="i in 4" :key="i" cols="12" sm="6">
            <v-card height="100%" class="feature-card" variant="outlined">
              <v-card-title class="d-flex align-center">
                <v-icon
                :icon="featureIcons[`feature-${i}` as FeatureKey] || 'mdi-check-circle'" 
                  color="primary" size="large" class="mr-3"></v-icon>
                {{ getFeature(i.toString(), 'text') }}
              </v-card-title>
              <v-card-text>
                <p class="text-body-2">
                  {{ getFeature(i.toString(), 'description') }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- アーキテクチャ説明 -->
        <h2 class="text-h4 mt-8 mb-4">{{ getSectionTitle('architecture') }}</h2>
        <v-card elevation="0" class="pa-0 mb-6 architecture-card" variant="outlined">
          <v-img
            :src="imageConfig.architecture"
            height="300"
            class="rounded-t-xl"
            cover
          ></v-img>
          <v-card-text class="pa-6 rounded-b-xl">
            <p class="text-body-1">
              {{ getCustomContent('architecture-description') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <!-- モックアップショーケース -->
        <v-card class="pa-4 mb-6" variant="outlined">
          <h3 class="text-h5 mb-4">{{ getBasicInfo('mockups') }}</h3>
          <v-carousel
            height="500"
            hide-delimiters
            show-arrows="hover"
            cycle
            interval="5000"
          >
            <v-carousel-item
              v-for="n in mockupCount"
              :key="n"
              cover
            >
              <v-img
                height="100%"
                class="rounded"
                :src="getMockupImagePath(n)"
                gradient="to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%"
              >
                <div class="d-flex justify-center align-end fill-height pb-6">
                  <v-chip color="primary" size="large">
                    {{ getScreen(`${project.id}-${n}`) }}
                  </v-chip>
                </div>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card>
        
        <!-- プロジェクト情報 -->
        <v-card class="pa-4 mb-6" variant="outlined">
          <h3 class="text-h5 mb-4">{{ getBasicInfo('info') }}</h3>
          <v-list>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-code-tags</v-icon>
              </template>
              <v-list-item-title>{{ getBasicInfo('language') }}</v-list-item-title>
              <v-list-item-subtitle>{{ project.language }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-flag</v-icon>
              </template>
              <v-list-item-title>{{ getBasicInfo('status') }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ getType(project.status) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="project.details?.githubRepo">
              <template #prepend>
                <v-icon color="primary">mdi-github</v-icon>
              </template>
              <v-list-item-title>GitHub</v-list-item-title>
              <v-list-item-subtitle>
                <v-btn 
                  size="small" 
                  variant="text" 
                  color="primary" 
                  density="compact"
                  @click="openExternalLink(project.details.githubRepo)"
                >
                  {{ getButton('githubButton') }}
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="project.details?.demoUrl">
              <template #prepend>
                <v-icon color="primary">mdi-web</v-icon>
              </template>
              <v-list-item-title>デモ</v-list-item-title>
              <v-list-item-subtitle>
                <v-btn 
                  size="small" 
                  variant="text" 
                  color="primary" 
                  density="compact"
                  @click="openExternalLink(project.details.demoUrl)"
                >
                  {{ getButton('demoButton') }}
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
        
        <!-- 関連データフロー -->
        <v-card class="pa-4" variant="outlined">
          <h3 class="text-h5 mb-4">データフロー</h3>
          <v-img
            :src="imageConfig.dataFlow"
            height="250"
            class="rounded mb-3"
            cover
          ></v-img>
          <p class="text-body-2 text-grey-darken-1">
            ユーザーデータとコンテンツの流れを図示したダイアグラムです。
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
}

.hero-overlay {
  background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: none;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.architecture-card {
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

@media (max-width: 960px) {
  .hero-overlay {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style> 