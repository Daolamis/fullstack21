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
        cy.contains('Third blog').contains('view').click();
        cy.contains('Third blog').find('[data-testid=likes]').as('likes');
        cy.get('@likes').should('contain', '0');

        cy.contains('Third blog').contains('like').click();
        cy.get('@likes').should('contain', '1');
      });

      it('A blog can deleted', function () {
        cy.contains('Second blog').contains('view').click();
        cy.contains('Second blog').contains('Remove').click();
        cy.get('.info').should('contain', 'Blog Second blog is removed');
        cy.get('.blog').should('not.contain', 'Second blog');
      });

      it('Blogs are sorted by likes', function () {
        cy.get('[data-testid=view-button]').click({ multiple: true });

        cy.contains('First blog').contains('like').as('likeButton1');
        cy.get('@likeButton1').parent().find('[data-testid=likes]').as('likes1');

        cy.contains('Second blog').contains('like').as('likeButton2');
        cy.get('@likeButton2').parent().find('[data-testid=likes]').as('likes2');

        cy.contains('Third blog').contains('like').as('likeButton3');
        cy.get('@likeButton3').parent().find('[data-testid=likes]').as('likes3');

        // first blog get 1 like, second blog gets 2 likes and third blog gets 3 likes
        cy.get('@likeButton2').click();
        cy.get('@likes2').should('contain', '1');

        cy.get('@likeButton1').click();
        cy.get('@likes1').should('contain', '1');

        cy.get('@likeButton3').click();
        cy.get('@likes3').should('contain', '1');

        cy.get('@likeButton2').click();
        cy.get('@likes2').should('contain', '2');

        cy.get('@likeButton3').click();
        cy.get('@likes3').should('contain', '2');

        cy.get('@likeButton3').click();
        cy.get('@likes3').should('contain', '3');

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'Third blog');
          cy.wrap(blogs[1]).should('contain', 'Second blog');
          cy.wrap(blogs[2]).should('contain', 'First blog');
        });
      });
    });
  });
});