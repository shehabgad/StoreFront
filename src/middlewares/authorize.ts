import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authorization = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const header = '' + req.headers.authorization;
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET + '');
  } catch (err) {
    res.status(401);
    res.json('Acess denied, invalid token');
    return;
  }
  next();
};
