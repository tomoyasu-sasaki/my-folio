<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '../../stores/language'
import type { Project } from '../../stores/project'

const props = defineProps<{
  project: Project
}>()

const languageStore = useLanguageStore()

// モックアップ画像の数を取得
const mockupCount = computed(() => props.project?.details?.mockupCount || 5)

// 機能アイコンマッピング
const featureIcons = {
  'feature-1': 'mdi-store',
  'feature-2': 'mdi-image-multiple',
  'feature-3': 'mdi-eye-settings',
  'feature-4': 'mdi-magnify'
}
</script>

<template>
  <div class="gastronome-journey-detail">
    <!-- ヒーローセクション -->
    <div class="hero-section mb-12">
      <v-parallax
        :src="`/my-folio/img/Project/GastronomeJourney/gastronome-hero.jpg`"
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
            @click="window.open(project.details.demoUrl, '_blank')"
          >
            {{ languageStore.t('projectDetail', 'demoButton') }}
          </v-btn>
        </div>
      </v-parallax>
    </div>

    <!-- アプリ概要 -->
    <v-row>
      <v-col cols="12" md="7">
        <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'description') }}</h2>
        <v-card elevation="2" class="pa-6 mb-8">
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
        <h2 class="text-h4 mt-8 mb-6">{{ languageStore.t('projectDetail', 'sectionTitles', undefined, 'core-features') }}</h2>
        <v-row>
          <v-col v-for="i in 4" :key="i" cols="12" sm="6">
            <v-card height="100%" class="feature-card" variant="outlined">
              <v-card-title class="d-flex align-center">
                <v-icon :icon="featureIcons[`feature-${i}`] || 'mdi-check-circle'" 
                  color="primary" size="large" class="mr-3"></v-icon>
                {{ languageStore.t('projectDetail', 'feature', undefined, `${project.id}-${i}`) }}
              </v-card-title>
              <v-card-text>
                <p class="text-body-2">
                  居酒屋管理アプリならではの{{ languageStore.t('projectDetail', 'feature', undefined, `${project.id}-${i}`) }}機能について説明します。
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- アーキテクチャ説明 -->
        <h2 class="text-h4 mt-8 mb-4">{{ languageStore.t('projectDetail', 'sectionTitles', undefined, 'architecture') }}</h2>
        <v-card elevation="0" class="pa-0 mb-6 rounded-xl architecture-card">
          <v-img
            :src="`/my-folio/img/Project/gastronome-architecture.png`"
            height="300"
            class="rounded-t-xl"
            cover
          ></v-img>
          <v-card-text class="pa-6 bg-grey-lighten-4 rounded-b-xl">
            <p class="text-body-1">
              {{ languageStore.t('projectDetail', 'customContent', undefined, 'architecture-description') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <!-- モックアップショーケース -->
        <v-card elevation="2" class="pa-4 mb-6">
          <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'mockups') }}</h3>
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
                :src="`/my-folio/img/Project/GastronomeJourney/mockup-${project.id}-${n}.png`"
                gradient="to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%"
              >
                <div class="d-flex justify-center align-end fill-height pb-6">
                  <v-chip color="primary" size="large">
                    {{ languageStore.t('projectDetail', 'screen', undefined, `${project.id}-${n}`) }}
                  </v-chip>
                </div>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card>
        
        <!-- プロジェクト情報 -->
        <v-card elevation="2" class="pa-4 mb-6">
          <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'overview') }}</h3>
          
          <v-list density="compact" class="bg-transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-code-tags</v-icon>
              </template>
              <v-list-item-title>{{ languageStore.t('projectDetail', 'language') }}</v-list-item-title>
              <v-list-item-subtitle>{{ project.language }}</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-application</v-icon>
              </template>
              <v-list-item-title>{{ languageStore.t('projectDetail', 'projectType') }}</v-list-item-title>
              <v-list-item-subtitle>{{ languageStore.t('projectDetail', 'type', undefined, project.id) }}</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item v-if="project.details?.githubRepo">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-github</v-icon>
              </template>
              <v-list-item-title>GitHub</v-list-item-title>
              <v-list-item-subtitle>
                <v-btn 
                  size="small" 
                  variant="text" 
                  color="primary" 
                  density="compact"
                  @click="window.open(project.details.githubRepo, '_blank')"
                >
                  {{ languageStore.t('projectDetail', 'githubButton') }}
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item v-if="project.details?.demoUrl">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-web</v-icon>
              </template>
              <v-list-item-title>デモ</v-list-item-title>
              <v-list-item-subtitle>
                <v-btn 
                  size="small" 
                  variant="text" 
                  color="primary" 
                  density="compact"
                  @click="window.open(project.details.demoUrl, '_blank')"
                >
                  {{ languageStore.t('projectDetail', 'demoButton') }}
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
        
        <!-- 関連データフロー -->
        <v-card elevation="2" class="pa-4">
          <h3 class="text-h5 mb-4">データフロー</h3>
          <v-img
            :src="`/my-folio/img/Project/gastronome-data-flow.png`"
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