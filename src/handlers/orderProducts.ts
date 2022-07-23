import express, { Request, Response } from 'express';
import { OrderProducts } from '../models/orderProducts';
import { authorization } from '../middlewares/authorize';
const store = new OrderProducts();
const index = async (req: Request, res: Response) => {
  const orderProducts = await store.index();
  res.json(orderProducts);
};
const deleteOrderProduct = async (req: Request, res: Response) => {
  const orderProduct = await store.delete(
    req.body.order_id,
    req.body.product_id
  );
  res.json(orderProduct);
};
const getOrderProduct = async (req: Request, res: Response) => {
  const orderProduct = await store.show(parseInt(req.params.id));
  res.json(orderProduct);
};
const updateOrderProduct = async (req: Request, res: Response) => {
  const result = await store.update(
    req.body.order_id,
    req.body.product_id,
    req.body.quantity
  );
  res.json(result);
};
const createOrderProduct = async (req: Request, res: Response) => {
  const result = await store.create(
    req.body.order_id,
    req.body.product_id,
    req.body.quantity
  );
  res.json(result);
};

const orderProducts_routes = (app: express.Application) => {
  app.get('/orderProducts', authorization, index);
  app.get('/orderProducts/:id', authorization, getOrderProduct);
  app.post('/orderProducts', authorization, createOrderProduct);
  app.put('/orderProducts', authorization, updateOrderProduct);
  app.delete('/orderProducts', authorization, deleteOrderProduct);
};
export default orderProducts_routes;
