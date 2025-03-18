import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

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
            status: 'completed' | 'in-progress' | 'planned' | 'end'
        ): Project => {
            return {
                id,
                language,
                image,
                url,
                tags,
                status,
                get title() {
                    return languageStore.t('projectData', 'title', undefined, id) as string
                },
                get subtitle() {
                    return languageStore.t('projectData', 'subtitle', undefined, id) as string
                },
                get description() {
                    return languageStore.t('projectData', 'description', undefined, id) as string
                }
            }
        }

        return {
            projects: [
                createProject(
                    '01',
                    'Vue.js3',
                    'GastronomeJourney.png',
                    '',
                    ['Vue.js', 'Firebase', 'Vuetify'],
                    'end'
                ),
                createProject(
                    '02',
                    'Vue.js3',
                    'Blogfy.png',
                    '',
                    ['Vue.js', 'Markdown', 'Vuetify'],
                    'end'
                ),
                createProject(
                    '03',
                    'Vue.js3',
                    'TeamFlow.png',
                    '',
                    ['Vue.js', 'TypeScript', 'Vuetify'],
                    'end'
                ),
                createProject(
                    '04',
                    'Vue.js3',
                    'CodeLearner.png',
                    '',
                    ['Vue.js', 'TypeScript', 'Vuetify'],
                    'end'
                ),
                createProject(
                    '05',
                    'Vue.js3',
                    'ConnectSphere.png',
                    '',
                    ['Vue.js', 'Firebase', 'Vuetify'],
                    'end'
                )
            ] as Project[]
        }
    },
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