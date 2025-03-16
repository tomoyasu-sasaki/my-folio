<script setup lang="ts">
import ProjectCard from '../parts/ProjectCard.vue'
import { useProjectStore } from '@/stores/project'
import { computed } from 'vue'

const projectStore = useProjectStore()
const projects = computed(() => projectStore.getAllProjects)

</script>

<template>
    <v-container id="projectContainer" class="padding">
        <v-row>
            <v-col
                v-for="project in projects"
                :key="project.id"
                cols="12"
                sm="6"
                md="4"
            >
                <ProjectCard :project="project" />
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
