import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Testing the user routes module', () => {
  test('Calling register route with correct data should return a token', async () => {
    const userData = {
      name: 'User',
      email: `test.${Math.random().toString(36).slice(2)}@test.com`,
      password: 'password',
    };
    const res = await request(app).post('/api/users').send(userData);
    expect(res.body.token).toBeDefined();
  });

  test('Calling register route with incorrect email syntax should return an error', async () => {
    const userData = {
      name: 'User',
      email: 'user',
      password: 'password',
    };
    const res = await request(app).post('/api/users').send(userData);
    expect(res.body.message).toBe(
      'User validation failed: email: Invalid email syntax'
    );
    expect(res.status).toBe(400);
  });

  test('Calling register route with email registered previously should return an error', async () => {
    const userEmail = `test.${Math.random().toString(36).slice(2)}@test.com`;
    const userRegisterData = {
      name: 'User',
      email: userEmail,
      password: 'password',
    };
    await request(app).post('/api/users').send(userRegisterData);

    const userData = {
      name: 'User',
      email: userEmail,
      password: 'password',
    };
    await request(app).post('/api/users').send(userData);
    const res = await request(app).post('/api/users').send(userData);
    expect(res.body.message).toBe(
      'The email is already associated with a Desma account'
    );
    expect(res.status).toBe(400);
  });

  test('Calling login route with correct data should return a token', async () => {
    const userEmail = `test.${Math.random().toString(36).slice(2)}@test.com`;
    const userRegisterData = {
      name: 'User',
      email: userEmail,
      password: 'password',
    };
    await request(app).post('/api/users').send(userRegisterData);

    const userData = {
      email: userEmail,
      password: 'password',
    };
    const res = await request(app).post('/api/users/login').send(userData);
    expect(res.body.token).toBeDefined();
  });

  test('Calling login route with incorrect data should return an error', async () => {
    const userEmail = `test.${Math.random().toString(36).slice(2)}@test.com`;
    const userRegisterData = {
      name: 'User',
      email: userEmail,
      password: 'password',
    };
    await request(app).post('/api/users').send(userRegisterData);

    const wrongUserData = {
      email: 'user@test',
      password: 'password',
    };
    const res = await request(app).post('/api/users/login').send(wrongUserData);
    expect(res.body.message).toBe('Invalid email or password');
  });
});
