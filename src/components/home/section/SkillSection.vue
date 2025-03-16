<script setup lang="ts">
import SkillChart from '@/components/home/parts/SkillChart.vue'
import { ref } from 'vue'

// 各カテゴリのスキルデータ
const frontendSkills = ref([
    { name: 'Vue.js', level: 50, likes: 80 },
    { name: 'React', level: 0, likes: 0 },
    { name: 'HTML/CSS', level: 80, likes: 80 },
    { name: 'Nuxt.js', level: 20, likes: 10 },
    { name: 'PHP', level: 10, likes: 0 }
])

const backendSkills = ref([
    { name: 'Node.js', level: 10, likes: 20 },
    { name: 'Python(Django)', level: 10, likes: 20 },
    { name: 'Ruby on Rails', level: 0, likes: 0 },
    { name: 'PHP', level: 0, likes: 0 },
    { name: 'C#', level: 0, likes: 0 }
])

const databaseSkills = ref([
    { name: 'MySQL', level: 10, likes: 20 },
    { name: 'PostgreSQL', level: 0, likes: 0 },
    { name: 'SQL Server', level: 30, likes: 20 },
    { name: 'MongoDB', level: 0, likes: 0 },
    { name: 'Oracle', level: 0, likes: 0 }
])

const awsSkills = ref([
    { name: 'EC2', level: 0, likes: 0 },
    { name: 'S3', level: 0, likes: 0 },
    { name: 'Lambda', level: 0, likes: 0 },
    { name: 'CloudFront', level: 0, likes: 0 }
])
</script>

<template>
    <v-container id="skillContainer" class="padding">
        <v-row>
            <!-- フロントエンドのスキルセット -->
            <v-col cols="12" md="6">
                <SkillChart title="フロントエンドスキル" :skills="frontendSkills" />
            </v-col>

            <!-- バックエンドのスキルセット -->
            <v-col cols="12" md="6">
                <SkillChart title="バックエンドスキル" :skills="backendSkills" />
            </v-col>

            <!-- データベースのスキルセット -->
            <v-col cols="12" md="6">
                <SkillChart title="データベーススキル" :skills="databaseSkills" />
            </v-col>

            <!-- AWSのスキルセット -->
            <v-col cols="12" md="6">
                <SkillChart title="AWSサービススキル" :skills="awsSkills" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}
</style>
