// tests/auth.test.js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../prismaClient.js';

describe('POST /api/auth/register', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'steve', pass: '1234' });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('steve');
  });

  it('stores a hashed password, not the plain one', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'steve', pass: '1234' });

    const user = await prisma.user.findUnique({ where: { name: 'steve' } });

    expect(user).not.toBeNull();
    expect(user.pass).not.toBe('1234');
  });

  it('returns 409 when the name is already taken', async () => {
    const body = { name: 'steve', pass: '1234' };
    await request(app).post('/api/auth/register').send(body);

    const res = await request(app).post('/api/auth/register').send(body);

    expect(res.status).toBe(409);
  });
});