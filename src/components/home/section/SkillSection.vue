<script setup lang="ts">
import SkillChart from '../parts/SkillChart.vue'
import { useSkillStore } from '../../../stores/skill'
import type { SkillCategory } from '../../../stores/skill'
import { useLanguageStore } from '../../../stores/language'

const skillStore = useSkillStore()
const languageStore = useLanguageStore()
const categories: SkillCategory[] = ['frontend', 'backend', 'database', 'aws']
</script>

<template>
    <v-container id="skillContainer" class="padding">
        <v-row>
            <v-col
                v-for="category in categories"
                :key="category"
                cols="12"
                md="6"
                class="skill-category"
            >
                <SkillChart
                    :title="languageStore.t('skill', 'categories', category)"
                    :skills="skillStore.getSkillsByCategory(category)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}

.skill-category {
    transition: transform 0.2s ease;
}

.skill-category:hover {
    transform: translateY(-5px);
}
</style>
