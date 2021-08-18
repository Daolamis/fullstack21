const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const testHelper = require('./test_helper');
const { testUser } = require('./testData');

const api = supertest(app);

describe('User api test', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('create a valid user', async () => {
    const usersBefore = await testHelper.usersInDB();
    const { body: newUser } = await api.post('/api/users').send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = testUser;
    expect(newUser).toMatchObject(userWithoutPassword);

    const usersAfter = await testHelper.usersInDB();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
    expect(newUser).toEqual(usersAfter.find(u => u.id === newUser.id));
  });

  test('User with already existing username is not created', async () => {
    await api.post('/api/users').send(testUser).expect(201);

    const usersBefore = await testHelper.usersInDB();
    await api.post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAfter = await testHelper.usersInDB();
    expect(usersBefore).toHaveLength(usersAfter.length);
  });

  test('User with short password is not created', async () => {
    const shortPassword = 'Hi';
    const { body: { error } } = await api.post('/api/users')
      .send({ ...testUser, password: shortPassword })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(error).toBe('Password is too short! Minimum length of password is 3 characters.');
    const usersAfter = await testHelper.usersInDB();
    expect(usersAfter).toHaveLength(0);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

});