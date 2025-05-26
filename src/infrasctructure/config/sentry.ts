import * as Sentry from '@sentry/node';
import dotenv from "dotenv";

dotenv.config();

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    enabled: true,
    tracesSampleRate: 1.0,
    sendDefaultPii: true,
  });
}

export { Sentry };