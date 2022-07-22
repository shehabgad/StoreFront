import {User, Users } from '../../models/users'
import client from '../../database'
import dotenv from 'dotenv';
dotenv.config();
const bcrypt = require('bcrypt');
const store = new Users()
let user :User;
describe('Users model ', () => {
  beforeAll(async () => {
    const conn = await client.connect();
    const sql =
        'INSERT INTO users (userName,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETURNING *';
    const salt_rounds: string = '' + process.env.SALT_ROUNDS;
    const hash: string = bcrypt.hashSync("password123" + process.env.PEPPER, parseInt(salt_rounds));
    const result = await conn.query(sql, ["shehabgad","shehab","gad", hash]);
    user = result.rows[0];
    conn.release();
  })
  it("should have an index method", () => {
    expect(store.index).toBeDefined()
  })
  it("should have a getUser method", () => {
    expect(store.getUser).toBeDefined()
  })
  it("should have an create method", () => {
    expect(store.create).toBeDefined()
  })
  it("should have an updateOne method", () => {
    expect(store.updateOne).toBeDefined()
  })
  it("should have a login method", () => {
    expect(store.login).toBeDefined()
  })
  it("index method should return a list of all users", async () => {
    const result = await store.index();
    expect(result).toEqual([
      user
    ])
  })
  it("get method should return a user with the provided username", async () => {
    const result = await store.getUser("shehabgad");
    expect(result).toEqual(user)
  })
  it("create method should create a new user and return the data of the created user", async () => {
    const result = await store.create("tarekgad","tarek","gad","password321");
    expect(result).toBeDefined();
  })
  it("update method should update user with a certain username and return the updated data of the user", async () => {
    const result = await store.updateOne("mohamed","ahmed","56533711","shehabgad");
    expect(result).toBeDefined()
  })
  it("login method should return a user provided the username and password", async () => {
    const result = await store.login("shehabgad","56533711");
    expect(result).not.toBeNull();
  })
})