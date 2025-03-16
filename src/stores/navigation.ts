import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface ExternalLink {
    id: string
    title: string
    path: string
    icon?: string
}

export const useNavigationStore = defineStore('navigation', () => {
    const router = useRouter()
    const externalLinks = ref<ExternalLink[]>([
        {
            id: 'babylonjs',
            title: 'BabylonJS',
            path: '/babylonfolio',
            icon: 'mdi-cube-outline'
        }
    ])

    const openExternalLink = (path: string) => {
        const url = router.resolve({ path }).href
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
        isMobileMenuOpen.value = false
    }

    return {
        externalLinks,
        openExternalLink,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    }
}) 