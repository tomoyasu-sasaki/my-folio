<script setup lang="ts">
import blogTestData from '@/components/test/blogdata.json'
import router from '@/router'
import { ref } from 'vue'

const blog_list = ref(blogTestData)

const goToBlogPage = (postId: string) => {
    router.push({ name: 'blogpost', params: { id: postId } })
}
</script>

<template>
    <v-container class="padding">
        <v-list class="list-background">
            <v-list-item
                v-for="(blog, index) in blog_list"
                :key="index"
                @click="goToBlogPage(blog.id)"
                :title="`${blog.date} ${blog.category}`"
                :subtitle="`${blog.title}`"
                class="pb-2"
            />
        </v-list>
    </v-container>
</template>

<style scoped>
.list-background {
    background-color: transparent;
}
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}
</style>
