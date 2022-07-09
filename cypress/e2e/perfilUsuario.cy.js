describe ('Validacoes Perfil de Usuario', () =>{

	beforeEach(() =>{
		cy.login(Cypress.env('email'), Cypress.env('password'))
	})

	describe('Perfil e Certificados', () =>{

		it('Verifica todos os tipos de'
        +'certificado do primeiro curso da lista', () =>{
			cy.intercept('GET', '**/certificate').as('waitCertificate')
			cy.intercept('GET', '**/formalCertificate').as('waitFormalCertificate')
			cy.acessaPerfilUsuario()
			cy.log('E Acesse o certificado do Primeiro Curso da Lista')
			cy.get('.course-card__other-links > .course-card__certificate').first().click()
			cy.wait('@waitCertificate')
			cy.log('Então devo ver o Certificado Normal e poder imprimir')
			cy.get('.certificate-front-title').should('have.text', 'Certificado')
			cy.get('.certificate-front-subtitle').should('have.text', 'de conclusão')
			cy.get('.certificate-front-user-info__course_info').invoke('text')
				.should('contain', 'concluiu o curso online com carga horária estimada em')
			cy.get('.certificate-front-signature-container > .certificate-front-signature-wrapper > .certificate-front-signature-info > .certificate-front-signature-info-title')
				.first().should('have.text', 'Guilherme Silveira')
			cy.get('.certificate-front-signature-container > .certificate-front-signature-wrapper > .certificate-front-signature-info > .certificate-front-signature-info-title')
				.last().should('have.text', 'Paulo Silveira')
			cy.get('.certificate-options > .buttonLink').should('not.be.disabled').should('be.visible')
			cy.log('Quando clicar em Certificado Formal')
			cy.get('.certificate-options > .buttonLink').contains('Certificado formal').click()
			cy.wait('@waitFormalCertificate')
			cy.log('Então devo ver o Certificado Formal e poder imprimir')
			cy.get('.logo').find('img').and('have.attr', 'src').and('include', '/assets/images/alura/logo-alura.png')
			cy.get('h2').should('have.text', 'Alura Ensino Online')
			cy.get('.title > :nth-child(4)').should('have.text', 'CNPJ: 05.555.382/0001-33')
			cy.get('.formal-certificate-topics > :nth-child(1)').invoke('text').and('include', 'concluiu o curso online')
			cy.get('.certificate-first-signature > :nth-child(1) > :nth-child(2)').should('have.text', 'Guilherme Silveira')
			cy.get('p.signer').should('have.text', 'Carlos Felício')
			cy.get('.certificate-options > .buttonLink').should('not.be.disabled').should('be.visible')
		})

	})

})