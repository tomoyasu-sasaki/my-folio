<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import blogTestData from '../../test/blogdata.json'

interface BlogPost {
    id: string
    date: string
    category: string
    title: string
    description?: string
}

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)

// ブログデータの初期化と日付の検証
const blogPosts = ref<BlogPost[]>(blogTestData.map(post => ({
    ...post,
    // 日付が不正な場合は現在の日付を使用
    date: isValidDate(post.date) ? post.date : new Date().toISOString().split('T')[0]
})))

// 日付が有効かチェック
function isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
}

// カテゴリー一覧を取得
const categories = computed(() => {
    const uniqueCategories = new Set(blogPosts.value.map(post => post.category))
    return Array.from(uniqueCategories)
})

// フィルタリングされたブログ記事
const filteredBlogPosts = computed(() => {
    try {
        return blogPosts.value
            .filter(post => {
                const matchesSearch = searchQuery.value === '' ||
                    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchQuery.value.toLowerCase())
                
                const matchesCategory = !selectedCategory.value || 
                    post.category === selectedCategory.value

                return matchesSearch && matchesCategory
            })
            .sort((a, b) => {
                try {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                } catch {
                    return 0 // エラーが発生した場合は順序を変更しない
                }
            })
    } catch (error) {
        console.error('ブログ記事のフィルタリングエラー:', error)
        return []
    }
})

// 日付のフォーマット
const formatDate = (dateString: string): string => {
    try {
        if (!isValidDate(dateString)) {
            return '日付不明'
        }
        
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date)
    } catch (error) {
        console.error('日付フォーマットエラー:', error)
        return '日付不明'
    }
}

// ブログ記事ページへの遷移
const goToBlogPost = (postId: string) => {
    try {
        router.push({ name: 'blogpost', params: { id: postId } })
    } catch (error) {
        console.error('ページ遷移エラー:', error)
    }
}
</script>

<template>
    <v-container id="blogSection" class="blog-section">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <!-- ヘッダーセクション -->
                <div class="text-center mb-8">
                    <h1 class="text-h3 font-weight-bold mb-4">ブログ</h1>
                    <p class="text-subtitle-1">
                        技術的な知見や日々の活動についての記事を掲載しています。
                    </p>
                </div>

                <!-- 検索・フィルターセクション -->
                <v-card class="mb-6 search-filter-card" variant="outlined">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="searchQuery"
                                    prepend-inner-icon="mdi-magnify"
                                    label="記事を検索"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                    clearable
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    v-model="selectedCategory"
                                    :items="categories"
                                    label="カテゴリーで絞り込み"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- ブログ記事リスト -->
                <v-card class="blog-list" variant="outlined">
                    <v-list v-if="filteredBlogPosts.length > 0" style="background-color: transparent !important">
                        <template v-for="(post, index) in filteredBlogPosts" :key="post.id">
                            <v-list-item
                                @click="goToBlogPost(post.id)"
                                :ripple="true"
                                class="blog-item"
                            >
                                <div class="d-flex flex-column">
                                    <div class="d-flex align-center mb-3">
                                        <v-chip
                                            size="small"
                                            color="primary"
                                            variant="flat"
                                            class="category-chip mr-3"
                                        >
                                            {{ post.category }}
                                        </v-chip>
                                        <span class="date-text">{{ formatDate(post.date) }}</span>
                                    </div>

                                    <v-list-item-title class="text-h6 mb-2">
                                        {{ post.title }}
                                    </v-list-item-title>

                                    <v-list-item-subtitle 
                                        v-if="post.description" 
                                        class="description-text"
                                    >
                                        {{ post.description }}
                                    </v-list-item-subtitle>
                                </div>
                            </v-list-item>

                            <v-divider
                                v-if="index < filteredBlogPosts.length - 1"
                                :key="`divider-${post.id}`"
                                class="divider"
                            ></v-divider>
                        </template>
                    </v-list>

                    <!-- 検索結果が0件の場合 -->
                    <v-card-text v-else class="text-center py-8">
                        <v-icon icon="mdi-text-search" size="48" color="grey" class="mb-4" />
                        <p class="text-body-1 text-grey">
                            該当する記事が見つかりませんでした。
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.blog-section {
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 100vh;
}

.search-filter-card {
    backdrop-filter: blur(10px);
}

.blog-list {
    border-radius: 8px;
    backdrop-filter: blur(10px);
}

.blog-item {
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 20px;
    border-radius: 4px;
    margin: 4px;
}

.blog-item:hover {
    transform: translateX(4px);
}

.category-chip {
    min-width: 80px;
    justify-content: center;
}

.date-text {
    font-size: 0.875rem;
}

.description-text {
    line-height: 1.6;
    margin-top: 8px;
}

.divider {
    margin: 0 20px;
    opacity: 0.1;
}

@media (max-width: 600px) {
    .blog-section {
        padding-top: 60px;
        padding-bottom: 60px;
        min-height: auto;
    }

    .text-h3 {
        font-size: 2rem !important;
    }

    .blog-item {
        padding: 16px;
    }

    .v-list-item-title {
        font-size: 1rem !important;
    }

    .description-text {
        font-size: 0.875rem !important;
        line-height: 1.4;
    }

    .category-chip {
        min-width: 60px;
        font-size: 0.75rem;
    }
}
</style>
