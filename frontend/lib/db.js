import * as pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  host: process.env.RDS_ENDPOINT,
  port: process.env.RDS_PORT
});
