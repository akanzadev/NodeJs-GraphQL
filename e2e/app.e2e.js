const request = require('supertest');
const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('GET /hello', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3000);
    api = request(app);
  });

  test('should return Hello world!', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Hello world!');
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    );
  });

  describe('GET /nueva-ruta', () => {
    test('should return a 401 Unauthorized', async () => {
      const response = await api.get('/nueva-ruta');
      expect(response).toBeTruthy();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    test('should return 401 Unauthorized with api key invalid', async () => {
      const { statusCode, body } = await api.get('/nueva-ruta').set({
        api: '1212',
      });
      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('message');
    });

    test('should return 200 OK with api key valid', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({
        api: config.apiKey,
      });
      expect(statusCode).toBe(200);
    });
  });

  afterAll(() => {
    server.close();
  });
});
