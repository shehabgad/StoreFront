import { ProductDetail } from '../../models/orders';
import { OrderProducts } from '../../models/orderProducts';
import { Users } from '../../models/users';
import { Products } from '../../models/products';
import client from '../../database';
const productStore = new Products();
const usersStore = new Users();
const orderProductsStore = new OrderProducts();

describe('OrderProducts model ', () => {
  beforeAll(async () => {
    try {
      usersStore.create('shehabgad', 'shehab', 'gad', 'password123');
      productStore.create('product1', 50);
      productStore.create('product2', 60);
      productStore.create('product3', 60);
      const products: ProductDetail[] = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ];
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';

      const result = await conn.query(sql, ['active', 1]);
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
    } catch (eror) {
      throw new Error(`error : ${eror}`);
    }
  });
  afterAll(async () => {
    try {
      const conn = await client.connect();
      let sql =
        'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql =
        'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(err + '');
    }
  });
  it('should have an index method', () => {
    expect(orderProductsStore.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(orderProductsStore.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(orderProductsStore.create).toBeDefined();
  });
  it('should have an update method', () => {
    expect(orderProductsStore.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(orderProductsStore.delete).toBeDefined();
  });
  it('index method should return a list of all orderProducts', async () => {
    const result = await orderProductsStore.index();
    expect(result).toEqual([
      {
        order_id: 1,
        product_id: 1,
        quantity: 2,
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 1,
      },
    ]);
  });
  it('show method should return orderProducts with the provided order id', async () => {
    const result = await orderProductsStore.show(1);
    expect(result).toEqual([
      {
        order_id: 1,
        product_id: 1,
        quantity: 2,
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 1,
      },
    ]);
  });
  it('create method should create an orderProduct and return its details', async () => {
    const result = await orderProductsStore.create(1, 3, 40);
    expect(result.quantity).toEqual(40);
  });
  it('update method should should update orderProduct', async () => {
    const result = await orderProductsStore.update(1, 1, 1);
    expect(result.quantity).toEqual(1);
  });
  it('delete method should delete orderProduct', async () => {
    const result = await orderProductsStore.delete(1, 1);
    expect(result.order_id).toEqual(1);
  });
});
