require('dotenv').config(); // eslint-disable-line

export const SecretKeyList = {
  POSTGRE_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  RUN_MIGRATIONS: process.env.RUN_MIGRATIONS,
}