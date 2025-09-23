import { feedSlice, fetchFeeds, initialState } from '../feedSlice';

const feedMock = {
  success: true,
  orders: [
    {
      _id: '68cb8cc5673086001ba88b22',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный традиционный-галактический фалленианский люминесцентный бургер',
      createdAt: '2025-09-18T04:38:29.269Z',
      updatedAt: '2025-09-18T04:38:30.510Z',
      number: 88981
    }
  ],
  total: 88607,
  totalToday: 97
};

const feedMockResponse = {
  orders: feedMock.orders,
  total: feedMock.total,
  totalToday: feedMock.totalToday
};

describe('Тестирование fetchFeeds', () => {
  test('fetchFeeds pending ', () => {
    const state = feedSlice.reducer(
      initialState,
      fetchFeeds.pending('pending')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchFeeds fulfilled ', () => {
    const state = feedSlice.reducer(
      initialState,
      fetchFeeds.fulfilled(feedMockResponse, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(feedMock.orders);
    expect(state.total).toBe(feedMock.total);
    expect(state.totalToday).toBe(feedMock.totalToday);
  });

  test('fetchFeeds rejected ', () => {
    const errorMessage = 'Ошибка загрузки ленты';
    const state = feedSlice.reducer(
      initialState,
      fetchFeeds.rejected(new Error(errorMessage), 'rejected')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
