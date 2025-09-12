import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, RootState } from '../../services/store/store';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  fetchOrdersHistory,
  orderHistorySelector
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const orders: TOrder[] = useSelector(orderHistorySelector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
