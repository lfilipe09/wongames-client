/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home sections', () => {
    //visitar a página
    //A barra acessa o baseURl configurado no cypress.json
    cy.visit('/')

    //Teste para selecionar os banners
    cy.shouldRenderBanner()
    cy.shouldRenderShowcase({name: "New Games", highlight: false})
    cy.shouldRenderShowcase({name: "Most Popular Games", highlight: true})
    cy.shouldRenderShowcase({name: "Upcoming Games", highlight: true})
    cy.shouldRenderShowcase({name: "Free Games", highlight: true})
  })
})