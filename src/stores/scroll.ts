import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logger } from '../utils/logger'

export interface Section {
    id: string
    title: string
    ref?: HTMLElement
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

    const scrollToSection = (sectionId: string): void => {
        try {
            const section = sections.value.find(s => s.id === sectionId)
            if (!section) {
                throw new Error(`Section not found: ${sectionId}`)
            }
            if (!section.ref) {
                throw new Error(`Section ref not registered: ${sectionId}`)
            }

            section.ref.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
            activeSection.value = sectionId
        } catch (error) {
            logger.error('Failed to scroll to section', { sectionId }, error as Error)
        }
    }

    const registerSectionRef = (sectionId: string, element: HTMLElement): void => {
        try {
            const section = sections.value.find(s => s.id === sectionId)
            if (!section) {
                throw new Error(`Section not found: ${sectionId}`)
            }
            section.ref = element
            logger.debug('Section ref registered', { sectionId })
        } catch (error) {
            logger.error('Failed to register section ref', { sectionId }, error as Error)
        }
    }

    const updateActiveSection = (): void => {
        try {
            const scrollPosition = window.scrollY + window.innerHeight / 3
            let foundActive = false
            
            for (const section of sections.value) {
                if (!section.ref) {
                    logger.warn('Section ref not found', { sectionId: section.id })
                    continue
                }

                const { top, bottom } = section.ref.getBoundingClientRect()
                const sectionTop = top + window.scrollY
                const sectionBottom = bottom + window.scrollY

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection.value = section.id
                    foundActive = true
                    break
                }
            }

            if (!foundActive) {
                // スクロール位置が最も近いセクションをアクティブにする
                const closestSection = sections.value.reduce((closest, section) => {
                    if (!section.ref) return closest
                    const { top } = section.ref.getBoundingClientRect()
                    const distance = Math.abs(top)
                    return !closest || distance < closest.distance
                        ? { id: section.id, distance }
                        : closest
                }, { id: '', distance: Infinity })

                if (closestSection.id) {
                    activeSection.value = closestSection.id
                }
            }
        } catch (error) {
            logger.error('Failed to update active section', undefined, error as Error)
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
