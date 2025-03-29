import { computed } from 'vue'
import { useNormalizedProjectStore } from '../stores/normalized/project'
import type { Project } from '../stores/project'
import type { ComputedRef } from 'vue'
import type { ProjectData } from '../stores/normalized/project'

export interface ProjectWithTranslation extends Project {
    title: string
    subtitle: string
    description: string
}

export interface UseProjectDataReturn {
    allProjects: ComputedRef<ProjectWithTranslation[]>
    getProjectWithTranslation: (id: string) => ProjectWithTranslation | undefined
}

export function useProjectData(): UseProjectDataReturn {
    const normalizedStore = useNormalizedProjectStore()

    const allProjects = computed<ProjectWithTranslation[]>(() => {
        const projects = Object.values(normalizedStore.projects)
        return projects.map((project: ProjectData) => {
            const translation = normalizedStore.getProjectTranslation(project.id, 'ja')
            return {
                ...project,
                title: translation?.title ?? '',
                subtitle: translation?.subtitle ?? '',
                description: translation?.description ?? ''
            }
        })
    })

    const getProjectWithTranslation = (id: string): ProjectWithTranslation | undefined => {
        const project = normalizedStore.getProjectById(id)
        if (!project) return undefined

        const translation = normalizedStore.getProjectTranslation(id, 'ja')
        if (!translation) return undefined

        return {
            ...project,
            title: translation.title,
            subtitle: translation.subtitle,
            description: translation.description
        }
    }

    return {
        allProjects,
        getProjectWithTranslation
    }
} 