describe('Posts flow', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/posts*`, {
      statusCode: 200,
      body: [
        {
          _id: 'post-1',
          title: 'Welcome to Testing',
          content: 'End-to-end tests validate real user journeys.',
          category: 'default',
          publishedAt: new Date().toISOString()
        }
      ]
    }).as('fetchPosts');

    cy.visit('/');
  });

  it('displays posts returned from the API', () => {
    cy.wait('@fetchPosts');
    cy.contains('h1', /quality assurance dashboard/i).should('be.visible');
    cy.get('li').first().should('contain.text', 'Welcome to Testing');
  });

  it('submits the create post form', () => {
    cy.intercept('POST', `${Cypress.env('API_URL')}/posts`, (req) => {
      expect(req.body.title).to.equal('My new post');
      req.reply({
        statusCode: 201,
        body: {
          _id: 'post-2',
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          publishedAt: new Date().toISOString()
        }
      });
    }).as('createPost');

    cy.get('input[name="title"]').clear().type('My new post');
    cy.get('textarea[name="content"]').clear().type('My new content');
    cy.get('input[name="category"]').clear().type('cat-123');
    cy.contains('button', /create post/i).click();

    cy.wait('@createPost');
  });
});

