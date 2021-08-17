const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const { testBlogs } = require('./testData');

const api = supertest(app);


describe('blog api', () => {

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

  test('blog has id field', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('a valid blog can be added', async () => {
    const newBlog = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi', likes: 2 };
    const response = await api.post('/api/blogs').send(newBlog).expect(201);

    const response2 = await api.get('/api/blogs');
    expect(response2.body).toHaveLength(testBlogs.length + 1);
    expect(response.body.likes).toBe(2);

    const titles = response2.body.map(b => b.title);
    expect(titles).toContain(response.body.title);
  });

  test('blog without likes saves 0 like', async () => {
    const newBlog = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi' };
    const response = await api.post('/api/blogs').send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test('blog without title is responded HTTP 400', async () => {
    const newBlog = { author: 'Li Hopper', url: 'http://hs.fi' };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('blog without url is responded HTTP 400', async () => {
    const newBlog = { author: 'Li Hopper', title: 'What ever' };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });


  afterAll(() => {
    mongoose.connection.close();
  });

});