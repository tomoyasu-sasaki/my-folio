import { logger } from './logger'
import type { ErrorCode, TranslationError } from '../locales/types'

/**
 * 型チェックエラーの定義
 */
export interface TypeError extends TranslationError {
  expected: string
  received: unknown
  path?: string
}

/**
 * 型チェックエラーを生成する
 */
const createTypeError = (
  code: ErrorCode,
  message: string,
  expected: string,
  received: unknown,
  path?: string
): TypeError => ({
  code,
  message,
  expected,
  received,
  path,
  details: { expected, received, path }
})

/**
 * オブジェクトの型を検証する
 */
export const validateObjectType = <T extends Record<string, unknown>>(
  value: unknown,
  expectedKeys: (keyof T)[],
  typeName: string,
  path = ''
): value is T => {
  if (typeof value !== 'object' || value === null) {
    logger.error(
      'Type validation error',
      { path },
      createTypeError(
        'VALIDATION_ERROR',
        `Expected ${typeName} to be an object`,
        'object',
        typeof value
      )
    )
    return false
  }

  for (const key of expectedKeys) {
    if (!(key in value)) {
      logger.error(
        'Type validation error',
        { path },
        createTypeError(
          'VALIDATION_ERROR',
          `Missing required property '${String(key)}' in ${typeName}`,
          String(key),
          Object.keys(value)
        )
      )
      return false
    }
  }

  return true
}

/**
 * 配列の型を検証する
 */
export const validateArrayType = <T>(
  value: unknown,
  validator: (item: unknown) => item is T,
  typeName: string,
  path = ''
): value is T[] => {
  if (!Array.isArray(value)) {
    logger.error(
      'Type validation error',
      { path },
      createTypeError(
        'VALIDATION_ERROR',
        `Expected ${typeName} to be an array`,
        'array',
        typeof value
      )
    )
    return false
  }

  return value.every((item, index) => {
    const isValid = validator(item)
    if (!isValid) {
      logger.error(
        'Type validation error',
        { path: `${path}[${index}]` },
        createTypeError(
          'VALIDATION_ERROR',
          `Invalid item in ${typeName} array at index ${index}`,
          typeName,
          item
        )
      )
    }
    return isValid
  })
}

/**
 * 列挙型の値を検証する
 */
export const validateEnumValue = <T extends string>(
  value: unknown,
  enumValues: readonly T[],
  typeName: string,
  path = ''
): value is T => {
  if (typeof value !== 'string' || !enumValues.includes(value as T)) {
    logger.error(
      'Type validation error',
      { path },
      createTypeError(
        'VALIDATION_ERROR',
        `Invalid ${typeName} value`,
        enumValues.join(' | '),
        value
      )
    )
    return false
  }
  return true
} 