<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
    {
        id: '01',
        language: 'Vue.js3',
        title: 'GastronomeJourney',
        subtitle: '行った居酒屋の記録用Webアプリ',
        image: 'GastronomeJourney.png',
        url: 'https://gjourney-project.firebaseapp.com/'
    },
    {
        id: '02',
        language: 'Vue.js3',
        title: 'Blogfy',
        subtitle: '日記アプリ',
        image: 'Blogfy.png',
        url: ''
    },
    {
        id: '03',
        language: 'Vue.js3',
        title: 'TeamFlow',
        subtitle: 'プロジェクト管理Webアプリ',
        image: 'TeamFlow.png',
        url: ''
    },
    {
        id: '04',
        language: 'Vue.js3',
        title: 'CodeLearner ',
        subtitle: '勉強進捗管理Webアプリ',
        image: 'CodeLearner.png',
        url: ''
    },
    {
        id: '05',
        language: 'Vue.js3',
        title: 'ConnectSphere',
        subtitle: 'Twitter風SNSWebアプリ',
        image: 'ConnectSphere.png',
        url: ''
    }
])
function openOtherService(url: string) {
    if (url) {
        window.open(url, '_blank')
    }
}
</script>

<template>
    <v-container id="projectContainer" class="padding">
        <v-row>
            <v-col cols="12" md="4" v-for="project in projects" :key="project.id">
                <v-card variant="outlined">
                    <v-img :src="`/img/Project/${project?.image}`" height="250px" />

                    <v-card-title>{{ project?.title }}</v-card-title>
                    <v-card-subtitle>{{ project?.subtitle }}</v-card-subtitle>

                    <v-card-actions>
                        <v-btn variant="outlined" @click="openOtherService(project.url)">
                            詳細
                        </v-btn>
                    </v-card-actions>
                </v-card>
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
