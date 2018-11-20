import bunyan from 'bunyan';
import path from 'path';

const logger = bunyan.createLogger({
  name: 'app',
  src: true,
  streams: [
    {
      level: 'error',
      path: 'tmp/server-error.log',
      stream: process.stdout
    }
  ]
});

logger.level(process.env.NODE_ENV === 'production' ? 'info' : 'debug');

export default logger;
