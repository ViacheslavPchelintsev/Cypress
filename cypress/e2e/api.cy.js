import { garage } from "../support/POM/garage";

const garagePage = new garage();
const randomNumber = Math.floor(Math.random() * 1000);

describe("API test", () => {
  let token;
  let carID;

  it("Add Car, Expenses and check it", () => {
    cy.intercept("POST", "https://qauto.forstudy.space/api/cars").as(
      "postAddCar",
    );

    cy.request("POST", "https://qauto.forstudy.space/api/auth/signin", {
      email: "vp1@gmail.com",
      password: "Qwerty123",
      remember: false,
    }).then((response) => {
      //   console.log(response.headers["set-cookie"][0].split(";")[0]);
      expect(response.status).to.eq(200);
      token = response.headers["set-cookie"][0].split(";")[0];
      expect(token).to.exist;
    });

    cy.visit("https://qauto.forstudy.space/panel/garage", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
      headers: {
        Cookie: token,
      },
    });

    cy.url().should("contain", "/panel/garage");
    garagePage.addCarButton.should("be.visible");
    garagePage.addCarButton.click();
    cy.get(".modal-content").should("be.visible");
    garagePage.addButton.should("be.disabled");

    cy.get("#addCarBrand")
      .find("option")
      .then(($options) => {
        const count = $options.length;
        const randomIndex = Cypress._.random(0, count - 1);
        cy.get("select#addCarBrand").select(randomIndex);
      });

    cy.get("#addCarModel")
      .find("option")
      .then(($options) => {
        const count = $options.length;
        const randomIndex = Cypress._.random(0, count - 1);
        cy.get("select#addCarModel").select(randomIndex);
      });

    cy.get("#addCarMileage").type(1000);
    garagePage.addButton.should("not.be.disabled");
    garagePage.addButton.click();

    cy.wait("@postAddCar").then((interception) => {
      //   console.log(interception.response.body);
      carID = interception.response.body.data.id;
      expect(carID).to.exist;
      //

      cy.request("GET", `https://qauto.forstudy.space/api/cars/`).then(
        (response) => {
          //   console.log(response.body);
          expect(response.status).to.eq(200);
          expect(response.body.data[0]).to.deep.include({
            id: carID,
          });
        },
      );

      cy.request("POST", "https://qauto.forstudy.space/api/expenses", {
        carId: carID,
        reportedAt: new Date().toISOString().split("T")[0],
        mileage: 2000,
        liters: 500,
        totalCost: 3000,
      }).then((response) => {
        // console.log(response.body);
        expect(response.status).to.eq(200);
      });
    });

    cy.get(".sidebar_btn").eq(1).click();
    cy.url().should("contain", "/panel/expenses");
    cy.get(".expenses_table-wrapper").should("be.visible");
    cy.get(".expenses_table-wrapper").should("contain", 2000);
  });
});
