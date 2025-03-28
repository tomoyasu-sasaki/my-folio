import { defineStore } from 'pinia'
import type { Language } from '../../locales/types'

// 基本的なプロジェクトデータの型定義
export interface ProjectData {
    id: string
    language: string
    image: string
    url: string
    tags: string[]
    status: ProjectStatus
    details?: ProjectDetails
}

// プロジェクトの翻訳データの型定義
export interface ProjectTranslation {
    id: string
    languageId: Language
    title: string
    subtitle: string
    description: string
}

// プロジェクトの詳細情報の型定義
export interface ProjectDetails {
    layout?: 'standard' | 'gallery' | 'markdown' | 'timeline'
    mockupCount?: number
    sections?: ProjectSection[]
    githubRepo?: string
    hasDemo?: boolean
    demoUrl?: string
    additionalImages?: string[]
    customComponent?: string
}

// プロジェクトのセクション型定義
export interface ProjectSection {
    type: 'video' | 'gallery' | 'feature-list' | 'tech-stack' | 'testimonial' | 'custom'
    title?: string
    content?: string | string[]
    description?: string | string[]
}

// プロジェクトのステータス型定義
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'end'

// 正規化されたストアの状態の型定義
interface NormalizedState {
    projects: Record<string, ProjectData>
    translations: Record<string, Record<Language, ProjectTranslation>>
}

// プロジェクトストアの定義
export const useNormalizedProjectStore = defineStore('normalizedProject', {
    state: (): NormalizedState => ({
        projects: {},
        translations: {}
    }),

    actions: {
        // プロジェクトの追加
        addProject(project: ProjectData): void {
            this.projects[project.id] = project
        },

        // プロジェクトの翻訳の追加
        addProjectTranslation(translation: ProjectTranslation): void {
            if (!this.translations[translation.id]) {
                this.translations[translation.id] = {} as Record<Language, ProjectTranslation>
            }
            this.translations[translation.id][translation.languageId] = translation
        },

        // プロジェクトの更新
        updateProject(id: string, updates: Partial<ProjectData>): void {
            if (this.projects[id]) {
                this.projects[id] = { ...this.projects[id], ...updates }
            }
        },

        // プロジェクトの翻訳の更新
        updateProjectTranslation(id: string, languageId: Language, updates: Partial<ProjectTranslation>): void {
            if (this.translations[id]?.[languageId]) {
                this.translations[id][languageId] = {
                    ...this.translations[id][languageId],
                    ...updates
                }
            }
        }
    },

    getters: {
        // プロジェクトの取得
        getProjectById: (state) => (id: string): ProjectData | undefined => {
            return state.projects[id]
        },

        // プロジェクトの翻訳の取得
        getProjectTranslation: (state) => (id: string, languageId: Language): ProjectTranslation | undefined => {
            return state.translations[id]?.[languageId]
        },

        // 全プロジェクトの取得
        getAllProjects: (state): ProjectData[] => {
            return Object.values(state.projects)
        },

        // ステータスによるプロジェクトの取得
        getProjectsByStatus: (state) => (status: ProjectStatus): ProjectData[] => {
            return Object.values(state.projects).filter(project => project.status === status)
        }
    }
}) 