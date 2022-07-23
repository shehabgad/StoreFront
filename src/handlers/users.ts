import express, { Request, Response } from 'express';
import { Users } from '../models/users';
import { authorization } from '../middlewares/authorize';
import jwt from 'jsonwebtoken';

const store = new Users();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET + '';
const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};
const login = async (req: Request, res: Response) => {
  const user = await store.login(req.body.username, req.body.password);
  if (user !== null) {
    const token = jwt.sign({ User: user }, TOKEN_SECRET);
    res.json(token);
  } else {
    res.json('username or password is incorrect');
  }
};
const signUp = async (req: Request, res: Response) => {
  const user = await store.create(
    req.body.username,
    req.body.firstname,
    req.body.lastname,
    req.body.password
  );
  const token = jwt.sign({ User: user }, TOKEN_SECRET);
  res.json(token);
};
const getUser = async (req: Request, res: Response) => {
  const user = await store.getUser(req.params.username);
  if (user === undefined) {
    res.json('no such user exists');
    return;
  }
  res.json(user);
};
const updateUser = async (req: Request, res: Response) => {
  const result = await store.updateOne(
    req.body.firstname,
    req.body.lastname,
    req.body.password,
    req.body.username
  );
  res.json(result);
};

const user_routes = (app: express.Application) => {
  app.get('/users', authorization, index);
  app.get('/users/:username', authorization, getUser);
  app.post('/users', signUp);
  app.post('/users/login', login);
  app.put('/users', authorization, updateUser);
};
export default user_routes;
