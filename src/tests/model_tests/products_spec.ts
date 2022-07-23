import { Products, Product } from '../../models/products';
import client from '../../database';
const store = new Products();
const product: Product = {
  id: 1,
  name: 'a nice product',
  price: 50,
};
describe('Products model ', () => {
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
    await conn.query(sql, ['a nice product', 50]);
    conn.release();
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
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('index method should return a list of all products', async () => {
    const result = await store.index();
    expect(result).toEqual([product]);
  });
  it('get method should return a product with the provided id', async () => {
    const result = await store.show(1);
    expect(result).toEqual(product);
  });
  it('create method should create a new product and return the data of the created product', async () => {
    const result = await store.create('a nice product 2', 45);
    expect(result).toBeDefined();
  });
  it('update method should update product with a certain id and return the updated data of the user', async () => {
    const result = await store.update({
      id: 2,
      name: 'not nice product',
      price: 556,
    });
    expect(result).toBeDefined();
  });
  it('delete method should delete a product provided the id and return the deleted data', async () => {
    const result = await store.delete(1);
    expect(result).toBeDefined();
  });
});
