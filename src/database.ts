import exp from 'constants'
import dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()
const
  {
    PG_HOST,
    PG_DB,
    PG_TEST_DB,
    PG_USER,
    PG_PASSWORD,
    ENV
  } = process.env
let client = new Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DB
});
console.log(ENV)
if (ENV == 'test') {
  client = new Pool({
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_TEST_DB
  });
}
export default client