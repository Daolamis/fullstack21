const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const { testBlogs } = require('./testData');

const api = supertest(app);


describe('blog api', () => {

  beforeEach(async () => {
    await Blog.deleteMany({});
    //console.log('cleared DB');
    await Blog.insertMany(testBlogs);
    //console.log('inserted test data to db');
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

  describe('create a blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi', likes: 2 };
      const response = await api.post('/api/blogs').send(newBlog).expect(201);

      const response2 = await api.get('/api/blogs');
      expect(response2.body).toHaveLength(testBlogs.length + 1);
      expect(response.body.likes).toBe(2);

      const titles = response2.body.map(b => b.title);
      expect(titles).toContain(response.body.title);
    });

    test('blog without likes saved with 0 like', async () => {
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
  });

  describe('deleting blog', () => {

    test('blog is removed by id', async () => {
      const { body: blogsBefore } = await api.get('/api/blogs');
      const toBeRemoved = blogsBefore[0];

      await api.delete(`/api/blogs/${toBeRemoved.id}`).expect(204);

      const { body: blogsAfter } = await api.get('/api/blogs');
      const ids = blogsAfter.map(b => b.id);
      expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
      expect(ids).not.toContain(toBeRemoved.id);
    });
  });

  describe('updating blog', () => {

    test('updated blog is returned as json with updated data', async () => {
      const { body: blogsBefore } = await api.get('/api/blogs');
      const blogBefore = blogsBefore[0];
      const newData = { title: 'How to update Mongo', likes: 1142, author: 'Grandmaster Java' };
      const { body: updatedBlog } = await api.put(`/api/blogs/${blogBefore.id}`).send(newData)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(updatedBlog).toMatchObject(newData);
    });

    test('updated blog is stored to db', async () => {
      const { body: blogsBefore } = await api.get('/api/blogs');
      const blogBefore = blogsBefore[0];
      const newData = {
        title: 'How to update Mongo',
        likes: 1142,
        author: 'Grandmaster Java',
        url: 'https://stackoverflow.com'
      };
      await api.put(`/api/blogs/${blogBefore.id}`).send(newData);

      const { body: blogsAfter } = await api.get('/api/blogs');
      const [titles, likes, authors] = blogsAfter.reduce((col, b) => {
        col[0].push(b.title);
        col[1].push(b.likes);
        col[2].push(b.author);
        col[2].push(b.url);
        return col;
      }, [new Array(), new Array(), new Array(), new Array()]);
      expect(blogsBefore).toHaveLength(blogsAfter.length);
      expect(titles).toContain(newData.title);
      expect(likes).toContain(newData.likes);
      expect(authors).toContain(newData.author);
    });
  });


  afterAll(() => {
    mongoose.connection.close();
  });

});