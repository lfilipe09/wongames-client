/// <reference path="../support/index.d.ts" />

describe('Cart', () => {
  it('should add and remove items from cart', () => {
    //visitar a home
    cy.visit('/')

    //procurar um jogo e clicar no botao de carrinho
    //o eq significa o índice, 0 = primeiro item, 1 = segundo item...
    cy.addToCartByIndex(0)
    cy.addToCartByIndex(1)
    cy.addToCartByIndex(2)
    
    //verifica se o icone do carrinho tem o numero de jogos

    cy.findAllByLabelText(/cart items/i)
      .first() //pq tem carrinho tanto mobile quanto desktop
      .should('have.text', 3)
      .click()

    //abre o carrinho e verifica se tem jogos lá
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3)
    })

    //fecha o carrinho
    cy.findAllByLabelText(/cart items/i)
      .first() //pq tem carrinho tanto mobile quanto desktop
      .click()

    //procura pelo jogo adicionado e remove
    cy.removeFromCartByIndex(0)
    cy.removeFromCartByIndex(1)
    cy.removeFromCartByIndex(2)

    //verifica se o icone do carrinho nao tem nada
    cy.findAllByLabelText(/cart items/i).should('not.exist')

    //Abre o carrinho e verifica se tá vazio
    cy.findAllByLabelText(/shopping cart/i).first().click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading', {name: 'Your cart is empty'}).should('exist')
    })

  })
})