import { defineStore } from 'pinia'

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
    status: 'completed' | 'in-progress' | 'planned' | 'end'
}

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        projects: [
            {
                id: '01',
                language: 'Vue.js3',
                title: 'GastronomeJourney',
                subtitle: '行った居酒屋の記録用Webアプリ',
                description: '訪れた居酒屋の情報や感想を記録・共有できるWebアプリケーション',
                image: 'GastronomeJourney.png',
                url: '',
                tags: ['Vue.js', 'Firebase', 'Vuetify'],
                status: 'end' as const
            },
            {
                id: '02',
                language: 'Vue.js3',
                title: 'Blogfy',
                subtitle: '日記アプリ',
                description: 'マークダウン対応の日記作成・管理アプリケーション',
                image: 'Blogfy.png',
                url: '',
                tags: ['Vue.js', 'Markdown', 'Vuetify'],
                status: 'end' as const
            },
            {
                id: '03',
                language: 'Vue.js3',
                title: 'TeamFlow',
                subtitle: 'プロジェクト管理Webアプリ',
                description: 'チームのタスク管理とコミュニケーションを効率化するWebアプリ',
                image: 'TeamFlow.png',
                url: '',
                tags: ['Vue.js', 'TypeScript', 'Vuetify'],
                status: 'end' as const
            },
            {
                id: '04',
                language: 'Vue.js3',
                title: 'CodeLearner',
                subtitle: '勉強進捗管理Webアプリ',
                description: 'プログラミング学習の進捗を可視化・管理するWebアプリ',
                image: 'CodeLearner.png',
                url: '',
                tags: ['Vue.js', 'TypeScript', 'Vuetify'],
                status: 'end' as const
            },
            {
                id: '05',
                language: 'Vue.js3',
                title: 'ConnectSphere',
                subtitle: 'Twitter風SNSWebアプリ',
                description: 'プログラマー向けのSNSプラットフォーム',
                image: 'ConnectSphere.png',
                url: '',
                tags: ['Vue.js', 'Firebase', 'Vuetify'],
                status: 'end' as const
            }
        ] as Project[]
    }),
    getters: {
        getProjectById: (state) => {
            return (id: string) => state.projects.find((project) => project.id === id)
        },
        getProjectsByStatus: (state) => {
            return (status: Project['status']) =>
                state.projects.filter((project) => project.status === status)
        },
        getAllProjects: (state) => state.projects
    }
}) 