import client from '../database';


export type Product = {
  id: number;
  name: string;
  price: number;
};
export class Products {
  
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get products ${err}`);
    }
  }
  async show(id : number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get product ${err}`);
    }
  }
  async create(name: string,price: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
      const result = await conn.query(sql, [name,price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create product ${err}`);
    }
  }
  async update(product : Product): Promise<Product>
  {
    try {
    const conn = await client.connect();
    const sql = "UPDATE products SET name =($1), price =($2) WHERE id = ($3) RETURNING *"
    const result = await conn.query(sql,[product.name,product.price,product.id]);
    conn.release();
    return result.rows[0];
    } catch (err) {
      throw new Error("cannot update product")
    }
  }
  async delete(id: number): Promise<Product>
  {
    try
    {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE id = ${id} RETURNING *`
      const result = await conn.query(sql)
      return result.rows[0];
    } catch(err) {
      throw new Error("cannot delete product")
    }
  }
}
