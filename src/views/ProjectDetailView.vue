<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '../composables/useTranslation'
import Footer from '../components/global/FooterView.vue'
import { logger } from '../utils/logger'
import { useProjectData } from '../composables/useProjectData'
import GastronomeJourneyDetail from '../components/project/GastronomeJourneyDetail.vue'

const route = useRoute()
const router = useRouter()
const { t } = useTranslation()
const { getProjectWithTranslation } = useProjectData()

// プロジェクトIDを取得
const projectId = computed(() => route.params.id as string)

// プロジェクトデータを取得
const project = computed(() => getProjectWithTranslation(projectId.value))

// プロジェクトが見つからない場合はホームにリダイレクト
watch(project, (value) => {
    if (!value) {
        logger.error('Project not found', { projectId: projectId.value })
        router.push('/')
    }
})

// レイアウトタイプの取得
const layoutType = computed(() => project.value?.details?.layout || 'standard')

// カスタムコンポーネントの判定
const customComponent = computed(() => {
    if (!project.value?.details?.customComponent) return null
    switch (project.value.details.customComponent) {
        case 'GastronomeJourneyDetail':
            return GastronomeJourneyDetail
        default:
            return null
    }
})

// モックアップ画像の数を取得
const mockupCount = computed(() => project.value?.details?.mockupCount || 3)

// プロジェクトのセクションを取得
const sections = computed(() => project.value?.details?.sections || [])

// プロジェクトが存在しない場合はホームにリダイレクト
onMounted(() => {
  if (!project.value) {
    router.push('/')
  }
})

// 前のページに戻る
const goBack = (): void => {
  router.back()
}

// リンクを開く関数
const openUrl = (url?: string): void => {
  if (typeof window !== 'undefined' && url) {
    window.open(url, '_blank')
  }
}

// 基本情報の翻訳を取得
const getBasicInfo = (key: string): string => {
  return t({ section: 'projectDetail', key: 'basicInfo', subKey: key, itemId: 'text' })
}

// ボタンの翻訳を取得
const getButton = (key: string): string => {
  return t({ section: 'projectDetail', key: 'buttons', subKey: key, itemId: 'text' })
}

// セクションタイトルの翻訳を取得
const getSectionTitle = (key: string): string => {
  return t({ section: 'projectDetail', key: 'sections', subKey: key, itemId: 'text' })
}

// カスタムコンテンツの翻訳を取得
const getCustomContent = (key: string): string => {
  return t({ section: 'projectDetail', key: 'customContent', subKey: key, itemId: 'text' })
}

// 機能の翻訳を取得
const getFeature = (key: string, subKey: string = 'text'): string => {
  // project.idとkeyを使って、正しい翻訳キーを生成
  const featureKey = `${project.value?.id}-${key}`;
  return t({ section: 'projectDetail', key: 'feature', subKey: featureKey, itemId: subKey });
}

// スクリーンの翻訳を取得
const getScreen = (key: string): string => {
  return t({ section: 'projectDetail', key: 'screen', subKey: key, itemId: 'text' })
}

// タイプの翻訳を取得
const getType = (key: string): string => {
  return t({ section: 'projectDetail', key: 'type', subKey: key, itemId: 'text' })
}

// テスティモニアルの翻訳を取得
const getTestimonial = (key: string): string => {
  return t({ section: 'projectDetail', key: 'testimonials', subKey: key, itemId: 'text' })
}
</script>

<template>
  <v-main>
    <v-container v-if="project" class="py-10">
      <v-btn
        prepend-icon="mdi-arrow-left"
        variant="text"
        class="mb-6"
        @click="goBack"
      >
        {{ t({ section: 'common', key: 'navigation', subKey: 'back', itemId: 'text' }) }}
      </v-btn>

      <!-- プロジェクトヘッダー -->
      <div class="project-header">
        <v-img
          :src="`/my-folio/img/Project/${project.image}`"
          height="300"
          width="300"
          cover
          class="project-image"
        />
        <div class="project-header-content">
          <h1 class="text-h3 font-weight-bold">{{ project.title }}</h1>
          <div class="d-flex align-center my-3">
            <v-chip
              :color="project.status === 'completed' ? 'success' : project.status === 'in-progress' ? 'info' : project.status === 'planned' ? 'warning' : 'error'"
              size="small"
              class="mr-2"
              label
            >
              {{ t({ section: 'project', key: 'status', subKey: project.status, itemId: 'text' }) }}
            </v-chip>
            <span class="text-body-1">{{ project.subtitle }}</span>
          </div>
          <div class="my-4">
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              size="small"
              class="mr-2 mb-2"
              variant="outlined"
            >
              {{ tag }}
            </v-chip>
          </div>
          
          <!-- プロジェクトリンクボタン -->
          <div class="action-buttons mt-4">
            <v-btn 
              v-if="project && project.url" 
              color="primary" 
              class="mr-2"
              prepend-icon="mdi-open-in-new"
              @click="() => openUrl(project?.url)"
            >
              {{ t({ section: 'project', key: 'action', subKey: 'visit', itemId: 'text' }) }}
            </v-btn>
            
            <v-btn 
              v-if="project && project.details?.demoUrl" 
              color="info" 
              class="mr-2"
              prepend-icon="mdi-play-circle"
              @click="() => openUrl(project?.details?.demoUrl)"
            >
              {{ getButton('demoButton') }}
            </v-btn>

            <v-btn 
              v-if="project && project.details?.githubRepo" 
              color="default" 
              class="mr-2"
              variant="outlined"
              prepend-icon="mdi-github"
              @click="() => openUrl(project?.details?.githubRepo)"
            >
              {{ getButton('githubButton') }}
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider class="my-6"></v-divider>

      <!-- カスタムコンポーネントがあれば表示 -->
      <component 
        :is="customComponent" 
        v-if="customComponent"
        :project="project" 
      />

      <!-- layoutに応じたレイアウト -->
      <template v-else>
        <!-- 標準レイアウト -->
        <div v-if="layoutType === 'standard'" class="standard-layout">
          <v-row>
            <v-col cols="12" md="8">
              <!-- 説明セクション -->
              <h2 class="text-h4 mb-4">{{ getBasicInfo('description') }}</h2>
              <p class="text-body-1 mb-4">{{ project.description }}</p>

              <!-- プロジェクトの各セクションを動的に表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-list bg-color="transparent">
                    <v-list-item v-for="(_, i) in section.content" :key="i">
                      <template #prepend>
                        <v-icon color="primary">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>
                        {{ getFeature((i + 1).toString()) }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>

                <!-- テクノロジースタック -->
                <template v-else-if="section.type === 'tech-stack'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-row>
                    <v-col v-for="tag in project.tags" :key="tag" cols="6" sm="4" md="3">
                      <v-card variant="outlined" class="pa-3 text-center">
                        <v-icon size="large" class="mb-2">mdi-code-tags</v-icon>
                        <div>{{ tag }}</div>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- カスタムセクション -->
                <template v-else-if="section.type === 'custom'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <p class="text-body-1">
                    {{ typeof section.content === 'string' ? getCustomContent(section.content) : '' }}
                  </p>
                </template>

                <!-- ユーザーの声 -->
                <template v-else-if="section.type === 'testimonial'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-row>
                    <v-col v-for="(_, i) in section.content" :key="i" cols="12" md="4">
                      <v-card variant="outlined" class="pa-4 mb-3 testimonial-card">
                        <div class="d-flex align-start">
                          <v-avatar color="primary" class="mr-3">
                            <v-icon color="white">mdi-account</v-icon>
                          </v-avatar>
                          <v-card-text class="text-body-1 font-italic pa-0">
                            {{ getTestimonial((i + 1).toString()) }}
                          </v-card-text>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- ビデオセクション -->
                <template v-else-if="section.type === 'video'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <div class="video-container">
                    <video 
                      controls 
                      class="project-video" 
                      :src="`/my-folio/video/${section.content}`"
                    ></video>
                  </div>
                </template>
              </template>
            </v-col>
            
            <v-col cols="12" md="4">
              <!-- プロジェクト概要サイドバー -->
              <v-card variant="outlined" class="pa-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('projectType') }}</div>
                  <div>{{ getType(project.id) }}</div>
                </div>
              </v-card>

              <!-- モックアップカルーセル -->
              <v-card variant="outlined" class="pa-4 mt-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('mockups') }}</h3>
                <v-carousel
                  height="300"
                  hide-delimiters
                  show-arrows="hover"
                >
                  <v-carousel-item
                    v-for="n in mockupCount"
                    :key="n"
                    cover
                  >
                    <v-img
                      height="100%"
                      class="rounded"
                      :src="`/my-folio/img/Project/${project.title}/mockup-${project.id}-${n}.png`"
                      gradient="to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%"
                    >
                      <v-card-text class="text-white text-subtitle-2 position-absolute bottom-0">
                        {{ getScreen(`${project.id}-${n}`) }}
                      </v-card-text>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- ギャラリーレイアウト -->
        <div v-else-if="layoutType === 'gallery'" class="gallery-layout">
          <v-row>
            <v-col cols="12" md="7">
              <!-- 説明セクション -->
              <h2 class="text-h4 mb-4">{{ getBasicInfo('description') }}</h2>
              <p class="text-body-1 mb-6">{{ project.description }}</p>

              <!-- プロジェクト特徴とカスタムセクション -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-row>
                    <v-col v-for="(_, i) in section.content" :key="i" cols="12" md="6">
                      <v-card variant="outlined" class="pa-4 mb-4 feature-card">
                        <v-icon color="primary" size="large" class="feature-icon">mdi-check-circle</v-icon>
                        <h3 class="text-h6 my-2">{{ getFeature((i + 1).toString()) }}</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- カスタムセクション -->
                <template v-else-if="section.type === 'custom'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-card variant="outlined" class="pa-6 mb-6">
                    <p class="text-body-1">
                      {{ typeof section.content === 'string' ? getCustomContent(section.content) : '' }}
                    </p>
                  </v-card>
                </template>
              </template>

              <!-- 追加画像があれば表示 -->
              <div v-if="project.details?.additionalImages && project.details.additionalImages.length > 0" class="mt-8">
                <h2 class="text-h4 mb-4">{{ getSectionTitle('architecture') }}</h2>
                <v-row>
                  <v-col v-for="(image, index) in project.details.additionalImages" :key="index" cols="12" md="6">
                    <v-card variant="outlined" class="pa-4">
                      <v-img
                        :src="`/my-folio/img/Project/${image}`"
                        class="rounded"
                        height="250"
                        cover
                      ></v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <v-col cols="12" md="5">
              <!-- プロジェクト情報カード -->
              <v-card variant="outlined" class="pa-4 mb-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('projectType') }}</div>
                  <div>{{ getType(project.id) }}</div>
                </div>

                <div class="mb-4">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('techStack') }}</div>
                  <div class="d-flex flex-wrap mt-2">
                    <v-chip
                      v-for="tag in project.tags"
                      :key="tag"
                      size="small"
                      class="mr-2 mb-2"
                      variant="outlined"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>
              </v-card>

              <!-- モックアップギャラリー -->
              <template v-for="(section, index) in sections" :key="`gallery-${index}`">
                <template v-if="section.type === 'gallery'">
                  <h3 class="text-h5 mt-6 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h3>
                  <v-row dense>
                    <v-col v-for="(_, i) in section.content" :key="i" cols="6" variant="outlined">
                      <v-card class="mb-4" variant="outlined">
                        <v-img
                          :src="`/my-folio/img/Project/mockup-${project.id}-${i + 1}.png`"
                          height="150"
                          cover
                          class="rounded"
                        >
                          <template #placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                        <v-card-text class="pa-2 text-center text-caption">
                          {{ getScreen(`${project.id}-${i + 1}`) }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </template>
            </v-col>
          </v-row>
        </div>

        <!-- マークダウンレイアウト -->
        <div v-else-if="layoutType === 'markdown'" class="markdown-layout">
          <v-row>
            <v-col cols="12" md="8">
              <!-- 説明セクション -->
              <h2 class="text-h4 mb-4">{{ getBasicInfo('description') }}</h2>
              <v-card variant="outlined" class="pa-6 mb-6">
                <p class="text-body-1">{{ project.description }}</p>
              </v-card>

              <!-- プロジェクトの各セクションを動的に表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-card variant="outlined" class="pa-4 mb-6">
                    <v-list bg-color="transparent">
                      <v-list-item v-for="(_, i) in section.content" :key="i">
                        <template #prepend>
                          <v-icon color="primary">mdi-check-circle</v-icon>
                        </template>
                        <v-list-item-title>
                          {{ getFeature((i + 1).toString()) }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </template>

                <!-- ビデオセクション -->
                <template v-else-if="section.type === 'video'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-card variant="outlined" class="pa-4 mb-6">
                    <div class="video-container">
                      <video 
                        controls 
                        class="project-video" 
                        :src="`/my-folio/video/${section.content}`"
                      ></video>
                    </div>
                  </v-card>
                </template>
              </template>
            </v-col>
            
            <v-col cols="12" md="4">
              <!-- サイドバー情報 -->
              <v-card variant="outlined" class="pa-4 mb-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('projectType') }}</div>
                  <div>{{ getType(project.id) }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('techStack') }}</div>
                  <div class="d-flex flex-wrap mt-2">
                    <v-chip
                      v-for="tag in project.tags"
                      :key="tag"
                      size="small"
                      class="mr-2 mb-2"
                      variant="outlined"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>
              </v-card>

              <!-- モックアップ表示 -->
              <v-card variant="outlined" class="pa-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('mockups') }}</h3>
                <v-carousel
                  height="300"
                  hide-delimiters
                  show-arrows="hover"
                >
                  <v-carousel-item
                    v-for="n in mockupCount"
                    :key="n"
                    cover
                  >
                    <v-img
                      height="100%"
                      class="rounded"
                      :src="`/my-folio/img/Project/mockup-${project.id}-${n}.png`"
                      gradient="to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%"
                    >
                      <v-card-text class="text-white text-subtitle-2 position-absolute bottom-0">
                        {{ getScreen(`${project.id}-${n}`) }}
                      </v-card-text>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- タイムラインレイアウト -->
        <div v-else-if="layoutType === 'timeline'" class="timeline-layout">
          <v-row>
            <v-col cols="12" md="8">
              <!-- 説明セクション -->
              <h2 class="text-h4 mb-4">{{ getBasicInfo('description') }}</h2>
              <p class="text-body-1 mb-6">{{ project.description }}</p>

              <!-- タイムラインで機能を表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <div v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  
                  <v-timeline side="end">
                    <v-timeline-item
                      v-for="(_, i) in section.content"
                      :key="i"
                      :dot-color="['primary', 'secondary', 'info', 'success'][i % 4]"
                      size="small"
                      class="feature-timeline-item"
                    >
                      <v-card variant="outlined" class="pa-4 mb-3 feature-timeline-card">
                        <h3 class="text-h6 mb-2">{{ getFeature((i + 1).toString()) }}</h3>
                        <p class="text-body-2">
                          {{ getFeature((i + 1).toString(), 'description') }}
                        </p>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </div>

                <!-- ユーザーの声 -->
                <div v-else-if="section.type === 'testimonial'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ getSectionTitle(section.title || '') }}
                  </h2>
                  <v-row>
                    <v-col v-for="(_, i) in section.content" :key="i" cols="12">
                      <v-card variant="outlined" class="pa-4 mb-3 testimonial-card">
                        <div class="d-flex align-start">
                          <v-avatar color="primary" class="mr-3">
                            <v-icon color="white">mdi-account</v-icon>
                          </v-avatar>
                          <v-card-text class="text-body-1 font-italic pa-0">
                            {{ getTestimonial((i + 1).toString()) }}
                          </v-card-text>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-col>
            
            <v-col cols="12" md="4">
              <!-- プロジェクト情報カード -->
              <v-card variant="outlined" class="pa-4 mb-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('projectType') }}</div>
                  <div>{{ getType(project.id) }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ getBasicInfo('techStack') }}</div>
                  <div class="d-flex flex-wrap mt-2">
                    <v-chip
                      v-for="tag in project.tags"
                      :key="tag"
                      size="small"
                      class="mr-2 mb-2"
                      variant="outlined"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>
              </v-card>

              <!-- モックアップ表示 -->
              <v-card variant="outlined" class="pa-4">
                <h3 class="text-h5 mb-4">{{ getBasicInfo('mockups') }}</h3>
                <v-row dense>
                  <v-col v-for="n in mockupCount" :key="`mockup-${n}`" cols="12">
                    <v-card class="mb-4" variant="outlined">
                      <v-img
                        :src="`/my-folio/img/Project/mockup-${project.id}-${n}.png`"
                        height="200"
                        cover
                        class="rounded"
                      ></v-img>
                      <v-card-text class="pa-2">
                        {{ getScreen(`${project.id}-${n}`) }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-container>
  </v-main>
  <Footer />
</template>

<style scoped>
.project-header {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 30px;
}

.project-image {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-header-content {
  flex: 1;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 アスペクト比 */
  height: 0;
  overflow: hidden;
}

.project-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.feature-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.2;
}

.testimonial-card {
  position: relative;
}

.testimonial-avatar {
  flex-shrink: 0;
}

.feature-timeline-item {
  margin-bottom: 24px;
}

.feature-timeline-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.feature-timeline-card:hover {
  transform: translateY(-5px);
}

/* レスポンシブ対応 */
@media (max-width: 960px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .project-image {
    align-self: center;
    margin-bottom: 20px;
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .action-buttons .v-btn {
    margin-bottom: 8px;
  }
}
</style> 