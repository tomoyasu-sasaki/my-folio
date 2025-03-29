import { describe, it, expect } from 'vitest';
import { errorTranslations } from '../error';
import type { BaseTranslationItem } from '../types';

interface ErrorTranslation {
  general: {
    unknown: BaseTranslationItem;
    network: BaseTranslationItem;
    server: BaseTranslationItem;
  };
  validation: {
    required: BaseTranslationItem;
    invalid: BaseTranslationItem;
  };
  translation: {
    sectionNotFound: BaseTranslationItem;
    keyNotFound: BaseTranslationItem;
  };
}

describe('errorTranslations', () => {
  it('should have all required languages', () => {
    const requiredLanguages = ['ja', 'en'];
    const availableLanguages = Object.keys(errorTranslations);
    
    expect(availableLanguages).toEqual(expect.arrayContaining(requiredLanguages));
  });

  it('should have consistent structure across languages', () => {
    const languages = Object.keys(errorTranslations);
    const firstLang = languages[0];
    const structure = getObjectPaths(errorTranslations[firstLang]);

    languages.forEach(lang => {
      const currentStructure = getObjectPaths(errorTranslations[lang]);
      expect(currentStructure).toEqual(structure);
    });
  });

  it('should have valid general error translations', () => {
    const requiredErrors = ['unknown', 'network', 'server'] as const;
    
    Object.entries(errorTranslations).forEach(([lang, translations]) => {
      expect(translations.general).toBeDefined();
      requiredErrors.forEach(error => {
        expect(translations.general[error].text).toBeTruthy();
        expect(translations.general[error].description).toBeTruthy();
      });
    });
  });

  it('should have valid validation error translations', () => {
    const requiredErrors = ['required', 'invalid'] as const;
    
    Object.entries(errorTranslations).forEach(([lang, translations]) => {
      expect(translations.validation).toBeDefined();
      requiredErrors.forEach(error => {
        expect(translations.validation[error].text).toBeTruthy();
        expect(translations.validation[error].description).toBeTruthy();
      });
    });
  });

  it('should have valid translation error translations', () => {
    const requiredErrors = ['sectionNotFound', 'keyNotFound'] as const;
    
    Object.entries(errorTranslations).forEach(([lang, translations]) => {
      expect(translations.translation).toBeDefined();
      requiredErrors.forEach(error => {
        expect(translations.translation[error].text).toBeTruthy();
        expect(translations.translation[error].description).toBeTruthy();
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