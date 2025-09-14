import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';
import { feedOrderSelector } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(feedOrderSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
