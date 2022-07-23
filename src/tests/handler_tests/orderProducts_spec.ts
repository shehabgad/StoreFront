import supertest from 'supertest';
import { app } from '../../index';
const request = supertest(app);
describe('Testing orderProducts endpoint responses', () => {
  it('get request to /orderProducts should return status code 401', async () => {
    const response = await request.get('/orderProducts');
    expect(response.status).toBe(401);
  });
});
