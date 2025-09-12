import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export type TOrderState = {
  currentOrder: TOrder | null;
  loading: boolean;
  ordersHistory: TOrder[];
  orderRequest: boolean;
  orderData: TOrder | null;
  error: string | null;
};

export const initialState: TOrderState = {
  currentOrder: null,
  loading: false,
  ordersHistory: [],
  orderRequest: false,
  orderData: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[], { rejectWithValue }) => {
    const response = await orderBurgerApi(ingredients);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.order;
  }
);

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (orderNumber: number, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(orderNumber);
    if (!response.success || response.orders.length === 0) {
      return rejectWithValue(response);
    }
    return response.orders[0];
  }
);

export const fetchOrdersHistory = createAsyncThunk(
  'order/history',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке');
    }
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload?.toString() ?? 'Ошибка создания заказа';
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString() ?? 'Ошибка загрузки заказа';
      })
      .addCase(fetchOrdersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersHistory = action.payload;
      })
      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.toString() ?? 'Ошибка загрузки истории заказов';
      });
  },
  selectors: {
    orderStateSelector: (state) => state,
    orderRequestSelector: (state) => state.orderRequest,
    orderSelector: (state) => state.currentOrder,
    orderDataSelector: (state) => state.orderData,
    orderHistorySelector: (state) => state.ordersHistory
  }
});

export const {
  orderStateSelector,
  orderRequestSelector,
  orderSelector,
  orderDataSelector,
  orderHistorySelector
} = orderSlice.selectors;
export const { clearOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
