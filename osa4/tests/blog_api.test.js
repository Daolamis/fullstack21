const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const testHelper = require('./test_helper');
const { testBlogs, testUser } = require('./testData');

const api = supertest(app);


describe('blog api', () => {

  beforeEach(async () => {
    await User.deleteMany({});
    //note testUser doesn't have passwordHash
    //but it doesn't affect tests.. for now
    const user = new User(testUser);
    await user.save();
    const blogsWithUser = testBlogs.map(b => ({ ...b, user: user._id }));
    await Blog.deleteMany({});
    await Blog.insertMany(blogsWithUser);
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
      const token = testHelper.createToken(testUser);
      const newData = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi', likes: 2 };
      const { body: newBlog } = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newData)
        .expect(201);
      expect(newBlog).toMatchObject(newData);
      expect(newBlog.user).toBeDefined();

      const { body: blogsAfter } = await api.get('/api/blogs');
      expect(blogsAfter).toHaveLength(testBlogs.length + 1);
    });

    test('call without token is responded with HTTP 401', async () => {
      const newData = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi', likes: 2 };
      await api.post('/api/blogs').send(newData).expect(401);
    });

    test('blog without likes saved with 0 like', async () => {
      const token = testHelper.createToken(testUser);
      const newBlog = { author: 'Li Hopper', title: 'What ever', url: 'http://hs.fi' };
      const response = await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog);

      expect(response.body.likes).toBe(0);
    });

    test('blog without title is responded HTTP 400', async () => {
      const token = testHelper.createToken(testUser);
      const newBlog = { author: 'Li Hopper', url: 'http://hs.fi' };
      await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog).expect(400);
    });

    test('blog without url is responded HTTP 400', async () => {
      const token = testHelper.createToken(testUser);
      const newBlog = { author: 'Li Hopper', title: 'What ever' };
      await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog).expect(400);
    });
  });

  describe('deleting blog', () => {

    test('blog is removed by id', async () => {
      const token = testHelper.createToken(testUser);
      const blogsBefore = await testHelper.blogsInDB();
      const toBeRemoved = blogsBefore[0];

      await api.delete(`/api/blogs/${toBeRemoved.id}`)
        .set('Authorization', `bearer ${token}`).expect(204);

      const blogsAfter = await testHelper.blogsInDB();
      const ids = blogsAfter.map(b => b.id);
      expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
      expect(ids).not.toContain(toBeRemoved.id);
    });

    test('unexisting blog is responded HTTP 404', async () => {
      const token = testHelper.createToken(testUser);
      const id = await testHelper.nonExistingBlogId();
      await api.delete(`/api/blogs/${id}`)
        .set('Authorization', `bearer ${token}`).expect(404);
    });

  });

  describe('updating blog', () => {

    test('updated blog is returned as json with updated data', async () => {
      const blogsBefore = await testHelper.blogsInDB();
      const blogBefore = blogsBefore[0];
      const newData = { title: 'How to update Mongo', likes: 1142, author: 'Grandmaster J' };
      const { body: updatedBlog } = await api.put(`/api/blogs/${blogBefore.id}`).send(newData)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(updatedBlog).toMatchObject(newData);
    });

    test('updated blog is stored to db', async () => {
      const blogsBefore = await testHelper.blogsInDB();
      const blogBefore = blogsBefore[0];
      const newData = {
        title: 'How to update Mongo',
        likes: 1142,
        author: 'Grandmaster J',
        url: 'https://stackoverflow.com'
      };
      await api.put(`/api/blogs/${blogBefore.id}`).send(newData);

      const blogsAfter = await testHelper.blogsInDB();
      expect(blogsBefore).toHaveLength(blogsAfter.length);

      const updatedBlog = blogsAfter.find(b => b.id === blogBefore.id);
      expect(updatedBlog).toMatchObject(newData);
    });

    test('unexisting blog is responded HTTP 404', async () => {
      const id = await testHelper.nonExistingBlogId();
      const newData = {
        title: 'How to update Mongo',
        likes: 1142,
        author: 'Grandmaster J',
        url: 'https://stackoverflow.com'
      };
      await api.put(`/api/blogs/${id}`).send(newData).expect(404);
    });
  });


  afterAll(() => {
    mongoose.connection.close();
  });

});