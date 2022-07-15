import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from './database'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', async (req: Request, res: Response) => {
  const connection = await client.connect();
  const query = 'SELECT * FROM plants'; // Create a query to select all students
  const results = await connection.query(query); // Execute the query
  connection.release(); // Release the connection
  res.send(results.rows); // Send the results
})
app.listen(3000, () => {
  console.log(`starting app on : ${address}`)
})