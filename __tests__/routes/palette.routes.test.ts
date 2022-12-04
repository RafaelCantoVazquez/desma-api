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

describe('Testing the palette routes module', () => {
  test('Calling create palette route with correct body should return created palette', async () => {
    const paletteData = {
      primaryColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      secondaryColors: [],
      textColors: [],
      backgroundColors: [],
      extraColors: [],
    };
    const res = await request(app)
      .post(`/api/palette/`)
      .send(paletteData)
      .set(AuthMock);
    expect(res.body).toHaveProperty('primaryColors');
    expect(res.body).toHaveProperty('secondaryColors');
    expect(res.body).toHaveProperty('textColors');
    expect(res.body).toHaveProperty('backgroundColors');
    expect(res.body).toHaveProperty('extraColors');
    const { _id: id } = res.body;
    await request(app).delete(`/api/palette/${id}`).send().set(AuthMock);
  });

  test('Calling delete palette route with correct params should return successfully delete message', async () => {
    const paletteData = {
      primaryColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      secondaryColors: [],
      textColors: [],
      backgroundColors: [],
      extraColors: [],
    };
    const response = await request(app)
      .post(`/api/palette/`)
      .send(paletteData)
      .set(AuthMock);
    const { _id: id } = response.body;
    const res = await request(app)
      .delete(`/api/palette/${id}`)
      .send()
      .set(AuthMock);
    expect(res.body.message).toBe(
      `Palette with id : ${id} successfully removed`
    );
  });

  test('Calling get palette route with correct params should return palette', async () => {
    const paletteData = {
      primaryColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      secondaryColors: [],
      textColors: [],
      backgroundColors: [],
      extraColors: [],
    };
    const response = await request(app)
      .post(`/api/palette/`)
      .send(paletteData)
      .set(AuthMock);
    const { _id: id } = response.body;
    const res = await request(app)
      .get(`/api/palette/${id}`)
      .send()
      .set(AuthMock);
    expect(res.body).toHaveProperty('primaryColors');
    expect(res.body).toHaveProperty('secondaryColors');
    expect(res.body).toHaveProperty('textColors');
    expect(res.body).toHaveProperty('backgroundColors');
    expect(res.body).toHaveProperty('extraColors');
    await request(app).delete(`/api/palette/${id}`).send().set(AuthMock);
  });

  test('Calling update palette route with correct params and body should return updated message and new palette', async () => {
    const paletteData = {
      primaryColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      secondaryColors: [],
      textColors: [],
      backgroundColors: [],
      extraColors: [],
    };
    const updatedPaletteData = {
      primaryColors: [],
      secondaryColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      textColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      backgroundColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
      extraColors: [{ hexCode: '#FFFFFF' }, { hexCode: '#000000' }],
    };
    const response = await request(app)
      .post(`/api/palette/`)
      .send(paletteData)
      .set(AuthMock);
    const { _id: id } = response.body;
    const res = await request(app)
      .put(`/api/palette/${id}`)
      .send(updatedPaletteData)
      .set(AuthMock);
    expect(res.body).toHaveProperty('acknowledged');
    expect(res.body).toHaveProperty('modifiedCount');
    expect(res.body).toHaveProperty('upsertedId');
    expect(res.body).toHaveProperty('upsertedCount');
    expect(res.body).toHaveProperty('matchedCount');
    await request(app).delete(`/api/palette/${id}`).send().set(AuthMock);
  });
});
