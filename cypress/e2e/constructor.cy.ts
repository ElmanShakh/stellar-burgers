describe('Проверка добавления ингредиента из списка ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/')
  });
  const buns = `[data-testid='bun']`;
  const mains = `[data-testid='main']`;
  const sauce = `[data-testid='sauce']`;

 it('Добавление ингредиента в конструктор', () => {
  cy.get(buns).contains('Добавить').first().click()
  cy.get(mains).contains('Добавить').first().click()
  cy.get(sauce).contains('Добавить').first().click()
  });
});

describe('Тест открытия/закрытия модального окна с описанием градиента', () => {
  beforeEach(() =>{
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/');
  })
  const card = `[data-testid='cypress-card']`;
  const modal = `[data-testid='cypress-modal']`
  const cardCloseButton = `[data-testid='cypress-cardClose']`
  it('модальное окно открыто',() =>{
    cy.get(card).first().click()
    cy.get(modal).should('be.visible')
    cy.get(cardCloseButton).click();
    cy.get(modal).should('not.exist')
  });
})

describe('Тест конструктора создания бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders' });
    cy.visit('http://localhost:4000/');

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000/');
  });
 
  const buns = `[data-testid='bun']`;
  const mains = `[data-testid='main']`;
  const sauce = `[data-testid='sauce']`;
  const orderButton = `[data-testid='order-button']`
  const modal = `[data-testid='cypress-modal']`
  const cardCloseButton = `[data-testid='cypress-cardClose']`
  const burgerConstructor = `[data-testid='burgerConstructor']`
  it('Сборка бургера', () => {
  cy.get(buns).contains('Добавить').first().click()
  cy.get(mains).contains('Добавить').first().click()
  cy.get(sauce).contains('Добавить').first().click()

  cy.get(orderButton).click();

  cy.get(modal).should('be.visible')
  cy.get(cardCloseButton).click();
  cy.get(modal).should('not.exist')

  cy.get(burgerConstructor).should('contain', 'Выберите булки').and('contain', 'Выберите начинку');
    

  });
   afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });
});
