import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store/store';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index === totalItems - 1) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleMoveUp = () => {
      if (index === 0) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
// import React, { FC, memo } from 'react';
// import { BurgerConstructorElementUI } from '@ui';
// import { BurgerConstructorElementProps } from './type';
// import { useDispatch } from '../../services/store/store';
// import {
//   removeIngredient,
//   moveIngredient
// } from '../../services/slices/constructorSlice';

// export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
//   ({ ingredient, index, totalItems }) => {
//     const dispatch = useDispatch();

//     const handleMoveUp = () => {
//       if (index <= 0) return;
//       dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
//     };

//     const handleMoveDown = () => {
//       if (index >= totalItems - 1) return;
//       dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
//     };

//     const handleClose = () => {
//       dispatch(removeIngredient(ingredient.id));
//     };

//     return (
//       <BurgerConstructorElementUI
//         ingredient={ingredient}
//         index={index}
//         totalItems={totalItems}
//         handleMoveUp={handleMoveUp}
//         handleMoveDown={handleMoveDown}
//         handleClose={handleClose}
//       />
//     );
//   }
// );
