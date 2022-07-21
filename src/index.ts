import express, { Request, Response } from 'express';
import client from './database';
import plant_routes from './handlers/plant';
import user_routes from './handlers/user';
// import cors from 'cors'
const app: express.Application = express();
const address = '0.0.0.0:3000';
// const corsOptions = {
//   origin: "https://somedomain.com",
//   optionSuccessStatus: 2S00
// }
// app.use(cors(corsOptions))
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const connection = await client.connect();
  const query = 'SELECT * FROM plants'; // Create a query to select all students
  const results = await connection.query(query); // Execute the query
  connection.release(); // Release the connection
  res.send(results.rows); // Send the results
});
plant_routes(app);
user_routes(app);
app.listen(3000, () => {
  console.log(`starting app on : ${address}`);
});
