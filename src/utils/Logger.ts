import { Sentry } from '@infrasctructure/config/sentry';

export class Logger {
  static info(message: string, context?: Record<string, any>) {
    console.log(`[INFO]: ${message}`);
    Sentry.captureMessage(message, {
      level: 'info',
      extra: context,
    });
  }

  static warning(message: string, context?: Record<string, any>) {
    console.warn(`[WARNING]: ${message}`);
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  }

  static error(error: Error, context?: Record<string, any>) {
    console.error(`[ERROR]: ${error.message}`);
    Sentry.captureException(error, {
      level: 'error',
      extra: context,
    });
  }

  static debug(message: string, context?: Record<string, any>) {
    console.debug(`[DEBUG]: ${message}`);
    Sentry.captureMessage(message, {
      level: 'debug',
      extra: context,
    });
  }
}