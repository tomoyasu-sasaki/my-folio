import type { ErrorCode, TranslationError } from '../locales/types';
import { logger } from './logger';
/**
 * カスタムエラークラス
 */
export class AppError extends Error {
  code: ErrorCode;
  details?: unknown;

  constructor(error: TranslationError) {
    super(error.message);
    this.name = 'AppError';
    this.code = error.code;
    this.details = error.details;
  }
}

/**
 * エラーハンドリングユーティリティ
 */
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCallbacks: ((error: AppError) => void)[] = [];

  private constructor() {}

  /**
   * シングルトンインスタンスを取得
   */
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * エラーハンドリングコールバックを登録
   */
  public registerErrorCallback(callback: (error: AppError) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * エラーを処理
   */
  public handleError(error: unknown): void {
    const appError = this.normalizeError(error);
    this.notifyErrorCallbacks(appError);
  }

  /**
   * エラーを標準化
   */
  private normalizeError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError({
        code: 'INVALID_VALUE',
        message: error.message,
        details: error
      });
    }

    return new AppError({
      code: 'INVALID_VALUE',
      message: 'An unknown error occurred',
      details: error
    });
  }

  /**
   * 登録されたコールバックにエラーを通知
   */
  private notifyErrorCallbacks(error: AppError): void {
    this.errorCallbacks.forEach(callback => {
      try {
        callback(error);
      } catch (callbackError) {
        logger.error('Error in error callback:', callbackError);
      }
    });
  }
}

/**
 * エラーハンドリングのグローバルインスタンス
 */
export const errorHandler = ErrorHandler.getInstance(); 