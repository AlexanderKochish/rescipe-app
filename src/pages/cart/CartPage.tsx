import { useLocation } from "react-router-dom";
import { Meal } from "../../utils/types";

const CartPage = () => {
  const location = useLocation();
  const cart: Meal[] = location.state?.cart || [];

  const calculateIngredients = () => {
    const allIngredients: string[] = [];

    cart.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof Meal];
        const measure = meal[`strMeasure${i}` as keyof Meal];
        if (ingredient) {
          allIngredients.push(`${ingredient} - ${measure}`);
        }
      }
    });

    return allIngredients;
  };

  const ingredients = calculateIngredients();

  return (
    <div>
      <h1>Cart</h1>

      {cart.length > 0 ? (
        <div>
          <h2>Selected recipes:</h2>
          <ul>
            {cart.map((meal) => (
              <li key={meal.idMeal} className="flex space-x-4 items-center">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3>{meal.strMeal}</h3>
                  <p>Category: {meal.strCategory}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-6">Ingredients required for selected recipes:</h2>
          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <p>There are no ingredients to display.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Cart is empty. Select recipes to calculate ingredients.</p>
      )}
    </div>
  );
};

export default CartPage;
