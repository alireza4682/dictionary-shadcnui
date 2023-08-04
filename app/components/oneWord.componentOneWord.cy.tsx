import React from "react";
import { OneWord } from "./oneWord.component";

describe("<OneWord />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OneWord wordToShow="fast" />);
  });
});
