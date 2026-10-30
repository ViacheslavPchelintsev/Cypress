import { homePage } from "../support/POM/homePage";

const homepage = new homePage();

describe("header", () => {
  beforeEach(() => {
    cy.visit("qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("headerLogo", () => {
    homepage.headerLogo.should("be.visible");
    homepage.headerLogo.click();
    cy.url().should("contain", "qauto.forstudy.space/");
  });

  it("Home", () => {
    homepage.Home.should("be.visible");
    homepage.Home.click();
    cy.url().should("contain", "qauto.forstudy.space/");
  });

  it("About", () => {
    homepage.About.should("be.visible");
    homepage.About.click();
    cy.url().should("contain", "qauto.forstudy.space/");
  });

  it("Contacts", () => {
    homepage.Contacts.should("be.visible");
    homepage.Contacts.click();
    cy.url().should("contain", "qauto.forstudy.space/");
  });

  it("Guest Log In", () => {
    homepage.GuestLogIn.should("be.visible");
    homepage.GuestLogIn.click();
    cy.url().should("contain", "/panel/garage");
  });

  it("Sign In", () => {
    cy.get(".modal-content").should("not.exist");
    homepage.SignIn.should("be.visible");
    homepage.SignIn.click();
    cy.get(".modal-content").should("be.visible");
  });
});

describe("footer", () => {
  beforeEach(() => {
    cy.visit("qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("facebook", () => {
    homepage.facebook.should("be.visible");
    homepage.facebook.invoke("removeAttr", "target").click();
    cy.url().should("contain", "facebook");
  });

  it("telegram", () => {
    homepage.telegram.should("be.visible");
    homepage.telegram
      .should("have.attr", "href")
      .and("include", "t.me/ithillel_kyiv");
  });

  it("youtube", () => {
    homepage.youtube.should("be.visible");
    homepage.youtube.invoke("removeAttr", "target").click();
    cy.url().should("contain", "youtube");
  });

  it("instagram", () => {
    homepage.instagram.should("be.visible");
    homepage.instagram.invoke("removeAttr", "target").click();
    cy.url().should("contain", "instagram");
  });

  it("linkedin", () => {
    homepage.linkedin.should("be.visible");
    homepage.linkedin
      .should("have.attr", "href")
      .and("include", "linkedin.com/school/ithillel/");
    // homepage.linkedin.invoke("removeAttr", "target").click();
    // cy.url().should("contain", "linkedin");
  });

  it("Contact Link", () => {
    homepage.contactLink.should("be.visible");
    homepage.contactLink.invoke("removeAttr", "target").click();
    cy.url().should("contain", "ithillel.ua/");
  });

  it("Email", () => {
    homepage.email.should("be.visible");
    homepage.email
      .should("have.attr", "href")
      .and("include", "developer@ithillel.ua");
  });
});
