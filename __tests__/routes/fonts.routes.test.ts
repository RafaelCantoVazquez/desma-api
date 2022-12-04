import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import { AuthMock } from '../../mocks/mocks';

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Testing the fonts routes module', () => {
  test('Calling create fonts route with correct body should return created message and fonts', async () => {
    const fontsData = {
      headingFontName: 'Inter',
      parragraphFontName: 'Inter',
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const res = await request(app)
      .post(`/api/fonts/`)
      .send(fontsData)
      .set(AuthMock);
    expect(res.body.message).toBe('Fonts created successfully');
    expect(res.body.data).toHaveProperty(
      'headingFontName',
      fontsData.headingFontName
    );
    expect(res.body.data).toHaveProperty(
      'parragraphFontName',
      fontsData.parragraphFontName
    );
    expect(res.body.data).toHaveProperty('baseSize', fontsData.baseSize);
    expect(res.body.data).toHaveProperty('scaleFactor', fontsData.scaleFactor);
    const { _id: id } = res.body.data;
    await request(app).delete(`/api/fonts/${id}`).send().set(AuthMock);
  });

  test('Calling delete fonts route with correct params should return deleted fonts count', async () => {
    const fontsData = {
      headingFontName: 'Inter',
      parragraphFontName: 'Inter',
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/fonts/`)
      .send(fontsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .delete(`/api/fonts/${id}`)
      .send()
      .set(AuthMock);
    expect(res.body.message).toBe('Fonts deleted successfully');
    expect(res.body.data).toHaveProperty('deletedCount', 1);
  });

  test('Calling get fonts route with correct params should return fonts', async () => {
    const fontsData = {
      headingFontName: 'Inter',
      parragraphFontName: 'Inter',
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/fonts/`)
      .send(fontsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app).get(`/api/fonts/${id}`).send().set(AuthMock);
    expect(res.body.data).toHaveProperty(
      'headingFontName',
      fontsData.headingFontName
    );
    expect(res.body.data).toHaveProperty(
      'parragraphFontName',
      fontsData.parragraphFontName
    );
    expect(res.body.data).toHaveProperty('baseSize', fontsData.baseSize);
    expect(res.body.data).toHaveProperty('scaleFactor', fontsData.scaleFactor);
    await request(app).delete(`/api/fonts/${id}`).send().set(AuthMock);
  });

  test('Calling update fonts route with correct params and body should return updated message and new fonts', async () => {
    const fontsData = {
      headingFontName: 'Inter',
      parragraphFontName: 'Inter',
      baseSize: 80,
      scaleFactor: 'Major Third (1.250)',
    };
    const updatedFontsData = {
      headingFontName: 'Arial',
      parragraphFontName: 'Arial',
      baseSize: 12,
      scaleFactor: 'Major Third (1.250)',
    };
    const response = await request(app)
      .post(`/api/fonts/`)
      .send(fontsData)
      .set(AuthMock);
    const { _id: id } = response.body.data;
    const res = await request(app)
      .put(`/api/fonts/${id}`)
      .send(updatedFontsData)
      .set(AuthMock);
    expect(res.body.message).toBe('Fonts updated successfully');
    expect(res.body.data).toHaveProperty(
      'headingFontName',
      updatedFontsData.headingFontName
    );
    expect(res.body.data).toHaveProperty(
      'parragraphFontName',
      updatedFontsData.parragraphFontName
    );
    expect(res.body.data).toHaveProperty('baseSize', updatedFontsData.baseSize);
    expect(res.body.data).toHaveProperty(
      'scaleFactor',
      updatedFontsData.scaleFactor
    );
    await request(app).delete(`/api/fonts/${id}`).send().set(AuthMock);
  });
});
