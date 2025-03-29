import type { TranslationError } from '../locales/types'

/**
 * ログレベルの定義
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

/**
 * ログメッセージの構造
 */
interface LogMessage {
  level: LogLevel
  timestamp: string
  message: string
  context?: unknown
  error?: Error | TranslationError
}

/**
 * 開発環境かどうかを判定
 */
const isDevelopment = import.meta.env.DEV

/**
 * ログメッセージをフォーマットする
 */
const formatLogMessage = (message: LogMessage): string => {
  const base = `[${message.timestamp}] ${message.level.toUpperCase()}: ${message.message}`
  if (message.context) {
    return `${base}\nContext: ${JSON.stringify(message.context, null, 2)}`
  }
  return base
}

/**
 * ログを記録する
 */
const log = (level: LogLevel, message: string, context?: unknown, error?: Error | TranslationError): void => {
  const logMessage: LogMessage = {
    level,
    timestamp: new Date().toISOString(),
    message,
    context,
    error
  }

  // 開発環境の場合のみ詳細なログを出力
  if (isDevelopment) {
    const formattedMessage = formatLogMessage(logMessage)
    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(formattedMessage, error || '')
        break
      case 'info':
        // eslint-disable-next-line no-console
        console.info(formattedMessage, error || '')
        break
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(formattedMessage, error || '')
        break
      case 'error':
        // eslint-disable-next-line no-console
        console.error(formattedMessage, error || '')
        break
    }
  }

  // TODO: 本番環境では外部のログ収集サービスにログを送信する
  // if (isProduction) {
  //   sendLogToExternalService(logMessage)
  // }
}

/**
 * ロガーインスタンス
 */
export const logger = {
  debug: (message: string, context?: unknown): void => log('debug', message, context),
  info: (message: string, context?: unknown): void => log('info', message, context),
  warn: (message: string, context?: unknown, error?: Error): void => log('warn', message, context, error),
  error: (message: string, context?: unknown, error?: Error | TranslationError): void => log('error', message, context, error)
} 