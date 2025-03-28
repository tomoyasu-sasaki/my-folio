import { useProjectStore } from '../project'
import { useNormalizedProjectStore } from './project'
import { migrateAllProjects } from '../migrations/projectMigration'

export function initializeNormalizedStores(): void {
    // 既存のストアからデータを取得
    const projectStore = useProjectStore()
    const projects = projectStore.getAllProjects

    // 正規化されたストアを取得
    const normalizedProjectStore = useNormalizedProjectStore()

    // プロジェクトデータを移行
    const { projectsData, translations } = migrateAllProjects(projects)

    // 正規化されたストアにデータを設定
    Object.values(projectsData).forEach(project => {
        normalizedProjectStore.addProject(project)
    })

    Object.entries(translations).forEach(([_projectId, projectTranslations]) => {
        Object.values(projectTranslations).forEach(translation => {
            normalizedProjectStore.addProjectTranslation(translation)
        })
    })
} 