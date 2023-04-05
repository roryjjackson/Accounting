const apiUrl = `${Cypress.env("http://localhost:3000/api/ping")}`

describe('Backend Test Spec', () => {

  it('should call ping', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
