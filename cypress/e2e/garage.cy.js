import { homePage } from "../support/POM/homePage";
import { garage } from "../support/POM/garage";

const homepage = new homePage();
const garagePage = new garage();
const randomNumber = Math.floor(Math.random() * 1000);

describe("Garage test", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"), {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    homepage.SignIn.should("be.visible");
    homepage.SignIn.click();
    cy.get(".modal-content").should("be.visible");
    cy.env(["email"]).then(({ email }) => {
      cy.get("#signinEmail").type(email);
    });
    cy.env(["password"]).then(({ password }) => {
      cy.get("#signinPassword").type(password, { sensitive: true });
    });
    cy.get(".modal-footer .btn-primary").click();
    cy.url().should("contain", "/panel/garage");
  });

  it("Add car and add fuel expense", () => {
    cy.url().should("contain", "/panel/garage");
    garagePage.addCarButton.should("be.visible");
    garagePage.addCarButton.click();
    cy.get(".modal-content").should("be.visible");
    garagePage.addButton.should("be.disabled");
    cy.get("select#addCarBrand")
      .find("option")
      .then(($options) => {
        const count = $options.length;
        const randomIndex = Cypress._.random(0, count - 1);
        cy.get("select#addCarBrand").select(randomIndex);
      });
    cy.get("select#addCarModel")
      .find("option")
      .then(($options) => {
        const count = $options.length;
        const randomIndex = Cypress._.random(0, count - 1);
        cy.get("select#addCarModel").select(randomIndex);
      });
    cy.get("#addCarMileage").type(randomNumber);
    garagePage.addButton.should("not.be.disabled");
    garagePage.addButton.click();
    garagePage.addFuelExpenseButtonForNewlyAdded.eq(0).should("be.visible");
    garagePage.addFuelExpenseButtonForNewlyAdded.eq(0).click();
    cy.get(".modal-content").should("be.visible");
    cy.get("#addExpenseMileage")
      .invoke("val")
      .then((oldValue) => {
        const newValue = oldValue + randomNumber;
        cy.get("#addExpenseMileage")
          .clear()
          .type(newValue);
      });
    cy.get("#addExpenseLiters").type(randomNumber);
    cy.get("#addExpenseTotalCost").type(randomNumber);
    garagePage.addButton.should("not.be.disabled");
    garagePage.addButton.click();
  });
});
