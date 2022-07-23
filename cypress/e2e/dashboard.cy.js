describe ('Validacoes Dashboard', () =>{

	beforeEach(() =>{
		cy.login(Cypress.env('email'), Cypress.env('password'))
	})

	it('Se autenticado o dashboard deve me mostrar as novidades,' +
    ' e ter links para as mesmas', () =>{

		cy.log('Verifica se todos elementos existem e redirecionam para algum link')
		cy.get('.feed-wrapper > .container > .headline').should('have.text', 'Novidades')
		cy.get('.feed-wrapper > .container > .seeMore-text').and('have.attr', 'href')
			.and('include', '/explore')

		cy.get('.feed').children(':nth-child(1)').find('.feed__content__text')
			.should('not.be.empty')
			.find('.feed__content__type').should('not.be.empty')

		cy.get('.feed').children(':nth-child(2)').find('.feed__content__text')
			.should('not.be.empty')
			.find('.feed__content__type').should('not.be.empty')

		cy.get('.feed').children(':nth-child(3)').find('.feed__content__text')
			.should('not.be.empty')
			.find('.feed__content__type').should('not.be.empty')

		cy.get('.feed').children(':nth-child(4)').find('.feed__content__text')
			.should('not.be.empty')
			.find('.feed__content__type').should('not.be.empty')

		cy.get('.feed').find('.feed__row').find('.feed__link')
			.and('have.attr', 'href').and('not.be.empty')
	})

	it('Ao alterar o destaque, quando entrar no ' +
    'dashboard deve mostrar novo destaque', () => {
		cy.intercept('GET', '*learning-guide/mine').as('waitGuide')
		cy.intercept('GET', '*dashboard').as('waitDashboard')
		cy.log('Acessa a pagina de alteração')
		cy.get('.seeMore-texts-wrapper > [href="/learning-guide/mine"]')
			.should('be.visible').click()
		cy.wait('@waitGuide')
		cy.log('Altera o Destaque para DevOps')
		cy.get('#guideToShow').select('DevOps')
		cy.log('Volta para o Dashboard e verifica se foi alterado')
		cy.visit('/dashboard')
		cy.wait('@waitDashboard')
		cy.get('.degreesInProgress__content-title > a').should('have.text', 'DevOps')
		cy.log('Acessa a pagina de alteração')
		cy.get('.seeMore-texts-wrapper > [href="/learning-guide/mine"]')
			.should('be.visible').click()
		cy.wait('@waitGuide')
		cy.log('Altera o Destaque para Testes em .NET')
		cy.get('#guideToShow').select('Testes em .NET')
		cy.log('Volta para o Dashboard e verifica se foi alterado')
		cy.visit('/dashboard')
		cy.wait('@waitDashboard')
		cy.get('.degreesInProgress__content-title > a').should('have.text', 'Testes em .NET')
	})

})