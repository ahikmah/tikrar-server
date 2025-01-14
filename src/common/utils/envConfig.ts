import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  DB_HOST: str({ devDefault: testOnly("localhost") }),
  DB_PORT: num({ devDefault: testOnly(5432) }),
  DB_USER: str({ devDefault: testOnly("postgres") }),
  DB_PASSWORD: str({ devDefault: testOnly("password") }),
  DB_NAME: str({ devDefault: testOnly("postgres") }),
  JWT_SECRET: str({ devDefault: testOnly("secret") }),
  JWT_EXPIRES_IN: str({ devDefault: testOnly("24h") }),
});
