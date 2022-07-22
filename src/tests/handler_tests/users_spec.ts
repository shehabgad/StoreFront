import supertest from 'supertest';
import {app} from '../../index'
const request = supertest(app);
describe('Testing users endpoint responses', () => {
  it('get request to /users  without token should return status code 401', async () => {
    const response = await request.get(
      '/users'
    );
    expect(response.status).toBe(401);
  });
});