import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

// プロジェクトのステータス型定義
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'end'

// プロジェクトの型定義
export interface Project {
    id: string
    language: string
    title: string
    subtitle: string
    description?: string
    image: string
    url: string
    tags?: string[]
    status: ProjectStatus
    // 拡張性のあるデータ
    details?: {
        layout?: 'standard' | 'gallery' | 'markdown' | 'timeline'
        mockupCount?: number
        sections?: Array<{
            type: 'video' | 'gallery' | 'feature-list' | 'tech-stack' | 'testimonial' | 'custom'
            title?: string
            content?: string | string[]
            description?: string | string[]
        }>
        githubRepo?: string
        hasDemo?: boolean
        demoUrl?: string
        additionalImages?: string[]
        customComponent?: string
    }
}

export const useProjectStore = defineStore({
    id: 'project',
    state: () => {
        // 言語ストアを取得
        const languageStore = useLanguageStore()

        // 翻訳対応したプロジェクトを生成する関数
        const createProject = (
            id: string,
            language: string,
            image: string,
            url: string,
            tags: string[],
            status: ProjectStatus,
            details?: Project['details']
        ): Project => {
            return {
                id,
                language,
                image,
                url,
                tags,
                status,
                details,
                get title(): string {
                    return languageStore.t('projectData', 'items', id, 'title') as string
                },
                get subtitle(): string {
                    return languageStore.t('projectData', 'items', id, 'subtitle') as string
                },
                get description(): string {
                    return languageStore.t('projectData', 'items', id, 'description') as string
                }
            }
        }

        return {
            projects: [
                createProject(
                    '01',
                    'Flutter',
                    'GastronomeJourney.png',
                    '',
                    ['Flutter', 'Firebase', 'Dart'],
                    'end',
                    {
                        layout: 'gallery',
                        mockupCount: 13,
                        githubRepo: 'https://github.com/tomoyasu-sasaki/GastronomeJourney',
                        hasDemo: true,
                        demoUrl: 'https://gastronomejourney.apps',
                        sections: [
                            {
                                type: 'feature-list',
                                title: 'core-features',
                                content: ['feature-1', 'feature-2', 'feature-3', 'feature-4']
                            },
                            {
                                type: 'gallery',
                                title: 'screenshots',
                            },
                            {
                                type: 'custom',
                                title: 'architecture',
                                content: 'architecture-description'
                            }
                        ],
                        additionalImages: [
                            'GastronomeJourney/gastronome-architecture.png',
                            'GastronomeJourney/gastronome-data-flow.png'
                        ],
                        customComponent: 'GastronomeJourneyDetail'
                    }
                ),
                createProject(
                    '02',
                    'Vue.js3',
                    'Blogfy.png',
                    '',
                    ['Vue.js', 'Markdown', 'Vuetify'],
                    'end',
                    {
                        layout: 'markdown',
                        mockupCount: 3,
                        sections: [
                            {
                                type: 'feature-list',
                                title: 'core-features',
                                content: ['feature-1', 'feature-2', 'feature-3', 'feature-4']
                            },
                            {
                                type: 'video',
                                title: 'demo-video',
                                content: 'blogfy-demo.mp4'
                            }
                        ]
                    }
                ),
                createProject(
                    '03',
                    'Vue.js3',
                    'TeamFlow.png',
                    '',
                    ['Vue.js', 'TypeScript', 'Vuetify'],
                    'end',
                    {
                        layout: 'standard',
                        mockupCount: 4,
                        sections: [
                            {
                                type: 'feature-list',
                                title: 'core-features',
                                content: ['feature-1', 'feature-2', 'feature-3', 'feature-4']
                            },
                            {
                                type: 'tech-stack',
                                title: 'technology',
                            }
                        ]
                    }
                ),
                createProject(
                    '04',
                    'Vue.js3',
                    'CodeLearner.png',
                    '',
                    ['Vue.js', 'TypeScript', 'Vuetify'],
                    'end',
                    {
                        layout: 'timeline',
                        mockupCount: 3,
                        sections: [
                            {
                                type: 'feature-list',
                                title: 'core-features',
                                content: ['feature-1', 'feature-2', 'feature-3', 'feature-4']
                            },
                            {
                                type: 'testimonial',
                                title: 'user-feedback',
                                content: ['testimonial-1', 'testimonial-2', 'testimonial-3']
                            }
                        ]
                    }
                ),
                createProject(
                    '05',
                    'Vue.js3',
                    'ConnectSphere.png',
                    '',
                    ['Vue.js', 'Firebase', 'Vuetify'],
                    'end',
                    {
                        layout: 'standard',
                        mockupCount: 3,
                        sections: [
                            {
                                type: 'feature-list',
                                title: 'core-features',
                                content: ['feature-1', 'feature-2', 'feature-3', 'feature-4']
                            }
                        ]
                    }
                )
            ] as Project[]
        }
    },
    getters: {
        getProjectById: (state): (id: string) => Project | undefined => {
            return (id: string): Project | undefined =>
                state.projects.find((project) => project.id === id)
        },
        getProjectsByStatus: (state): (status: Project['status']) => Project[] => {
            return (status: Project['status']): Project[] =>
                state.projects.filter((project) => project.status === status)
        },
        getAllProjects: (state): Project[] => state.projects
    }
}) 