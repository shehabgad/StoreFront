import client from '../database';
import dotenv from 'dotenv';
dotenv.config();
const bcrypt = require('bcrypt');

const { SALT_ROUNDS, PEPPER } = process.env;
export type User = {
  name: string;
  id: number;
  password_digest: string;
};
export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get users ${err}`);
    }
  }
  async signUp(name: string, password: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (name,password_digest) VALUES ($1,$2) RETURNING *';
      const salt_rounds: string = '' + SALT_ROUNDS;
      const hash = bcrypt.hashSync(password + PEPPER, parseInt(salt_rounds));
      const result = await conn.query(sql, [name, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create user ${err}`);
    }
  }
  async signIn(name: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT * from users WHERE name = $1';
    const result = await conn.query(sql, [name]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
        return user;
      }
    }
    conn.release();
    return null;
  }
}
