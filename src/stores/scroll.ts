import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Section {
    id: string
    title: string
    ref?: HTMLElement | null
}

export const useScrollStore = defineStore('scroll', () => {
    const sections = ref<Section[]>([
        { id: 'about', title: 'このサイトについて' },
        { id: 'project', title: '成果物' },
        { id: 'skill', title: '技術一覧' },
        { id: 'gallery', title: '生成画像' },
        { id: 'career', title: '経歴' }
    ])

    const activeSection = ref<string>('about')

    const scrollToSection = (sectionId: string) => {
        const section = sections.value.find(s => s.id === sectionId)
        if (section && section.ref) {
            section.ref.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
            activeSection.value = sectionId
        }
    }

    const registerSectionRef = (sectionId: string, element: HTMLElement) => {
        const section = sections.value.find(s => s.id === sectionId)
        if (section) {
            section.ref = element
        }
    }

    const updateActiveSection = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        for (const section of sections.value) {
            if (section.ref) {
                const { top, bottom } = section.ref.getBoundingClientRect()
                const sectionTop = top + window.scrollY
                const sectionBottom = bottom + window.scrollY

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection.value = section.id
                    break
                }
            }
        }
    }

    return {
        sections,
        activeSection,
        scrollToSection,
        registerSectionRef,
        updateActiveSection
    }
})
