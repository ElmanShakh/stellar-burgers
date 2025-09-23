import exp from 'constants';
import {
  getIngredients,
  ingredientsSlice,
  initialState
} from '../ingredientsSlice';

const ingredientMockData = [
  {
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
  }
];

describe('Тестирование getIngredients', () => {
  test('getIngredients pending ', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('pending')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getIngredients fulfilled ', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(ingredientMockData, 'fulfilled')
    );
    expect(state.items).toEqual(ingredientMockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('getIngredients rejected ', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error(errorMessage), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
