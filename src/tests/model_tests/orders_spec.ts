import { Orders, ProductDetail } from '../../models/orders';
import { OrderProducts } from '../../models/orderProducts';
import { Users } from '../../models/users';
import { Products } from '../../models/products';
import client from '../../database';
const ordersStore = new Orders();
const productStore = new Products();
const usersStore = new Users();
const orderProductsStore = new OrderProducts();

describe('Orders model ', () => {
  beforeAll(async () => {
    try {
      usersStore.create('shehabgad', 'shehab', 'gad', 'password123');
      productStore.create('product1', 50);
      productStore.create('product2', 60);
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
    expect(ordersStore.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(ordersStore.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(ordersStore.create).toBeDefined();
  });
  it('should have an update method', () => {
    expect(ordersStore.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(ordersStore.delete).toBeDefined();
  });
  it('should have a indexByUserID method', () => {
    expect(ordersStore.indexByUserID).toBeDefined();
  });
  it('index method should return a list of all orders', async () => {
    const result = await ordersStore.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: 1,
        orderProducts: [
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
        ],
      },
    ]);
  });
  it('show method should return order details with the provided order id', async () => {
    const result = await ordersStore.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: 1,
      orderProducts: [
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
      ],
    });
  });
  it('create method should create an order and return its details', async () => {
    const products: ProductDetail[] = [{ id: 1, quantity: 5 }];
    const result = await ordersStore.create(1, 'active', products);
    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: 1,
      orderProducts: [
        {
          order_id: 2,
          product_id: 1,
          quantity: 5,
        },
      ],
    });
  });
  it('update method should should update order status', async () => {
    const result = await ordersStore.update(1, 'complete');
    expect(result.status).toEqual('complete');
  });
  it('delete method should should delete order', async () => {
    const result = await ordersStore.delete(2);
    expect(result.id).toEqual(2);
  });
  it('indexByUserID method should return a list of all orders made by this user', async () => {
    const result = await ordersStore.indexByUserID(1);
    expect(result).toEqual([
      {
        id: 1,
        status: 'complete',
        user_id: 1,
        orderProducts: [
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
        ],
      },
    ]);
  });
});
