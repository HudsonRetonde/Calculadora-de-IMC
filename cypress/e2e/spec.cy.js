const getSubmitButton = () => cy.get('button[type="submit"]');
const getWeightInput = () => cy.get('input[name="peso"]');
const getHeightInput = () => cy.get('input[name="altura"]');
const getBmiResult = () => cy.get("#resultado");

describe("Calculadora IMC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("[Happy Path]", () => {
    it("Should show 'Abaixo do peso' when IMC is less than 18.5", () => {
      getWeightInput().type("40");
      getHeightInput().type("1.60");
      getSubmitButton().click();
      getBmiResult().should("contain", "Abaixo do peso");
    });
    it("Should show 'Peso normal' when IMC is between 18.5 and 24.9", () => {
      getWeightInput().type("80");
      getHeightInput().type("1.80");
      getSubmitButton().click();

      getBmiResult().should("contain", "24.69");
      getBmiResult().should("contain", "Peso normal");
    });

    it("Should show 'Sobrepeso' when IMC is between 25 and 29.9", () => {
      getWeightInput().type("90");
      getHeightInput().type("1.80");
      getSubmitButton().click();

      getBmiResult().should("contain", "27.78");
      getBmiResult().should("contain", "Sobrepeso");
    });

    it("Should show 'Obesidade grau 1' when IMC is between 30 and 34.9", () => {
      getWeightInput().type("100");
      getHeightInput().type("1.80");
      getSubmitButton().click();

      getBmiResult().should("contain", "30.86");
      getBmiResult().should("contain", "Obesidade grau 1");
    });

    it("Should show 'Obesidade grau 2' when IMC is between 35 and 39.9", () => {
      getWeightInput().type("120");
      getHeightInput().type("1.80");
      getSubmitButton().click();

      getBmiResult().should("contain", "37.04");
      getBmiResult().should("contain", "Obesidade grau 2");
    });

    it("Should show 'Obesidade grau 3' when IMC is greater than 40", () => {
      getWeightInput().type("140");
      getHeightInput().type("1.80");
      getSubmitButton().click();

      getBmiResult().should("contain", "43.21");
      getBmiResult().should("contain", "Obesidade grau 3");
    });
  });

  describe("[Unhappy Path]", () => {
    it("Should show a invalid message when both fields are empty", () => {
      getSubmitButton().click();
      getBmiResult().should("contain", "Peso inválido!");
    });

    it("Should shown a invalid message when the weight is empty", () => {
      getHeightInput().type("1.80");
      getSubmitButton().click();
      getBmiResult().should("contain", "Peso inválido!");
    });

    it("Should shown a invalid message when the height is empty", () => {
      getWeightInput().type("80");
      getSubmitButton().click();
      getBmiResult().should("contain", "Altura inválida!");
    });

    it("Should shown a invalid message when the weight is invalid", () => {
      getWeightInput().type("abc");
      getHeightInput().type("1.80");
      getSubmitButton().click();
      getBmiResult().should("contain", "Peso inválido!");
    });

    it("Should shown a invalid message when the height is invalid", () => {
      getWeightInput().type("80");
      getHeightInput().type("abc");
      getSubmitButton().click();
      getBmiResult().should("contain", "Altura inválida!");
    });
  });
});
