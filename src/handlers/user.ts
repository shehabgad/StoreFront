import express, { Request, Response } from 'express';
import { User, Users } from '../models/user';
const jwt = require('jsonwebtoken');

const store = new Users();
let number
const index = async (_req: Request, res: Response) => {
  const plants = await store.index();
  res.json(plants);
};
const signIn = async (req: Request, res: Response) => {
  const user = await store.signIn(req.body.name, req.body.password);
  if (user !== null) {
    const token = jwt.sign({ User: user }, process.env.TOKEN_SECRET);
    res.json(token);
  } else {
    res.json(user);
  }
};
const signUp = async (req: Request, res: Response) => {
  const user = await store.signUp(req.body.name, req.body.password);
  const token = jwt.sign({ User: user }, process.env.TOKEN_SECRET);
  res.json(token);
};
const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.post('/users/signup', signUp);
  app.post('/users/signin', signIn);
};
export default user_routes;
