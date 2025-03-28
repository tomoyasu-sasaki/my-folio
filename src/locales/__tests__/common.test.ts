import { describe, it, expect } from 'vitest';
import { commonTranslations } from '../common';

describe('commonTranslations', () => {
  it('should have all required languages', () => {
    expect(Object.keys(commonTranslations)).toEqual(['ja', 'en']);
  });

  it('should have consistent structure across languages', () => {
    const structure = getObjectPaths(commonTranslations.ja);
    Object.entries(commonTranslations).forEach(([_, translation]) => {
      const currentStructure = getObjectPaths(translation);
      expect(currentStructure).toEqual(structure);
    });
  });

  it('should have non-empty text for all translations', () => {
    Object.entries(commonTranslations).forEach(([_, translations]) => {
      const paths = getObjectPaths(translations);
      paths.forEach(path => {
        const value = getValueByPath(translations, path);
        if (typeof value === 'object' && value !== null && 'text' in value) {
          expect(value.text).toBeTruthy();
        }
      });
    });
  });

  it('should have valid descriptions for all translations', () => {
    Object.entries(commonTranslations).forEach(([_, translations]) => {
      const paths = getObjectPaths(translations);
      paths.forEach(path => {
        const value = getValueByPath(translations, path);
        if (typeof value === 'object' && value !== null && 'description' in value) {
          expect(value.description).toBeTruthy();
        }
      });
    });
  });
});

// オブジェクトのすべてのパスを取得するヘルパー関数
function getObjectPaths<T>(obj: T, prefix = ''): string[] {
  return Object.entries(obj as Record<string, unknown>).reduce((paths: string[], [key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value) && !('text' in value)) {
      return [...paths, ...getObjectPaths(value, currentPath)];
    }
    return [...paths, currentPath];
  }, []).sort();
}

function getValueByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce((current: Record<string, unknown>, key) => 
    current[key] as Record<string, unknown>, obj as Record<string, unknown>);
} 