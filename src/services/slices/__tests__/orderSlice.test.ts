import {
  clearOrderModal,
  createOrder,
  fetchOrder,
  fetchOrdersHistory,
  initialState,
  orderSlice
} from '../orderSlice';

const ordersMockData = {
  _id: '68cc433c673086001ba88c17',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0949',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa093c'
  ],
  name: 'Краторный минеральный экзо-плантаго spicy люминесцентный метеоритный бургер',
  status: 'done',
  createdAt: '2025-09-18T17:37:00.495Z',
  updatedAt: '2025-09-18T17:37:01.744Z',
  number: 89003
};

const ordersHistoryMockData = {
  success: true,
  orders: [
    {
      _id: '68c422b3673086001ba87de8',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2025-09-12T13:40:03.543Z',
      updatedAt: '2025-09-12T13:40:04.366Z',
      number: 88601
    }
  ]
};

describe('Тестирование createOrder', () => {
  test('createOrder pending ', () => {
    const state = orderSlice.reducer(
      initialState,
      createOrder.pending('pending', ordersMockData.ingredients)
    );
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrder fulfilled ', () => {
    const state = orderSlice.reducer(
      initialState,
      createOrder.fulfilled(
        ordersMockData,
        'fulfilled',
        ordersMockData.ingredients
      )
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toEqual(ordersMockData);
    expect(state.currentOrder).toEqual(ordersMockData);
  });
  test('createOrder rejected ', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = orderSlice.reducer(
      { ...initialState, orderRequest: true },
      createOrder.rejected(
        new Error(errorMessage),
        'rejected',
        ordersMockData.ingredients
      )
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

describe('Тестирование createOrder', () => {
  test('fetchOrder pending', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrder.pending('pending', ordersMockData.number)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchOrder fulfilled', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrder.fulfilled(ordersMockData, 'fulfilled', ordersMockData.number)
    );
    expect(state.loading).toBe(false);
    expect(state.orderData).toEqual(ordersMockData);
    expect(state.currentOrder).toEqual(ordersMockData);
  });

  test('fetchOrder rejected', () => {
    const errorMessage = 'Ошибка загрузки заказа';
    const state = orderSlice.reducer(
      initialState,
      fetchOrder.rejected(
        new Error(errorMessage),
        'rejected',
        ordersMockData.number
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

describe('Тестирование fetchOrdersHistory', () => {
  test('fetchOrdersHistory pending ', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrdersHistory.pending('pending')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchOrdersHistory fulfilled ', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrdersHistory.fulfilled(ordersHistoryMockData.orders, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.ordersHistory).toEqual(ordersHistoryMockData.orders);
  });

  test('fetchOrdersHistory rejected ', () => {
    const errorMessage = 'Ошибка загрузки истории заказов';
    const state = orderSlice.reducer(
      initialState,
      fetchOrdersHistory.rejected(new Error(errorMessage), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

describe('Тестирование clearOrderModal', () => {
  test('clearOrderModal', () => {
    const stateWithOrder = {
      ...initialState,
      orderData: ordersMockData
    };

    const state = orderSlice.reducer(stateWithOrder, clearOrderModal());

    expect(state.orderData).toBeNull();
  });
});