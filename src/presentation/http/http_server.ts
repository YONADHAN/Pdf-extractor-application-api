import { createServer } from 'http';
import { app } from '../../app.js';
import { config } from '../../shared/config/env.validation.js';
import { logger } from '../../shared/logger/logger.js';

export const startServer = () => {
  const server = createServer(app);

  server.listen(config.server.port, () => {
    logger.info(`🚀 Server running at http://localhost:${config.server.port}`);
  });

  const shutdown = () => {
    logger.info('🛑 Shutting down server...');
    server.close(() => {
      logger.info('✅ Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
};
