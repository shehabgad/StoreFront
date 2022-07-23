import client from '../database';
import { OrderProduct, OrderProducts } from './orderProducts';

export type Order = {
  id: number;
  status: string;
  user_id: number;
  orderProducts: OrderProduct[];
};
export type ProductDetail = {
  id: number;
  quantity: number;
};
const orderProductsStore = new OrderProducts();
export class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await conn.query(sql);
      conn.release();
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].orderProducts = await orderProductsStore.show(
          result.rows[i].id
        );
      }
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async indexByUserID(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].orderProducts = await orderProductsStore.show(
          result.rows[i].id
        );
      }
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      result.rows[0].orderProducts = await orderProductsStore.show(id);
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get order ${err}`);
    }
  }
  async create(
    user_id: number,
    status: string,
    products: ProductDetail[]
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';

      const result = await conn.query(sql, [status, user_id]);
      conn.release();
      result.rows[0].orderProducts = [];
      for (let i = 0; i < products.length; i++) {
        const orderProduct = await orderProductsStore.create(
          result.rows[0].id,
          products[i].id,
          products[i].quantity
        );
        result.rows[0].orderProducts.push(orderProduct);
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create order ${err}`);
    }
  }
  async update(id: number, status: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) RETURNING *';
      const result = await conn.query(sql, [status, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('cannot update order');
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
      const result = await conn.query(sql);
      return result.rows[0];
    } catch (err) {
      throw new Error('cannot delete order');
    }
  }
}
