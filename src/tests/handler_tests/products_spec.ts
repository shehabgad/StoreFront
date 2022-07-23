import supertest from 'supertest';
import { app } from '../../index';
const request = supertest(app);
describe('Testing products endpoint responses', () => {
  it('get request to /products should return status code 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
});
