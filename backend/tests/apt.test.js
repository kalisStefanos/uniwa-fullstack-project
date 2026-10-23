import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('POST /api/buildings/:bid/apartments', () => {
  let agent;
  let building;

  beforeEach(async () => {
    agent = request.agent(app);
    await agent.post('/api/auth/register').send({ name: 'steve', pass: '1234' });
    await agent.post('/api/auth/login').send({ name: 'steve', pass: '1234' });
    building = await agent.post('/api/buildings').send({ strAddress: 'Main St', strNum: 12, floors: 5 });
    console.log('Created building:', building);
  });

  it('creates an apartment', async () => {
    const res = await agent
      .post(`/api/buildings/${building.body.id}/apartments`)
      .send({ doorNum: 2, floor: 2, buildingId: building.body.id, area: 50 });

    expect(res.status).toBe(201);
  });
});