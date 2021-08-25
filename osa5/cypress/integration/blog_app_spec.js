describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'J. McMAchine',
      username: 'root',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-testid=username]').type('root');
      cy.get('[data-testid=password]').type('password');
      cy.get('[data-testid=submit]').click();

      cy.contains('J. McMAchine logged in');
      cy.contains('logout');
      cy.contains('create new blog');
    });

    it('fails with wrong credentials', function () {
      cy.get('[data-testid=username]').type('root');
      cy.get('[data-testid=password]').type('blö');
      cy.get('[data-testid=submit]').click();

      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(139, 0, 0)');
      cy.get('.error').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'root', password: 'password' })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.body));
        });
      cy.visit('http://localhost:3000');
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.contains('Create a new blog');

      cy.get('[data-testid=title]').type('Wonders of cypress');
      cy.get('[data-testid=author]').type('Jo Hopper');
      cy.get('[data-testid=url]').type('https://docs.cypress.io');
      cy.get('[data-testid=submit').click();

      cy.contains('Wonders of cypress Jo Hopper');
      cy.contains('view');
    });

    describe('Several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First blog', author: 'Tom', url: 'http://hs.fi' });
        cy.createBlog({ title: 'Second blog', author: 'Jane', url: 'http://ytk.fi' });
        cy.createBlog({ title: 'Third blog', author: 'John', url: 'http://tori.fi' });
      });

      it('A blog can be liked', function () {
        cy.contains('Third blog John').contains('view').click();
        cy.get('[data-testid=likes]').as('likes');
        cy.get('@likes').should('contain', '0');

        cy.contains('Third blog John').contains('like').click();
        cy.get('@likes').should('contain', '1');
      });
    });
  });
});