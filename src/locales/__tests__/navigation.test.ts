import { describe, it, expect } from 'vitest';
import { navigationTranslations } from '../navigation';
import type { NavigationTranslationItem } from '../types';

interface NavigationTranslation {
  home: NavigationTranslationItem;
  about: NavigationTranslationItem;
  skill: NavigationTranslationItem;
  career: NavigationTranslationItem;
  project: NavigationTranslationItem;
  gallery: NavigationTranslationItem;
}

describe('navigationTranslations', () => {
  it('should have all required languages', () => {
    const requiredLanguages = ['ja', 'en'];
    const availableLanguages = Object.keys(navigationTranslations);
    
    expect(availableLanguages).toEqual(expect.arrayContaining(requiredLanguages));
  });

  it('should have consistent structure across languages', () => {
    const languages = Object.keys(navigationTranslations);
    const firstLang = languages[0];
    const structure = getObjectPaths(navigationTranslations[firstLang]);

    languages.forEach(lang => {
      const currentStructure = getObjectPaths(navigationTranslations[lang]);
      expect(currentStructure).toEqual(structure);
    });
  });

  it('should have valid navigation items', () => {
    const requiredKeys = ['home', 'about', 'skill', 'career', 'project', 'gallery'];
    
    Object.entries(navigationTranslations).forEach(([lang, translations]) => {
      requiredKeys.forEach(key => {
        const item = translations[key as keyof NavigationTranslation];
        expect(item).toBeDefined();
        expect(item.text).toBeTruthy();
        expect(item.ariaLabel).toBeTruthy();
      });
    });
  });

  it('should have valid aria labels', () => {
    Object.entries(navigationTranslations).forEach(([lang, translations]) => {
      Object.entries(translations).forEach(([key, item]) => {
        expect(item.ariaLabel).toBeTruthy();
        expect(typeof item.ariaLabel).toBe('string');
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