export class homePage {
  get headerLogo() {
    return cy.get(".header_logo");
  }

  get Home() {
    return cy.get(".btn.header-link.-active");
  }

  get About() {
    return cy.get(".btn.header-link").eq(1);
  }

  get Contacts() {
    return cy.get(".btn.header-link").eq(2);
  }

  get GuestLogIn() {
    return cy.get(".header-link.-guest");
  }

  get SignIn() {
    return cy.get(".header_signin");
  }

  get facebook() {
    return cy.get(".socials_link").eq(0);
  }

  get telegram() {
    return cy.get(".socials_link").eq(1);
  }

  get youtube() {
    return cy.get(".socials_link").eq(2);
  }

  get instagram() {
    return cy.get(".socials_link").eq(3);
  }

  get linkedin() {
    return cy.get(".socials_link").eq(4);
  }

  get contactLink() {
    return cy.get(".contacts_link.display-4");
  }

  get email() {
    return cy.get(".contacts_link.h4");
  }
}
