import type { ProjectData, ProjectTranslation } from '../normalized/project'
import type { Project } from '../project'
import type { Language } from '../../locales/types'

interface MigrationResult {
    projectData: ProjectData
    translations: Record<Language, ProjectTranslation>
}

export function migrateProject(project: Project): MigrationResult {
    // プロジェクトの基本データを抽出
    const projectData: ProjectData = {
        id: project.id,
        language: project.language,
        image: project.image,
        url: project.url,
        tags: project.tags || [],
        status: project.status,
        details: project.details
    }

    // 翻訳データを作成
    const translations: Record<Language, ProjectTranslation> = {
        ja: {
            id: project.id,
            languageId: 'ja',
            title: project.title,
            subtitle: project.subtitle,
            description: project.description || ''
        },
        en: {
            id: project.id,
            languageId: 'en',
            title: project.title,
            subtitle: project.subtitle,
            description: project.description || ''
        }
    }

    return {
        projectData,
        translations
    }
}

export function migrateAllProjects(projects: Project[]): {
    projectsData: Record<string, ProjectData>
    translations: Record<string, Record<Language, ProjectTranslation>>
} {
    const projectsData: Record<string, ProjectData> = {}
    const translations: Record<string, Record<Language, ProjectTranslation>> = {}

    projects.forEach(project => {
        const { projectData, translations: projectTranslations } = migrateProject(project)
        projectsData[project.id] = projectData
        translations[project.id] = projectTranslations
    })

    return {
        projectsData,
        translations
    }
} 