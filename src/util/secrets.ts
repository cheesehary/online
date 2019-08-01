import dotenv from "dotenv";
import logger from "./logger";

if (process.env.NODE_ENV === "production") {
  logger.info("using .env file for environment variables");
  dotenv.config({ path: ".env" });
} else if (process.env.NODE_ENV === "docker") {
  logger.info("using .env.docker file for environment variables");
  dotenv.config({ path: ".docker.env" });
} else {
  logger.info("using .env.dev file for environment variables");
  dotenv.config({ path: ".dev.env" });
}

export const PORT = process.env.PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const REDIS_PORT = Number(process.env.REDIS_PORT);
export const REDIS_HOST = process.env.REDIS_HOST;
