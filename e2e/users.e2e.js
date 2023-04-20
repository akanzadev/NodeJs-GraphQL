const request = require('supertest');
const createApp = require('../src/app');
const sequelize = require('../src/db/sequelize');
const { upSeed } = require('./utils/seed');
const { downSeed } = require('./utils/seed');

describe('Tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  // Se levanta una por archivo y no por cada test
  beforeAll(async () => {
    // app = express();
    app = createApp();
    server = app.listen(3000);
    api = request(app);
    await upSeed();
  });
  /* beforeEach(() => {
    // app = express();
    app = createApp();
    server = app.listen(3000);
    api = request(app);
  }); */

  describe('GET /users', () => {});

  describe('GET /users/:id', () => {
    test('should return a user', async () => {
      const user = await sequelize.models.User.findByPk(1);
      const inputId = 1;
      const { statusCode, body } = await api.get(`/api/v1/users/${inputId}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('id');
      expect(body.id).toBe(user.id);
      expect(body).toHaveProperty('email');
      expect(body.email).toBe(user.email);
    });
  });

  describe('POST /users', () => {
    test('should return a 400 Bad Request with password invalid', async () => {
      // Arrange
      const inputData = { email: 'test@gmail.com', password: '-----' };
      // Act
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body.message).toMatch(/password/);
    });

    test('should return a 400 Bad Request with email invalid', async () => {
      // Arrange
      const inputData = { email: '----', password: '123456' };
      // Act
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body.message).toMatch(/email/);
    });

    test('should return a new user', async () => {
      // Arrange
      const inputData = { email: 'pepito@gmail.com', password: '123456789' };
      // Act
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      // Assert
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('email');

      const user = await sequelize.models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.email).toBe(inputData.email);
      expect(user.role).toBe('admin');
    });
  });

  /* afterEach(() => {
    server.close();
  }); */
  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
