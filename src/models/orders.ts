import { resourceLimits } from 'worker_threads';
import client from '../database';
import {OrderProduct, OrderProducts} from './orderProducts'

export type Order = {
  id: number;
  status: string;
  user_id: number;
  orderProducts: OrderProduct[];
};
export type ProductDetail = {
  id:number;
  quantity:number;
}
const orderProductsStore = new OrderProducts()
export class Orders {
  
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await conn.query(sql);
      conn.release();
      result.rows.forEach(async(order) => {
        order.orderProducts = [];
        order.orderProducts.push(await orderProductsStore.show(order.id));
      })
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async show(id : number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      result.rows[0].orderProducts = []
      result.rows[0].orderProducts.push(await orderProductsStore.show(id));
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get order ${err}`);
    }
  }
  async create(user_id:string, status: string, products:ProductDetail[] ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';
      
      const result = await conn.query(sql, [status,user_id]);
      conn.release();
      result.rows[0].orderProducts = [];
      products.forEach(async(product) => {
        result.rows[0].orderProducts.push(await orderProductsStore.create(result.rows[0].id,product.id,product.quantity));
      })
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create order ${err}`);
    }
  }
  async update(id: number, status: string): Promise<Order>
  {
    try {
    const conn = await client.connect();
    const sql = "UPDATE order SET status = ($1) WHERE id = ($2) RETURNING *"
    const result = await conn.query(sql,[status,id]);
    conn.release();
    return result.rows[0];
    } catch (err) {
      throw new Error("cannot update order")
    }
  }
  async delete(id: number): Promise<Order>
  {
    try
    {
      const conn = await client.connect();
      const sql = `DELETE FROM orders WHERE id = ${id} RETURNING *`
      const result = await conn.query(sql)
      return result.rows[0];
    } catch(err) {
      throw new Error("cannot delete order")
    }
  }
}
