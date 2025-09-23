import {
  addIngredient,
  constructorSlice,
  initialState,
  moveIngredient,
  removeIngredient,
  resetConstructor
} from '../constructorSlice';

const mockBunData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const mockMainData = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const mockSauceData = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
};

describe('Тестирование добавления элементов в конструктор', () => {
  test('addBun', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(mockBunData)
    );

    expect(state.bun).toEqual({
      ...mockBunData,
      id: expect.any(String) // nanoid генерирует случайный id
    });
    expect(state.ingredients).toHaveLength(0);
  });

  test('addIngredient', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(mockMainData)
    );

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mockMainData,
      id: expect.any(String)
    });
  });
});

describe('Тестирование удаления из конструктора ', () => {
  test('removeIngredient', () => {
    const mainIngredient = { ...mockMainData, id: 'main-id-1' };
    const sauceIngredient = { ...mockSauceData, id: 'sauce-id-1' };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mainIngredient, sauceIngredient]
    };
    const state = constructorSlice.reducer(
      stateWithIngredients,
      removeIngredient('main-id-1')
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(sauceIngredient);
  });
});

describe('Тестирование перемещения внутри конструктора', () => {
  test('moveIngredient', () => {
    const ingredient1 = { ...mockMainData, id: '1' };
    const ingredient2 = { ...mockSauceData, id: '2' };
    const ingredient3 = { ...mockMainData, id: '3' };

    const state = {
      ...initialState,
      ingredients: [ingredient1, ingredient2, ingredient3]
    };

    const newState = constructorSlice.reducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(newState.ingredients).toEqual([
      ingredient2,
      ingredient3,
      ingredient1
    ]);
  });
});

describe('Тестирование очистки конструктора ', () => {
  test('resetConstructor', () => {
    const fullConstructor = {
      bun: mockBunData,
      ingredients: [
        { ...mockMainData, id: '1' },
        { ...mockSauceData, id: '2' }
      ]
    };

    const newState = constructorSlice.reducer(
      fullConstructor,
      resetConstructor()
    );

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
