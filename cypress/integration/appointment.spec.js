describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("Should book an interview", () => {
    cy.get(":nth-child(2) > .appointment__add > .appointment__add-button")
      .click()
      .get("[data-testid=student-name-input]")
      .type("Benny Marco")
      .get(":nth-child(2) > .interviewers__item-image")
      .click()
      .get(".button--confirm")
      .click()
    cy.contains('Benny Marco')
  })
  it("Should edit an interview", () => {
    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true })
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Benny Marco")
      .get(':nth-child(2) > .interviewers__item-image')
      .click()
      .get('.button--confirm')
      .click()
    cy.contains(".appointment__card--show", "Benny Marco");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })
  it("Should cancel an interview", () => {
    cy.get('[alt="Delete"]')
      .click({ force: true })
      .get('.appointment__actions > :nth-child(2)')
      .click()
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
})

