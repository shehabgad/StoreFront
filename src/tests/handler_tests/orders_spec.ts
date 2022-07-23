import supertest from 'supertest';
import { app } from '../../index';
const request = supertest(app);
describe('Testing orders endpoint responses', () => {
  it('get request to /orders should return status code 401', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });
});
