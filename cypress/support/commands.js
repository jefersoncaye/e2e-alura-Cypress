Cypress.Commands.add('login', (username, password, {cacheSession = true} = {}) =>{
	const login = () => {
		cy.visit('/loginForm?urlAfterLogin=https://cursos.alura.com.br/dashboard')
		cy.get('#login-email').should('be.visible').type(username, {log:false})
		cy.get('#password').should('be.visible').type(password, {log:false})
		cy.get('.btn-login').should('not.be.disabled').click()
		cy.url().should('be.equal', 'https://cursos.alura.com.br/dashboard')
	}

	if (cacheSession) {
		cy.session ([username, password], login)
		cy.visit('/')
	} else{
		login()
	}
})

Cypress.Commands.add('acessaPerfilUsuario', () =>{
	cy.intercept('GET', '*user/*').as('waitUser')
	cy.log('Dado que eu acesse "Perfil e Certificados"')
	cy.get('.content-menu-section-profile > .content-menu-button').should('be.visible').click()
	cy.get('.content-menu-section-profile > #profileList > .header-nav-link--profile')
		.should('be.visible').click()
	cy.wait('@waitUser')
})