import { describe, it, expect } from 'vitest';
import { projectTranslations } from '../project';
import type { BaseTranslationItem } from '../types';

interface ProjectSectionTranslation {
  title: BaseTranslationItem;
  description: BaseTranslationItem;
}

interface ProjectStatusTranslation {
  completed: BaseTranslationItem;
  'in-progress': BaseTranslationItem;
  planned: BaseTranslationItem;
  end: BaseTranslationItem;
}

interface ProjectActionTranslation {
  details: BaseTranslationItem;
  visit: BaseTranslationItem;
}

interface ProjectTranslation {
  section: ProjectSectionTranslation;
  status: ProjectStatusTranslation;
  action: ProjectActionTranslation;
}

describe('projectTranslations', () => {
  it('should have all required languages', () => {
    const requiredLanguages = ['ja', 'en'];
    const availableLanguages = Object.keys(projectTranslations);
    
    expect(availableLanguages).toEqual(expect.arrayContaining(requiredLanguages));
  });

  it('should have consistent structure across languages', () => {
    const languages = Object.keys(projectTranslations);
    const firstLang = languages[0];
    const structure = getObjectPaths(projectTranslations[firstLang]);

    languages.forEach(lang => {
      const currentStructure = getObjectPaths(projectTranslations[lang]);
      expect(currentStructure).toEqual(structure);
    });
  });

  it('should have valid section translations', () => {
    Object.entries(projectTranslations).forEach(([lang, translations]) => {
      expect(translations.section).toBeDefined();
      expect(translations.section.title.text).toBeTruthy();
      expect(translations.section.title.description).toBeTruthy();
      expect(translations.section.description.text).toBeTruthy();
      expect(translations.section.description.description).toBeTruthy();
    });
  });

  it('should have valid status translations', () => {
    const requiredStatuses = ['completed', 'in-progress', 'planned', 'end'] as const;
    
    Object.entries(projectTranslations).forEach(([lang, translations]) => {
      expect(translations.status).toBeDefined();
      requiredStatuses.forEach(status => {
        expect(translations.status[status].text).toBeTruthy();
        expect(translations.status[status].description).toBeTruthy();
      });
    });
  });

  it('should have valid action translations', () => {
    const requiredActions = ['details', 'visit'] as const;
    
    Object.entries(projectTranslations).forEach(([lang, translations]) => {
      expect(translations.action).toBeDefined();
      requiredActions.forEach(action => {
        expect(translations.action[action].text).toBeTruthy();
        expect(translations.action[action].description).toBeTruthy();
      });
    });
  });
});

// ヘルパー関数
function getObjectPaths(obj: any, parentPath: string = ''): string[] {
  return Object.entries(obj).reduce((paths: string[], [key, value]) => {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    if (value && typeof value === 'object' && !('text' in value)) {
      return [...paths, ...getObjectPaths(value, currentPath)];
    }
    return [...paths, currentPath];
  }, []);
} 