import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.info('using .env file for environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.info('using .env.example file for environment variables');
  dotenv.config({ path: '.env.example' });
}

export const PORT = process.env.PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const REDIS_PORT = Number(process.env.REDIS_PORT);
export const REDIS_HOST = process.env.REDIS_HOST;
export const NODE_ENV = process.env.NODE_ENV;
