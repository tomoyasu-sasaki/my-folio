<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useProjectStore } from '../stores/project'
import { useLanguageStore } from '../stores/language'
import Header from '../components/home/parts/HomeHeader.vue'
import Footer from '../components/global/FooterView.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const languageStore = useLanguageStore()

// URLからプロジェクトIDを取得
const projectId = computed(() => route.params.id as string)

// プロジェクト詳細を取得
const project = computed(() => projectStore.getProjectById(projectId.value))

// レイアウトタイプの取得
const layoutType = computed(() => project.value?.details?.layout || 'standard')

// カスタムコンポーネントがあれば動的にロードする
const customComponent = computed(() => {
  if (project.value?.details?.customComponent) {
    try {
      return defineAsyncComponent(() => 
        import(`../components/project/${project.value?.details?.customComponent}.vue`)
      )
    } catch (e) {
      console.error('Custom component not found:', e)
      return null
    }
  }
  return null
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
const goBack = () => {
  router.back()
}
</script>

<template>
  <Header />
  <v-main>
    <v-container v-if="project" class="py-10">
      <v-btn
        prepend-icon="mdi-arrow-left"
        variant="text"
        class="mb-6"
        @click="goBack"
      >
        {{ languageStore.t('common', 'back') }}
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
              {{ languageStore.t('project', 'status', project.status) }}
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
              v-if="project.url" 
              color="primary" 
              class="mr-2"
              prepend-icon="mdi-open-in-new"
              @click="window.open(project.url, '_blank')"
            >
              {{ languageStore.t('project', 'visit') }}
            </v-btn>
            
            <v-btn 
              v-if="project.details?.demoUrl" 
              color="info" 
              class="mr-2"
              prepend-icon="mdi-play-circle"
              @click="window.open(project.details.demoUrl, '_blank')"
            >
              {{ languageStore.t('projectDetail', 'demoButton') }}
            </v-btn>

            <v-btn 
              v-if="project.details?.githubRepo" 
              color="default" 
              class="mr-2"
              variant="outlined"
              prepend-icon="mdi-github"
              @click="window.open(project.details.githubRepo, '_blank')"
            >
              {{ languageStore.t('projectDetail', 'githubButton') }}
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider class="my-6"></v-divider>

      <!-- カスタムコンポーネントがあれば表示 -->
      <component 
        v-if="customComponent" 
        :is="customComponent"
        :project="project" 
      />

      <!-- layoutに応じたレイアウト -->
      <template v-else>
        <!-- 標準レイアウト -->
        <div v-if="layoutType === 'standard'" class="standard-layout">
          <v-row>
            <v-col cols="12" md="8">
              <!-- 説明セクション -->
              <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'description') }}</h2>
              <p class="text-body-1 mb-4">{{ project.description }}</p>

              <!-- プロジェクトの各セクションを動的に表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-list>
                    <v-list-item v-for="feature in section.content" :key="feature">
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>
                        {{ languageStore.t('projectDetail', 'feature', undefined, feature) }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>

                <!-- テクノロジースタック -->
                <template v-else-if="section.type === 'tech-stack'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
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
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <p class="text-body-1">
                    {{ languageStore.t('projectDetail', 'customContent', undefined, section.content) }}
                  </p>
                </template>

                <!-- ユーザーの声 -->
                <template v-else-if="section.type === 'testimonial'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-row>
                    <v-col v-for="(testimonial, i) in section.content" :key="i" cols="12" md="4">
                      <v-card variant="outlined" class="pa-4 h-100">
                        <v-card-text class="text-body-1 font-italic">
                          {{ languageStore.t('projectDetail', 'testimonials', undefined, testimonial) }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- ビデオセクション -->
                <template v-else-if="section.type === 'video'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
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
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'projectType') }}</div>
                  <div>{{ languageStore.t('projectDetail', 'type', undefined, project.id) }}</div>
                </div>
              </v-card>

              <!-- モックアップカルーセル -->
              <v-card variant="outlined" class="pa-4 mt-4">
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'mockups') }}</h3>
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
                        {{ languageStore.t('projectDetail', 'screen', undefined, `${project.id}-${n}`) }}
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
              <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'description') }}</h2>
              <p class="text-body-1 mb-6">{{ project.description }}</p>

              <!-- プロジェクト特徴とカスタムセクション -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-row>
                    <v-col v-for="(feature, i) in section.content" :key="i" cols="12" md="6">
                      <v-card variant="outlined" class="pa-4 mb-4 feature-card">
                        <v-icon color="primary" size="large" class="feature-icon">mdi-check-circle</v-icon>
                        <h3 class="text-h6 my-2">{{ languageStore.t('projectDetail', 'feature', undefined, feature) }}</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- カスタムセクション -->
                <template v-else-if="section.type === 'custom'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-card variant="outlined" class="pa-6 mb-6">
                    <p class="text-body-1">
                      {{ languageStore.t('projectDetail', 'customContent', undefined, section.content) }}
                    </p>
                  </v-card>
                </template>
              </template>

              <!-- 追加画像があれば表示 -->
              <div v-if="project.details?.additionalImages && project.details.additionalImages.length > 0" class="mt-8">
                <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'sectionTitles', undefined, 'architecture') }}</h2>
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
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'projectType') }}</div>
                  <div>{{ languageStore.t('projectDetail', 'type', undefined, project.id) }}</div>
                </div>

                <div class="mb-4">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'techStack') }}</div>
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
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h3>
                  <v-row dense>
                    <v-col v-for="n in mockupCount" :key="`mockup-${n}`" cols="6">
                      <v-card class="mb-4">
                        <v-img
                          :src="`/my-folio/img/Project/mockup-${project.id}-${n}.png`"
                          height="150"
                          cover
                          class="rounded"
                        >
                          <template v-slot:placeholder>
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
                          {{ languageStore.t('projectDetail', 'screen', undefined, `${project.id}-${n}`) }}
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
              <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'description') }}</h2>
              <v-card variant="outlined" class="pa-6 mb-6">
                <p class="text-body-1">{{ project.description }}</p>
              </v-card>

              <!-- プロジェクトの各セクションを動的に表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <!-- 機能リスト -->
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-card variant="outlined" class="pa-4 mb-6">
                    <v-list>
                      <v-list-item v-for="feature in section.content" :key="feature">
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-check-circle</v-icon>
                        </template>
                        <v-list-item-title>
                          {{ languageStore.t('projectDetail', 'feature', undefined, feature) }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </template>

                <!-- ビデオセクション -->
                <template v-else-if="section.type === 'video'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
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
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'projectType') }}</div>
                  <div>{{ languageStore.t('projectDetail', 'type', undefined, project.id) }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'techStack') }}</div>
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
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'mockups') }}</h3>
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
                        {{ languageStore.t('projectDetail', 'screen', undefined, `${project.id}-${n}`) }}
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
              <h2 class="text-h4 mb-4">{{ languageStore.t('projectDetail', 'description') }}</h2>
              <p class="text-body-1 mb-6">{{ project.description }}</p>

              <!-- タイムラインで機能を表示 -->
              <template v-for="(section, index) in sections" :key="index">
                <template v-if="section.type === 'feature-list'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  
                  <v-timeline side="end">
                    <v-timeline-item
                      v-for="(feature, i) in section.content"
                      :key="feature"
                      :dot-color="['primary', 'secondary', 'info', 'success'][i % 4]"
                      size="small"
                    >
                      <v-card variant="outlined" class="pa-4 mb-3">
                        <h3 class="text-h6 mb-2">{{ languageStore.t('projectDetail', 'feature', undefined, feature) }}</h3>
                        <p class="text-body-2">
                          {{ languageStore.t('projectDetail', 'feature', undefined, feature) }}
                        </p>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </template>

                <!-- ユーザーの声 -->
                <template v-else-if="section.type === 'testimonial'">
                  <h2 class="text-h4 mt-8 mb-4">
                    {{ languageStore.t('projectDetail', 'sectionTitles', undefined, section.title) }}
                  </h2>
                  <v-row>
                    <v-col v-for="(testimonial, i) in section.content" :key="i" cols="12">
                      <v-card variant="outlined" class="pa-4 mb-3 testimonial-card">
                        <v-avatar class="mb-3" color="primary">
                          <v-icon color="white">mdi-account</v-icon>
                        </v-avatar>
                        <v-card-text class="text-body-1 font-italic">
                          {{ languageStore.t('projectDetail', 'testimonials', undefined, testimonial) }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </template>
            </v-col>
            
            <v-col cols="12" md="4">
              <!-- プロジェクト情報カード -->
              <v-card variant="outlined" class="pa-4 mb-4">
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'overview') }}</h3>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'language') }}</div>
                  <div>{{ project.language }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'projectType') }}</div>
                  <div>{{ languageStore.t('projectDetail', 'type', undefined, project.id) }}</div>
                </div>
                
                <div class="mb-3">
                  <div class="text-subtitle-2 font-weight-bold">{{ languageStore.t('projectDetail', 'techStack') }}</div>
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
                <h3 class="text-h5 mb-4">{{ languageStore.t('projectDetail', 'mockups') }}</h3>
                <v-row dense>
                  <v-col v-for="n in mockupCount" :key="`mockup-${n}`" cols="12">
                    <v-card class="mb-4">
                      <v-img
                        :src="`/my-folio/img/Project/mockup-${project.id}-${n}.png`"
                        height="200"
                        cover
                        class="rounded"
                      ></v-img>
                      <v-card-text class="pa-2">
                        {{ languageStore.t('projectDetail', 'screen', undefined, `${project.id}-${n}`) }}
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
  padding-top: 30px;
}

.testimonial-card .v-avatar {
  position: absolute;
  top: -20px;
  left: 20px;
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