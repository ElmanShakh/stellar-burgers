import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  logoutApi,
  TLoginData,
  loginUserApi,
  registerUserApi,
  TRegisterData,
  updateUserApi,
  getUserApi
} from '@api';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserRequest?: boolean;
  loginUserError?: string | null;
  registerRequest?: boolean;
  registerError?: string | null;
  updateUserRequest?: boolean;
  updateUserError?: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk<TUser, TLoginData>( //+
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    const data = await loginUserApi(userData);
    if (!data?.success) return rejectWithValue(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  //+
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
        return true;
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const register = createAsyncThunk<TUser, TRegisterData>( //+
  'user/register',
  async (userData, { rejectWithValue }) => {
    const data = await registerUserApi(userData);
    if (!data?.success) return rejectWithValue(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const update = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (userData, { rejectWithValue }) => {
    const data = await updateUserApi(userData);
    if (!data?.success) return rejectWithValue(data);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuthentificaton',
  async (_, { dispatch, rejectWithValue }) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      dispatch(authChecked());
      return rejectWithValue('Нет токена');
    }
    try {
      const data = await getUserApi();
      dispatch(setUser(data.user));
      dispatch(authChecked());
      return data.user;
    } catch (err) {
      dispatch(authChecked());
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка';
      })
      .addCase(register.pending, (state) => {
        state.registerRequest = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerRequest = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerRequest = false;
        state.registerError = action.error.message || 'Ошибка';
      })
      .addCase(update.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateUserRequest = false;
        state.data = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserError = action.error.message || 'Ошибка';
      })

      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    userStateSelector: (state) => state,
    userAuthSelector: (state) => state.isAuthenticated,
    dataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const {
  userStateSelector,
  userAuthSelector,
  dataSelector,
  isAuthCheckedSelector
} = userSlice.selectors;
export const { setUser, userLogout, authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
