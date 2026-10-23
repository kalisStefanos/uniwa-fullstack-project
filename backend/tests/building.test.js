import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('POST /api/buildings', () => {
  let agent;

  beforeEach(async () => {
    agent = request.agent(app);
    await agent.post('/api/auth/register').send({ name: 'steve', pass: '1234' });
    await agent.post('/api/auth/login').send({ name: 'steve', pass: '1234' });
  });

  it('creates a building', async () => {
    const res = await agent
      .post('/api/buildings')
      .send({ strAddress: 'Main St', strNum: 12, floors: 5 });

    expect(res.status).toBe(201);
  });
});