describe ('Validacoes Perfil de Usuario', () =>{

	beforeEach(() =>{
		cy.login(Cypress.env('email'), Cypress.env('password'))
	})

	describe('Perfil e Certificados', () =>{
		it('Verifica e Baixa todos os tipos de'
        +'certificado do primeiro curso da lista', () =>{
			cy.intercept('GET', '*user/*').as('waitUser')
			cy.intercept('GET', '**/certificate').as('waitCertificate')
			cy.get('.content-menu-section-profile > .content-menu-button').should('be.visible').click()
			cy.get('.content-menu-section-profile > #profileList > .header-nav-link--profile')
				.should('be.visible').click()
			cy.wait('@waitUser')
			cy.get('.course-card__other-links > .course-card__certificate').first().click()
			cy.wait('@waitCertificate')
			cy.get('.certificate-front-title').should('have.text', 'Certificado')
			cy.get('.certificate-front-subtitle').should('have.text', 'de conclusão')
			cy.get('.certificate-front-user-info__course_info').invoke('text')
				.should('contain', 'concluiu o curso online com carga horária estimada em')
			cy.get('.certificate-front-signature-container > .certificate-front-signature-wrapper > .certificate-front-signature-info > .certificate-front-signature-info-title')
				.first().should('have.text', 'Guilherme Silveira')
			cy.get('.certificate-front-signature-container > .certificate-front-signature-wrapper > .certificate-front-signature-info > .certificate-front-signature-info-title')
				.last().should('have.text', 'Paulo Silveira')
			cy.get('[onclick="window.print();"]').should('be.visible').click()
		})




	})

})