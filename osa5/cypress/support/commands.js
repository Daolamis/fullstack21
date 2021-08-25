// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('createBlog', (blog) => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  });
  cy.visit('http://localhost:3000');
});
