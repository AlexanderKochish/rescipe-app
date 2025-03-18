import { Meal } from "../../utils/types";

type Props = {
  meal: Meal;
};

const CartItem = ({ meal }: Props) => {
  return (
    <li className="flex space-x-4 items-center">
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
  );
};

export default CartItem;
