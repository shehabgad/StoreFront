import express from 'express';
const jwt = require('jsonwebtoken');


const authorization = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const header = ''+ req.headers.authorization
    const token =header.split(' ')[1];
    jwt.verify(token,process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Acess denied, invalid token")
    return
  }
  next();
};
export default authorization;