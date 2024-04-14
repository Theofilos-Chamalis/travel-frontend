const BASE_URL = "http://localhost:3100";

beforeEach(() => {
  // Start from the index page
  cy.visit(BASE_URL);
});

describe("Homepage", () => {
  it("Render the homepage", () => {
    // The homepage should contain an h1 with "Welcome to Travel Destinations"
    cy.get("h1").first().contains("Welcome to Travel Destinations");

    // The homepage should contain a navbar with "Travel Destinations" title
    cy.get(".navbar-start").contains("Travel Destinations");
  });

  it("Navigation to trip overview section of homepage", () => {
    // Click the Get Started button
    cy.get("button").contains("Get Started").click();

    cy.wait(1000);

    // The card grid should be visible
    cy.get(".grid").should("be.visible");

    // The trips overview title should be visible
    cy.get("h1").last().contains("Check our latest trips out!");
  });
});

describe("Details page", () => {
  beforeEach(() => {
    // Click the Get Started button
    cy.get("button").contains("Get Started").click();

    cy.wait(1000);
  });

  it("Should navigate to the trip details page", () => {
    // Click the first card in the grid
    cy.get(".grid > :nth-child(1) > a").click();

    // The new url should include "/travels in its path"
    cy.url().should("include", "travels");
  });

  it("Should create a new booking in the trip details page", () => {
    // Click the first card in the grid
    cy.get(".grid > :nth-child(1) > a").click();

    // Click the Book Now button
    cy.get("button").contains("Book Now").click();

    // Select the 1st form field and type john@gmail.com
    cy.get("input").first().type("john@gmail.com");

    // Select the 2nd form field and type 2
    cy.get("input").eq(1).type("2");

    // Click the Add booking to cart button
    cy.get("button").contains("Add booking to cart").click();

    // There should be an alert containing the success message
    cy.get(".alert").contains("Booking successful!");
  });
});

export default {};
