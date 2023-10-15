describe('Note app', function () {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Seif Samy',
      password: 'SeifXDD',
      username: 'OwleN',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })
  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.viewport(550, 750)

    cy.contains('sign in').click()
    cy.get('input:first').type('OwleN')
    cy.get('input:last').type('SeifXDD')
    cy.contains('login').click()
  })

  it('login cred is wrong', () => {
    cy.contains('sign in').click()
    cy.get('input:first').type('OwleN')
    cy.get('input:last').type('dsaadsads')
    cy.contains('login').click()
    cy.contains('Wrong Cred')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'OwleN', password: 'SeifXDD' })
    })

    it('test new note', () => {
      cy.contains('new note').click()
      cy.get('input').type('new note from e2e testing')
      cy.contains('save').click()
      cy.contains('new note from e2e testing')
    })

    describe('a note importance can change', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'xddMOTSSSSS',
          important: false,
        })
        cy.createNote({
          content: 'xddMOTSSSSS1111',
          important: false,
        })
        cy.createNote({
          content: 'xddMOTSSSSS2222',
          important: false,
        })
      })
      it('change importance', () => {
        cy.contains('show all').click()
        cy.contains('xddMOTSSSSS').contains('make important').click()
        cy.contains('xddMOTSSSSS').contains('make not important')
      })
      it('then example', function () {
        cy.get('button').then((buttons) => {
          console.log('number of buttons', buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })
})
