import envalid, { str, port, bool, url } from 'envalid';
import logger from '@app/logger';
import { ConfigInterface } from '@app/interfaces';

const cleanConfig = envalid.cleanEnv(
  process.env,
  {
    NODE_ENV: str({ default: 'production', choices: ['production', 'development'] }),
    PORT: port({ devDefault: 8080 }),
    DATABASE_URL: url(),
    DATABASE_SSL: bool({ default: true, devDefault: false }),
    DATABASE_SYNCHRONIZE: bool({ default: false, devDefault: true }),
    DATABASE_LOGGING: bool({ default: false }),
  },
  {
    strict: true,
  }
);

logger.debug('Environment variables loaded');

const config: ConfigInterface = {
  NODE: {
    ENV: cleanConfig.NODE_ENV,
    PORT: cleanConfig.PORT,
  },
  DATABASE: {
    TYPE: 'postgres',
    URL: cleanConfig.DATABASE_URL,
    SSL: cleanConfig.DATABASE_SSL,
    SYNCHRONIZE: cleanConfig.DATABASE_SYNCHRONIZE,
    LOGGING: cleanConfig.DATABASE_LOGGING,
    ENTITIES: 'entities/**/*',
    MIGRATIONS: 'migration/**/*',
    SUBSCRIBERS: 'subscriber/**/*',
  },
};

logger.debug('Configuration object constructed');

export default config;
