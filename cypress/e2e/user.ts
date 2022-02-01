/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate"

describe('User', () => {
  it('should sign up', () => {
    const user = createUser()

    cy.visit('/sign-up')

    cy.signUp(user)
    //nao usa o location pq o location verifica se contém alguma coisa, o url olha pra toda a url
    //aqui tá conferindo pq tem que voltar exatamente pra home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    //procurar o botão com o nome do usuário
    cy.findByText(user.username).should('exist')
  })

  it('should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.signIn()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByText(/luis/i).should('exist').click()
    cy.findByText(/sign out/i).click()

    cy.findByRole('link', {name: /sign in/i}).should('exist')
    cy.findByText(/luis/i).should('not.exist')
  })

  it.only('should sign the user redirect to the page that it was defined previously', () => {
    cy.visit('/profile/me')

    //redirecionado para o sign-in com o callback do profile/me
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`)

    //fazer o sign in
    cy.signIn()

    //espero ser redirecionado para o profile
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/me`)

    cy.findByLabelText(/username/i).should('have.value', 'Luis')
    cy.findByLabelText(/e-mail/i).should('have.value', 'luisinhofinancas@gmail.com')
    

  })
})