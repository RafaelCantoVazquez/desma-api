import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import AuthMock from '../../mocks/auth.json';

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Testing the spacings routes module', () => {
  test('Calling create spacings route with correct body should return created message and spacings', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const res = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    expect(res.body.message).toBe('Spacings created successfully');
    expect(res.body.data).toHaveProperty('baseSize', spacingsData.baseSize);
    expect(res.body.data).toHaveProperty(
      'scaleFactor',
      spacingsData.scaleFactor
    );
    const { _id: id } = res.body.data;
    await request(app).delete(`/api/spacings/${id}`).send().set(AuthMock);
  });

  test('Calling create spacings route with incorrect body should return an error message', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: '',
    };
    const res = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    expect(res.body.message).toBe(
      'Spacings validation failed: scaleFactor: Path `scaleFactor` is required.'
    );
    expect(res.statusCode).toBe(400);
  });

  test('Calling delete spacings route with correct params should return deleted spacings count', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .delete(`/api/spacings/${id}`)
      .send()
      .set(AuthMock);
    expect(res.body.message).toBe('Spacings deleted successfully');
    expect(res.body.data).toHaveProperty('deletedCount', 1);
  });

  test('Calling delete spacings route with incorrect id syntax should return an error message', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .delete(`/api/spacings/${0}`)
      .send()
      .set(AuthMock);
    expect(res.body.message).toBe(
      'Invalid spacings id syntax or spacings not found'
    );
    expect(res.statusCode).toBe(400);
  });

  test('Calling get spacings route with correct params should return spacings', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .get(`/api/spacings/${id}`)
      .send()
      .set(AuthMock);
    expect(res.body.data).toHaveProperty('baseSize', spacingsData.baseSize);
    expect(res.body.data).toHaveProperty(
      'scaleFactor',
      spacingsData.scaleFactor
    );
    await request(app).delete(`/api/spacings/${id}`).send().set(AuthMock);
  });

  test('Calling get spacings route with incorrect id should return an error message', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .get(`/api/spacings/${'000000000000000000000000'}`)
      .send()
      .set(AuthMock);
    expect(res.body.message).toBe('Spacings not found');
    expect(res.statusCode).toBe(404);
    await request(app).delete(`/api/spacings/${id}`).send().set(AuthMock);
  });

  test('Calling update spacings route with correct params and body should return updated message and new spacings', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const updatedSpacingsData = {
      baseSize: 12,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .put(`/api/spacings/${id}`)
      .send(updatedSpacingsData)
      .set(AuthMock);
    expect(res.body.message).toBe('Spacings updated successfully');
    expect(res.body.data).toHaveProperty(
      'baseSize',
      updatedSpacingsData.baseSize
    );
    expect(res.body.data).toHaveProperty(
      'scaleFactor',
      updatedSpacingsData.scaleFactor
    );
    await request(app).delete(`/api/spacings/${id}`).send().set(AuthMock);
  });

  test('Calling update spacings route with incorrect id should return an error message', async () => {
    const spacingsData = {
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const updatedSpacingsData = {
      baseSize: 12,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/spacings/`)
      .send(spacingsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .put(`/api/spacings/${'000000000000000000000000'}`)
      .send(updatedSpacingsData)
      .set(AuthMock);
    expect(res.body.message).toBe('Spacings not found');
    expect(res.statusCode).toBe(404);
    await request(app).delete(`/api/spacings/${id}`).send().set(AuthMock);
  });
});
