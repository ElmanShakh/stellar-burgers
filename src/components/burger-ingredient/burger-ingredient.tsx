import { FC, memo } from 'react';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from '../../services/store/store';
import { useLocation } from 'react-router-dom';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
