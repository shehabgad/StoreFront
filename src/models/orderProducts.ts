import client from '../database';

export type OrderProduct = {
  order_id: number;
  product_id: number;
  quantity: number;
};
export class OrderProducts {
  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orderProducts;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get order_products ${err}`);
    }
  }
  async show(order_id: number): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orderProducts WHERE order_id = '${order_id}'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get order_product ${err}`);
    }
  }
  async create(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orderProducts (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create order_product ${err}`);
    }
  }
  async update(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE orderProducts SET quantity =($1) WHERE order_id = ($2) AND product_id = ($3) RETURNING *';
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('cannot update order_product');
    }
  }
  async delete(order_id: number, product_id: number): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orderProducts WHERE order_id = ${order_id} AND product_id = ${product_id} RETURNING *`;
      const result = await conn.query(sql);
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot delete order_product ${err}`);
    }
  }
}
