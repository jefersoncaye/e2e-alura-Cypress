describe('Testes Login', () => {

	it('Login Usuario Valido',() => {
		cy.login(Cypress.env("email"), Cypress.env("password"), {cacheSession : false})
	})

	it('Login Usuario Invalido',() => {
		cy.visit('/loginForm?urlAfterLogin=https://cursos.alura.com.br/dashboard')
    	cy.get('#login-email').should('be.visible').type('teste@exemplo.com')
		cy.get('#password').should('be.visible').type('444444')
		cy.get('.btn-login').should('not.be.disabled').click()
		cy.url().should('be.equal', 'https://cursos.alura.com.br/loginForm')
		cy.get('.error-info > p').should('have.text', 'E-mail ou senha incorretos.')
		cy.get('.alert-message').invoke('text').should('contain', 'Precisa de ajuda?')
	})

})