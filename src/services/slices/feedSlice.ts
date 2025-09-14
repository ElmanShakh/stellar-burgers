import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  loading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  loading: false,
  total: NaN,
  totalToday: NaN,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetch',
  async (): Promise<{
    orders: TOrder[];
    total: number;
    totalToday: number;
  }> => {
    const response = await getFeedsApi();
    return response;
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  },
  selectors: {
    feedSelector: (state) => state,
    feedOrderSelector: (state) => state.orders
  }
});

export const { feedSelector, feedOrderSelector } = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
