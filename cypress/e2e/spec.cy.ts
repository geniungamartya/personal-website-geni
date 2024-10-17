describe("E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display the home page with title and description", () => {
    cy.contains("Hey, welcome!");
  });

  it("Should navigate to the blog page and list all posts", () => {
    cy.visit("/blog");
    cy.url().should("include", "/blog");

    cy.contains("Cheatsheet - Setup Linux VPS");
    cy.contains("My First Post");
  });

  it("Should navigate to a specific blog post", () => {
    cy.visit("/blog");
    cy.get("a").contains("Cheatsheet - Setup Linux VPS").click();

    cy.url().should("include", "/blog/setup-server-vps");
    cy.contains("Cheatsheet - Setup Linux VPS");
  });

  it("Should navigate to the playground page", () => {
    cy.visit("/playground");
    cy.url().should("include", "/playground");
    cy.contains("Button");
  });
});
