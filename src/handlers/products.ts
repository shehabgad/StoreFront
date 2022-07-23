import express, { Request, Response } from 'express';
import { Products } from '../models/products';
import { authorization } from '../middlewares/authorize';

const store = new Products();
const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const deleteProduct = async (req: Request, res: Response) => {
  const product = await store.delete(req.body.id);
  res.json(product);
};
const getProduct = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
};
const updateProduct = async (req: Request, res: Response) => {
  const result = await store.update(req.body.product);
  res.json(result);
};
const createProduct = async (req: Request, res: Response) => {
  const result = await store.create(req.body.name, req.body.price);
  res.json(result);
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', getProduct);
  app.post('/products', authorization, createProduct);
  app.put('/products', authorization, updateProduct);
  app.delete('/products', authorization, deleteProduct);
};
export default products_routes;
