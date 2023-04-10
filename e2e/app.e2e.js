const request = require('supertest');
// const express = require('express');
const createApp = require('../src/app');

describe('GET /hello', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    // app = express();
    app = createApp();
    server = app.listen(3000);
    app.get('/hello', (req, res) => {
      res.status(200).json({ name: 'Hello world!' });
    });

    app.listen(3000);
    api = request(app);
  });

  it('should return Hello world!', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Hello world!');
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    );
  });

  afterEach(() => {
    server.close();
  });
});
