import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import { useNavigate } from 'react-router-dom';

import { createOrder, clearOrderModal } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/constructorSlice';
import { constructorSelector } from '../../services/slices/constructorSlice';
import {
  orderRequestSelector,
  orderDataSelector
} from '../../services/slices/orderSlice';
import { userAuthSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(constructorSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderDataSelector);
  const isAuth = useSelector(userAuthSelector);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredients))
      .unwrap()
      .then(() => {
        dispatch(resetConstructor());
      })
      .catch((err) => console.error(err));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
