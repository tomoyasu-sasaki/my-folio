<script setup lang="ts">
const Gallery = [
    '/img/Gallery/GalleryCollection1.png',
    '/img/Gallery/GalleryCollection2.png',
    '/img/Gallery/GalleryCollection3.png',
    '/img/Gallery/GalleryCollection4.png',
    '/img/Gallery/GalleryCollection5.png',
    '/img/Gallery/GalleryCollection6.png',
    '/img/Gallery/GalleryCollection7.png',
    '/img/Gallery/GalleryCollection8.png',
    '/img/Gallery/GalleryCollection9.png',
    '/img/Gallery/GalleryCollection10.png',
    '/img/Gallery/GalleryCollection11.png',
    '/img/Gallery/GalleryCollection12.png',
    '/img/Gallery/GalleryCollection13.png',
    '/img/Gallery/GalleryCollection14.png',
    '/img/Gallery/GalleryCollection15.png'
]
</script>
<template>
    <v-container id="GallerySection" class="padding">
        <v-chip variant="outlined" size="x-large" text="DALL-E2" />
        <v-carousel hide-delimiters>
            <v-carousel-item
                v-for="(collection, index) in Gallery"
                :key="index"
                :src="collection"
            />
        </v-carousel>
    </v-container>
</template>

<style scoped>
img {
    max-width: 80%;
    max-height: 80%;
    vertical-align: bottom;
}
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}
</style>
