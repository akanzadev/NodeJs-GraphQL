const request = require('supertest');
const createApp = require('../src/app');
const sequelize = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/seed');

describe('Tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3000);
    api = request(app);
    await upSeed();
  });

  describe('GET /my-user admin user', () => {
    beforeAll(async () => {
      const user = await sequelize.models.User.findOne({
        where: { email: 'admin@gmail.com' },
      });
      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const { body: bodyLogin } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      accessToken = bodyLogin.access_token;
    });

    test('should return 401 Unauthorized with token invalid', async () => {
      const { statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        Authorization: `Bearer 12345`,
      });
      expect(statusCode).toBe(401);
    });

    test('should return a user with token valid', async () => {
      const user = await sequelize.models.User.findOne({
        where: { email: 'admin@gmail.com' },
      });
      const { statusCode, body } = await api
        .get(`/api/v1/profile/my-user`)
        .set({
          Authorization: `Bearer ${accessToken}`,
        });
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('id');
      expect(body.id).toBe(user.id);
      expect(body).toHaveProperty('email');
      expect(body.email).toBe(user.email);
    });
  });

  describe('GET /my-orders', () => {
    test('should return 401 Unauthorized with token invalid', async () => {
      const { statusCode } = await api.get(`/api/v1/profile/my-orders`).set({
        Authorization: `Bearer 12345`,
      });
      expect(statusCode).toBe(401);
    });
    test('should return a user with token valid', async () => {
      const user = await sequelize.models.User.findOne({
        where: { email: 'admin@gmail.com' },
      });

      const { statusCode, body } = await api
        .get(`/api/v1/profile/my-user`)
        .set({
          Authorization: `Bearer ${accessToken}`,
        });
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('id');
      expect(body.id).toBe(user.id);
      expect(body).toHaveProperty('email');
      expect(body.email).toBe(user.email);
    });

    afterAll(() => {
      accessToken = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
