import {
  initialState,
  loginUser,
  update,
  userSlice,
  register,
  checkUserAuth,
  logoutUser
} from '../userSlice';

const mockUser = {
  email: 'example@example.ru',
  name: 'exampleName'
};

const mockLogin = {
  email: 'example@example.ru',
  password: 'password'
};

const mockRegister = {
  email: 'example@example.ru',
  name: 'exampleName',
  password: 'password'
};

describe('Тестирование Login User', () => {
  test('loginUser pending ', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.pending('pending', mockLogin)
    );
    expect(state.loginUserError).toBe(undefined);
    expect(state.loginUserRequest).toBe(true);
  });

  test('loginUser fulfilled ', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.fulfilled(mockUser, 'fulfilled', mockLogin)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('loginUser rejected', () => {
    const error = new Error('Ошибка авторизации');
    const state = userSlice.reducer(
      initialState,
      loginUser.rejected(error, 'requestId', mockLogin)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe('Ошибка авторизации');
  });
});

describe('Тестирование register', () => {
  test('register pending ', () => {
    const state = userSlice.reducer(
      initialState,
      register.pending('pending', mockRegister)
    );
    expect(state.registerRequest).toBe(true);
    expect(state.registerError).toBeNull();
  });

  test('register fulfilled ', () => {
    const state = userSlice.reducer(
      initialState,
      register.fulfilled(mockUser, 'fulfilled', mockRegister)
    );
    expect(state.registerRequest).toBe(false);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  test('register rejected', () => {
    const error = new Error('Ошибка регистрации');
    const state = userSlice.reducer(
      initialState,
      register.rejected(error, 'requestId', mockRegister)
    );

    expect(state.registerRequest).toBe(false);
    expect(state.registerError).toBe('Ошибка регистрации');
  });
});

describe('Тестирование update', () => {
  test('update pending ', () => {
    const state = userSlice.reducer(
      initialState,
      update.pending('pending', mockUser)
    );
    expect(state.updateUserError).toBeNull();
    expect(state.updateUserRequest).toBe(true);
  });

  test('update fulfilled ', () => {
    const state = userSlice.reducer(
      initialState,
      update.fulfilled(mockUser, 'fulfilled', mockUser)
    );
    expect(state.updateUserRequest).toBe(false);
    expect(state.data).toEqual(mockUser);
  });

  test('update rejected', () => {
    const error = new Error('Ошибка обновления данных');
    const state = userSlice.reducer(
      initialState,
      update.rejected(error, 'requestId', mockUser)
    );

    expect(state.updateUserRequest).toBe(false);
    expect(state.updateUserError).toBe('Ошибка обновления данных');
  });
});

describe('Тестирование checkUserAuth', () => {
  test('checkUserAuth fulfilled ', () => {
    const state = userSlice.reducer(
      initialState,
      checkUserAuth.fulfilled(mockUser, 'fulfilled')
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.data).toBeNull();
  });

  test('checkUserAuth rejected', () => {
    const error = new Error('Ошибка проверки аутентификации');
    const state = userSlice.reducer(
      initialState,
      checkUserAuth.rejected(error, 'requestId')
    );
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование logout', () => {
  test('logoutUser fulfilled ', () => {
    const stateWithUser = {
      ...initialState,
      data: mockUser,
      isAuthenticated: true,
      isAuthChecked: false
    };

    const state = userSlice.reducer(
      stateWithUser,
      logoutUser.fulfilled(undefined, 'fulfilled')
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.data).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});