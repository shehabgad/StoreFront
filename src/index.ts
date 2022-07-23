import express from 'express';
import users_routes from './handlers/users';
import products_routes from './handlers/products';
import orders_routes from './handlers/orders';
import orderProducts_routes from './handlers/orderProducts';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
export const app: express.Application = express();

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
app.listen(parseInt(process.env.PORT + ""), () => {
});
