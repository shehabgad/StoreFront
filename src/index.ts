import express from 'express';
import users_routes from './handlers/users';
import products_routes from './handlers/products';
import orders_routes from './handlers/orders';
import orderProducts_routes from './handlers/orderProducts';
import cors from 'cors';
// const cors = require('cors')
export const app: express.Application = express();
const address = '0.0.0.0:3000';
const corsOptions = {
  origin: 'https://somedomain.com',
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

users_routes(app);
products_routes(app);
orders_routes(app);
orderProducts_routes(app);
app.listen(3000, () => {
  console.log(`starting app on : ${address}`);
});
