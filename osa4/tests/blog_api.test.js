const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const { testBlogs } = require('./testData');

const api = supertest(app);


describe('blog api test', () => {

  beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('cleared DB');
    await Blog.insertMany(testBlogs);
    console.log('inserted test data to db');
  });

  test('blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(testBlogs.length);
  });


  afterAll(() => {
    mongoose.connection.close();
  });

});