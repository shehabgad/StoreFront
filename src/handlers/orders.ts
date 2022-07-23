import express, { Request, Response } from 'express';
import { Orders } from '../models/orders';
import { authorization } from '../middlewares/authorize';

const store = new Orders();
const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};
const indexByUserID = async (req: Request, res: Response) => {
  const orders = await store.indexByUserID(parseInt(req.params.user_id));
  res.json(orders);
};
const deleteOrder = async (req: Request, res: Response) => {
  const order = await store.delete(req.body.id);
  res.json(order);
};
const getOrder = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id));
  res.json(order);
};
const updateOrder = async (req: Request, res: Response) => {
  const result = await store.update(req.body.id, req.body.status);
  res.json(result);
};
const createOrder = async (req: Request, res: Response) => {
  const result = await store.create(
    req.body.user_id,
    req.body.status,
    req.body.products
  );
  res.json(result);
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', authorization, index);
  app.get('/orders/:id', authorization, getOrder);
  app.get('/orders/user/:user_id', authorization, indexByUserID);
  app.post('/orders', authorization, createOrder);
  app.put('/orders', authorization, updateOrder);
  app.delete('/orders', authorization, deleteOrder);
};
export default orders_routes;
