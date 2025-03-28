import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { initializeNormalizedStores } from '../initializeStores'
import { useProjectStore } from '../../project'
import { useNormalizedProjectStore } from '../project'
import type { Project } from '../../project'

describe('initializeNormalizedStores', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('正しくプロジェクトデータを移行すること', () => {
        // 既存のストアにテストデータを設定
        const projectStore = useProjectStore()
        const testProject: Project = {
            id: 'test-project',
            language: 'TypeScript',
            title: 'テストプロジェクト',
            subtitle: 'テストの説明',
            description: 'テストの詳細説明',
            image: 'test.png',
            url: 'https://example.com',
            tags: ['Test', 'TypeScript'],
            status: 'completed',
            details: {
                layout: 'standard',
                mockupCount: 3
            }
        }
        projectStore.$patch((state) => {
            state.projects = [testProject]
        })

        // 初期化処理を実行
        initializeNormalizedStores()

        // 正規化されたストアを確認
        const normalizedStore = useNormalizedProjectStore()
        const normalizedProject = normalizedStore.getProjectById('test-project')
        const jaTranslation = normalizedStore.getProjectTranslation('test-project', 'ja')
        const enTranslation = normalizedStore.getProjectTranslation('test-project', 'en')

        // プロジェクトデータの検証
        expect(normalizedProject).toBeDefined()
        expect(normalizedProject?.id).toBe('test-project')
        expect(normalizedProject?.language).toBe('TypeScript')
        expect(normalizedProject?.tags).toEqual(['Test', 'TypeScript'])
        expect(normalizedProject?.status).toBe('completed')
        expect(normalizedProject?.details).toEqual({
            layout: 'standard',
            mockupCount: 3
        })

        // 翻訳データの検証
        expect(jaTranslation).toBeDefined()
        expect(jaTranslation?.title).toBe('テストプロジェクト')
        expect(jaTranslation?.subtitle).toBe('テストの説明')
        expect(jaTranslation?.description).toBe('テストの詳細説明')

        expect(enTranslation).toBeDefined()
        expect(enTranslation?.title).toBe('テストプロジェクト')
        expect(enTranslation?.subtitle).toBe('テストの説明')
        expect(enTranslation?.description).toBe('テストの詳細説明')
    })
}) 