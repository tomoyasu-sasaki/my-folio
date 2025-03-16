import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SocialLink {
    id: string
    logo: string
    link: string
    label: string
}

export const useSocialStore = defineStore('social', () => {
    const socialLinks = ref<SocialLink[]>([
        {
            id: 'linkedin',
            logo: 'mdi-linkedin',
            link: 'https://www.linkedin.com/in/tomoyasu-sasaki-8b7a34356/',
            label: 'LinkedIn'
        },
        {
            id: 'twitter',
            logo: 'mdi-twitter',
            link: 'https://x.com/ssk_tmys',
            label: 'Twitter'
        },
        {
            id: 'github',
            logo: 'mdi-github',
            link: 'https://github.com/tomoyasu-sasaki',
            label: 'GitHub'
        },
        {
            id: 'instagram',
            logo: 'mdi-instagram',
            link: 'https://instagram.com/ssk_tmys?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D',
            label: 'Instagram'
        }
    ])

    return {
        socialLinks
    }
}) 