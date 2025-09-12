import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { ingredientSelector } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientSelector);

  const { id } = useParams();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
