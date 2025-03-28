import { describe, it, expect } from 'vitest';
import { skillTranslations } from '../skill';
import type { BaseTranslationDict } from '../types';

describe('skillTranslations', () => {
  it('should have all required languages', () => {
    expect(Object.keys(skillTranslations)).toEqual(['ja', 'en']);
  });

  it('should have consistent structure across languages', () => {
    const structure = getObjectPaths(skillTranslations.ja as unknown as BaseTranslationDict);
    Object.entries(skillTranslations).forEach(([_, translation]) => {
      const currentStructure = getObjectPaths(translation as unknown as BaseTranslationDict);
      expect(currentStructure).toEqual(structure);
    });
  });

  it('should have valid evaluation translations', () => {
    Object.entries(skillTranslations).forEach(([_lang, translations]) => {
      expect(translations.evaluation).toBeDefined();
      expect(translations.evaluation.experience.text).toBeTruthy();
      expect(translations.evaluation.experience.description).toBeTruthy();
      expect(translations.evaluation.preference.text).toBeTruthy();
      expect(translations.evaluation.preference.description).toBeTruthy();
    });
  });

  it('should have valid category translations', () => {
    const requiredCategories = ['frontend', 'backend', 'infrastructure', 'design', 'management', 'other'] as const;
    
    Object.entries(skillTranslations).forEach(([_lang, translations]) => {
      expect(translations.categories).toBeDefined();
      requiredCategories.forEach(category => {
        expect(translations.categories.names[category]).toBeTruthy();
        expect(translations.categories.descriptions[category]).toBeTruthy();
      });
    });
  });
});

// オブジェクトのすべてのパスを取得するヘルパー関数
function getObjectPaths(obj: BaseTranslationDict, prefix = ''): string[] {
  return Object.entries(obj).reduce((paths: string[], [key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return [...paths, ...getObjectPaths(value as BaseTranslationDict, currentPath)];
    }
    return [...paths, currentPath];
  }, []).sort();
} 