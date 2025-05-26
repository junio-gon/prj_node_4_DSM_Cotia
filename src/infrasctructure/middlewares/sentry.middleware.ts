import * as express from 'express';
import * as Sentry from '@sentry/node';

export const sentryRequestHandler = Sentry.Handlers.requestHandler();
export const sentryErrorHandler = Sentry.Handlers.errorHandler();

export function fallbackErrorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
}
