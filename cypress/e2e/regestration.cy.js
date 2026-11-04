import { homePage } from "../support/POM/homePage";

const homepage = new homePage();
const email = `vp${Date.now()}@test.com`;

describe("registration", () => {
  before(() => {
    cy.visit("qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("regestration success", () => {
    homepage.SignIn.should("be.visible");
    homepage.SignIn.click();
    cy.get(".modal-content").should("be.visible");
    homepage.registrationButton.should("be.visible");
    homepage.registrationButton.click();
    homepage.registerButton.should("be.visible");
    homepage.registerButton.should("be.disabled");
    cy.get("#signupName").type("Leon");
    cy.get("#signupLastName").type("Silver");
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type("Qwerty123", { sensitive: true });
    cy.get("#signupRepeatPassword").type("Qwerty123", { sensitive: true });
    homepage.registerButton.should("not.be.disabled");
    homepage.registerButton.click();
    cy.url().should("contain", "/panel/garage");
  });
});

describe("registrion with error", () => {
  before(() => {
    cy.visit("qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("regestration with existing email", () => {
    homepage.SignIn.should("be.visible");
    homepage.SignIn.click();
    cy.get(".modal-content").should("be.visible");
    homepage.registrationButton.should("be.visible");
    homepage.registrationButton.click();
    homepage.registerButton.should("be.visible");
    homepage.registerButton.should("be.disabled");
    cy.get("#signupName").type("Leon");
    cy.get("#signupLastName").type("Silver");
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type("Qwerty123", { sensitive: true });
    cy.get("#signupRepeatPassword").type("Qwerty123", { sensitive: true });
    homepage.registerButton.should("not.be.disabled");
    homepage.registerButton.click();
    cy.get(".alert-danger").should("be.visible");
    cy.get(".alert-danger").should("contain", "User already exists");
  });
});

describe("warning messages", () => {
  beforeEach(() => {
    cy.visit("qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    homepage.SignIn.should("be.visible");
    homepage.SignIn.click();
    cy.get(".modal-content").should("be.visible");
    homepage.registrationButton.should("be.visible");
    homepage.registrationButton.click();
  });

  it("Name field warnings", () => {
    cy.get("#signupName").should("have.class", "ng-untouched"); // Поле неактивне
    cy.get("#signupName").focus().blur();
    cy.get("#signupName").should("have.class", "is-invalid ng-touched"); // Поле не валідне та червоне
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Name required");
    cy.get("#signupName").type("L ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should(
      "contain",
      "Name has to be from 2 to 20 characters long",
    );
    cy.get("#signupName").clear();
    cy.get("#signupName").type("11111 ");
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Name is invalid");
    cy.get("#signupName").clear();
  });

  it("Last Name field warnings", () => {
    cy.get("#signupLastName").should("have.class", "ng-untouched"); // Поле неактивне
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName").should("have.class", "is-invalid ng-touched"); // Поле не валідне та червоне
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Last name required");
    cy.get("#signupLastName").type("S ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should(
      "contain",
      "Last name has to be from 2 to 20 characters long",
    );
    cy.get("#signupLastName").clear();
    cy.get("#signupLastName").type("11111 ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Last name is invalid");
    cy.get("#signupLastName").clear();
  });

  it("Email field warnings", () => {
    cy.get("#signupEmail").should("have.class", "ng-untouched"); // Поле неактивне
    cy.get("#signupEmail").focus().blur();
    cy.get("#signupEmail").should("have.class", "is-invalid ng-touched"); // Поле не валідне та червоне
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Email required");
    cy.get("#signupEmail").type("vp@gmail,com ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Email is incorrect");
  });

  it("Password and Re-enter Password fields warnings", () => {
    cy.get("#signupPassword").should("have.class", "ng-untouched"); // Поле неактивне
    cy.get("#signupPassword").focus().blur();
    cy.get("#signupPassword").should("have.class", "is-invalid ng-touched"); // Поле не валідне та червоне
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Password required");
    cy.get("#signupPassword").type("qwerty123 ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    cy.get("#signupPassword").clear();
    cy.get("#signupPassword").type("qwertyqwerty ".trim());
    cy.get(".invalid-feedback").should("contain", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    cy.get("#signupPassword").clear();
    cy.get("#signupPassword").type("QWERTY123 ".trim());
    cy.get(".invalid-feedback").should("contain", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    cy.get("#signupPassword").clear();
    cy.get("#signupPassword").type("Qwerty1 ".trim());
    cy.get(".invalid-feedback").should("contain", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    cy.get("#signupPassword").clear();
    cy.get("#signupPassword").type("Qwerty123 ".trim());
    cy.get("#signupRepeatPassword").should("have.class", "ng-untouched"); // Поле неактивне
    cy.get("#signupRepeatPassword").focus().blur();
    cy.get("#signupRepeatPassword").should("have.class", "is-invalid ng-touched"); // Поле не валідне та червоне
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Re-enter password required");
    cy.get("#signupRepeatPassword").type("Qwerty12 ".trim());
    cy.get(".invalid-feedback").should("be.visible");
    cy.get(".invalid-feedback").should("contain", "Passwords do not match");
  })
});
