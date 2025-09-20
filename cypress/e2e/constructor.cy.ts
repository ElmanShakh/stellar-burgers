const buns = "[data-testid='bun']";
const mains = "[data-testid='main']";
const sauce = "[data-testid='sauce']";
const burgerConstructor = "[data-testid='burgerConstructor']";
const cardCloseButton = "[data-testid='cypress-cardClose']";
const modal = "[data-testid='cypress-modal']";
const orderButton = "[data-testid='order-button']";
const card = "[data-testid='cypress-card']";
const orderNumber = "[data-testid='cypress-order_number']";

describe('Проверка конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/');
  });

  describe('Проверка добавления ингредиента из списка ингредиентов в конструктор', () => {
    it('Добавление ингредиента в конструктор', () => {
      cy.get(buns).contains('Добавить').first().click();
      cy.get(mains).contains('Добавить').first().click();
      cy.get(sauce).contains('Добавить').first().click();

      cy.get(burgerConstructor).should('not.contain', 'Выберите булки');
      cy.get(burgerConstructor).should('not.contain', 'Выберите начинку');

      cy.get(burgerConstructor).should('contain', 'булка');
      cy.get(burgerConstructor).should('contain', 'Биокотлета');
      cy.get(burgerConstructor).should('contain', 'Соус');
    });
  });

  describe('Тест открытия/закрытия модального окна с описанием градиента', () => {
    it('модальное окно открыто', () => {
      cy.get(card).first().click();
      cy.get(modal).should('be.visible');
      cy.get(cardCloseButton).click();
      cy.get(modal).should('not.exist');
    });
  });

  describe('Тест конструктора создания бургера', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'orders' });
      cy.visit('http://localhost:4000/');

      window.localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.setCookie('accessToken', 'test-access-token');
    });

    it('Сборка бургера', () => {
      cy.get(buns).contains('Добавить').first().click();
      cy.get(mains).contains('Добавить').first().click();
      cy.get(sauce).contains('Добавить').first().click();

      cy.get(orderButton).click();

      cy.get(modal).should('be.visible');
      cy.get(orderNumber).should('contain', '88712');
      cy.get(cardCloseButton).click();
      cy.get(modal).should('not.exist');

      //проверка сброса конструктора
      cy.get(burgerConstructor)
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
    afterEach(() => {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });
  });
});
