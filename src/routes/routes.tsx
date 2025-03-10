import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RecipePage from "../pages/recipe/RecipePage";
import RecipesPage from "../pages/recipes/RecipesPage";
import CartPage from "../pages/cart/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <RecipesPage /> },
      { path: "/recipe/:id", element: <RecipePage /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);
