<script setup lang="ts">
import { ref } from 'vue'
const icons = ref([
    { logo: 'mdi-facebook', link: 'https://www.facebook.com/profile.php?id=100093524602921' },
    { logo: 'mdi-twitter', link: 'https://qiita.com/ssk_tmys' },
    // { logo: 'mdi-github', link: 'https://github.com/sasaki-tmys' },
    {
        logo: 'mdi-instagram',
        link: 'https://instagram.com/ssk_tmys?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D'
    }
])

const openOtherApplication = (link: string) => {
    window.open(link, '_blank')
}
</script>

<style scoped>
.v-footer {
    text-align: center;
    display: flex;
    padding: 0%;
    flex-direction: column;
}
</style>
<template>
    <v-footer color="background" class="pb-4">
        <div>
            <v-btn
                v-for="(icon, index) in icons"
                :key="index"
                variant="text"
                :icon="icon.logo"
                size="x-large"
                @click.stop="openOtherApplication(icon.link)"
            />
        </div>
        <div>
            Copyright© {{ new Date().getFullYear() }} — <strong>ssk-tmysのポートフォリオ</strong>
        </div>
    </v-footer>
</template>
