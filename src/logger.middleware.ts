export function logger(req, res, next) {
  console.log('[LoggerMiddleware]', req.originalUrl);

  if (next) {
    next();
  }
}
