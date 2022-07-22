import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const { SALT_ROUNDS, PEPPER } = process.env;
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
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
  async getUser(userName: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE userName = '${userName}';`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get product ${err}`);
    }
  }
  async create(userName: string, firstName: string, lastName: string, password: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (userName,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETURNING *';
      const salt_rounds: string = '' + SALT_ROUNDS;
      const hash = bcrypt.hashSync(password + PEPPER, parseInt(salt_rounds));
      const result = await conn.query(sql, [userName,firstName,lastName, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create user ${err}`);
    }
  }
  async updateOne(firstName: string, lastName: string, password:string, userName:string): Promise<User>
  {
    try {
    const conn = await client.connect();
    const salt_rounds: string = '' + SALT_ROUNDS;
    const hash = bcrypt.hashSync(password + PEPPER, parseInt(salt_rounds));
    const sql = "UPDATE users SET firstName =($1), lastName =($2), password=($3) WHERE userName = ($4) RETURNING *"
    const result = await conn.query(sql,[firstName,lastName,hash,userName])
    conn.release();
    return result.rows[0];
    } catch (err) {
      throw new Error("cannot update user")
    }
  }
  async login(userName: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT * from users WHERE userName = ($1)';
    const result = await conn.query(sql, [userName]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + PEPPER, user.password)) {
        
        return user;
      }
    }
    conn.release();
    return null;
  }
}
