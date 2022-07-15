import client from '../database'
export type Plant = {
  id: Number;
  name: string;
  individuals: Number;
  sightingDate: Date;
  description: string;
}
export class Plants {
  async index(): Promise<Plant[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM plants;"
      const result = await conn.query(sql);
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`cannot get plants ${err}`)
    }

  }
}