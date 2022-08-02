import { element } from "prop-types";

describe("PositiveTest1", () => {
  it("passes1", () => {
    cy.visit("/");
    cy.contains("Log in").should("be.visible");
  });

  it("AddBooksPositive", () => {
    cy.visit("/");
    cy.loginIn("test@test.com", "test");
    cy.contains("test@test.com").should("be.visible");
    cy.addBook("Лев Толстой", "Война и Мир", "исторический роман", false);
    cy.addBook("Ильф и Петров", "12 стульев", "сатирический роман", false);
    cy.contains("Война и Мир").should("be.visible");
  });

  it("VeiwDownloadBookPositive", () => {
    cy.visit("/");
    cy.loginIn("test@test.com", "test");
    cy.addBook(
      "А и Б Стругацкие",
      "Понедельник начинается в субботу",
      "фантастический роман",
      false
    );
    cy.get(".mt-3").then(($element) => {
      return $element[1].click();
    });
    cy.contains("12 стульев").should("be.visible");
    cy.contains("Dowload book").should("be.visible");
    cy.loginOut();
  });
});

describe("PositiveTest2", () => {
  it("Positive2", () => {
    cy.visit("/");
    cy.loginIn("bropet@mail.ru", "123");
    cy.contains("bropet@mail.ru").should("be.visible");
    cy.addBook(
      "А и Б Стругацкие",
      "Понедельник начинается в субботу",
      "фантастический роман",
      false
    );
    cy.contains("12 стульев").should("be.visible");
    cy.loginOut();
  });
});

describe("NegativeTest", () => {
  it("Positive2", () => {
    cy.loginIn("bropet", "123");
    cy.get("#mail")
      .then(($element) => {
        return $element[0].checkValidity();
      })
      .should("be.false");
  });
});

describe("FavoriteBookPositive", () => {
    it("AddFavoritePositive", () => {
      cy.visit("/");
      cy.loginIn("bropet@mail.ru", "123");
      cy.addBook("Иван Ефремов", "Таис Афинская", "фантастика", true);
      cy.get("button").then(($element) => {
        return $element[2].click();
      });
      cy.contains("Favorites").click();
      cy.contains("Война и Мир").should("be.visible");
      cy.contains("Таис Афинская").should("be.visible");
      cy.loginOut();
    });
  });