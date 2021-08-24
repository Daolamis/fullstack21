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
      cy.get('[data-cy=username]').type('root');
      cy.get('[data-cy=password]').type('password');
      cy.get('[data-cy=submit]').click();

      cy.contains('J. McMAchine logged in');
      cy.contains('logout');
      cy.contains('create new blog');
    });

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username]').type('root');
      cy.get('[data-cy=password]').type('blö');
      cy.get('[data-cy=submit]').click();

      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(139, 0, 0)');
      cy.get('.error').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });
  });
});