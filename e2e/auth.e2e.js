const request = require('supertest');
const createApp = require('../src/app');
const sequelize = require('../src/db/sequelize');

describe('Tests for /auth path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3000);
    api = request(app);
  });

  describe('GET /users', () => {});

  describe('POST /login', () => {
    test('should return a 401 Unauthorized with email invalid', async () => {
      const inputData = {
        email: 'emailfake@gmail.com',
        password: '123456789',
      };
      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('message');
    });
    test('should return a 401 Unauthorized with password invalid', async () => {
      const inputData = {
        email: 'akanzaakamaru@gmail.com',
        password: 'fdgdfgdfgdfg',
      };
      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('message');
    });
    test('should return a 200 OK with email and password valid', async () => {
      const user = await sequelize.models.User.findOne({
        where: { email: 'akanzaakamaru@gmail.com' },
      });
      const inputData = {
        email: 'akanzaakamaru@gmail.com',
        password: '123456789',
      };
      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('access_token');
      expect(body).toHaveProperty('user');
      expect(body.user).toHaveProperty('id');
      expect(body.user.id).toBe(user.id);
      expect(body.user.password).toBeUndefined();
    });
  });

  afterAll(() => {
    server.close();
  });
});
