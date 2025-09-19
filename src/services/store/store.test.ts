import store, { rootReducer } from "./store"

describe('Тестирование rootReducer', () => {
  test('проверка начального состояния', () =>{
    const type = { type: 'UNKNOWN_ACTION' }
    const actualState = store.getState();
    const testingState = rootReducer(undefined, type)

    expect(actualState).toEqual(testingState)
  })
})