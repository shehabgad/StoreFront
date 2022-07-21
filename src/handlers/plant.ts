import express, { Request, Response } from 'express'
import { Plant, Plants } from '../models/plant'
const jwt = require("jsonwebtoken")
const store = new Plants()

const index = async (_req: Request, res: Response) => {
  try {
    jwt.verify(_req.body.token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401)
    res.json(`Invalid token ${err}`)
    return
  }
  const plants = await store.index()
  res.json(plants)
}
const plant_routes = (app: express.Application) => {
  app.get('/plants', index)
}
export default plant_routes