describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	}),
	it('register account', () => {
		cy.get('.nav-link').click();

		cy.get('.btn-link').click()

		cy.get('#register-name').type('Usuario');
		cy.get('#register-email').type('usuario@example.com');
		cy.get('#register-password').type('1234');

		cy.get('.btn-primary').click();
	}),
	it('login account', () => {
		cy.get('.nav-link').click();

		cy.get('#login-email').type('usuario@example.com');
		cy.get('#login-password').type('1234');

		cy.get('.btn-primary').click();
	}),
	it('list products', () => {
		cy.get('row').should('have.descendants', '.card');
	}),
	it('search products', () => {

	}),
	it('see product details', () => {
		cy.get('.card-body').click();

		cy.get('img').should('have.attr', 'src');
	}),
	it('buy product', () => {
		cy.get('.card-body').click();

		cy.get('.btn-primary').click();
	}),
	it('add product', () => {
		cy.get('.nav-link').click();

		cy.get('#login-email').type('admin@example.cl');
		cy.get('#login-password').type('1234');

		cy.get('.btn-primary').click();

		cy.get('.nav-link').click();

		cy.get('#create').click();
		cy.get('#edit-7').click();

		cy.get('#edit-name').type('Shirt Neon');
		cy.get('#edit-desc').type('Es una buena polera');
		cy.get('#edit-dis').type(0);
		cy.get('#edit-price').type(9990);
		cy.get('#edit-cat').type('Polera');

		cy.get('.btn-sm').click();
		
	}),
	it('edit product', () => {
		cy.get('.nav-link').click();

		cy.get('#login-email').type('admin@example.cl');
		cy.get('#login-password').type('1234');

		cy.get('.btn-primary').click();

		cy.get('.nav-link').click();

		cy.get('#edit-1').click();

		cy.get('#edit-name').type('Shirt Neon');
		cy.get('#edit-desc').type('Es una buena polera');
		cy.get('#edit-dis').type(0);
		cy.get('#edit-price').type(9990);
		cy.get('#edit-cat').type('Polera');

		cy.get('.btn-sm').click();
	}),
	it('delete product', () => {
		cy.get('.nav-link').click();

		cy.get('#login-email').type('admin@example.cl');
		cy.get('#login-password').type('1234');

		cy.get('.btn-primary').click();

		cy.get('.nav-link').click();
		
		cy.get('delete-7').click();
	}),
	it('generate report', () => {
		cy.get('.nav-link').click();

		cy.get('#login-email').type('admin@example.cl');
		cy.get('#login-password').type('1234');

		cy.get('.btn-primary').click();

		cy.get('.nav-link').click();

		cy.get('#create-report').click();
	})
})