import { useQuery } from "@tanstack/react-query";
import RecipeCard from "../../components/RecipeCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAllCategories, getAllRecipes } from "../../api/api";
import { Meal } from "../../utils/types";
import useSearchFilter from "../../hooks/useSearchFilter";
import usePagination from "../../hooks/usePagination";

const RecipesPage = () => {
  const {
    debounceValue,
    selectedCategory,
    search,
    setSearch,
    setSelectedCategory,
    setPage,
  } = useSearchFilter();
  const [cart, setCart] = useState<Meal[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", debounceValue, "categories"],
    queryFn: async () => {
      const meals = await getAllRecipes(debounceValue);
      const categories = await getAllCategories();
      return { meals, categories };
    },
  });

  const filteredMeals = data?.meals.filter((meal) => {
    if (!selectedCategory) return true;
    return meal.strCategory === selectedCategory;
  }) || [];

  const addToCart = (meal: Meal) => {
    const isRecipeInCart = cart.some((item) => item.idMeal === meal.idMeal);

    if (!isRecipeInCart) {
      setCart([...cart, meal]);
    } else {
      alert("This recipe has already been added to your cart.");
    }
  };

  const { currPage, totalPages, currentItems, nextPage, prevPage, setCurrPage, pages } = usePagination (filteredMeals, 4);
  if (isLoading) return <p className="font-bold text-2xl text-center">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePage = (p: number) => {
    setPage(String(p))
    setCurrPage(Number(p))
  }

  return (
    <div>
      <div className="fixed bottom-10 right-10 z-50">
        <Link to="/cart" state={{ cart }}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Go to cart ({cart.length})
          </button>
        </Link>
      </div>
      <input
        type="search"
        placeholder="Search recipe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded my-2"
      />

      <ul className="w-full flex flex-wrap space-x-2 space-y-2">
        <li>
          <button
            onClick={() => setSelectedCategory("")}
            className="px-2 py-1 bg-gray-200 cursor-pointer hover:bg-gray-300 duration-300"
          >
            All
          </button>
        </li>
        {data?.categories &&
          data?.categories.map((c) => (
            <li className="text-black" key={c.idCategory}>
              <button
                onClick={() => setSelectedCategory(c.strCategory)}
                className="px-2 py-1 bg-orange-200 cursor-pointer hover:bg-orange-300 duration-300"
              >
                {c.strCategory}
              </button>
            </li>
          ))}
      </ul>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(100px,1fr)] gap-4">
        {currentItems?.length ? (
          currentItems.map((r) => (
            <li className="w-full flex flex-col" key={r.idMeal}>
              <RecipeCard
                id={r.idMeal}
                image={r.strMealThumb}
                recipeName={r.strMeal}
              />
              <button
                onClick={() => addToCart(r)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to cart
              </button>
            </li>
          ))
        ) : (
          <p>There are no recipes for the selected category.</p>
        )}
      </ul>

      <div className="flex justify-center space-x-2 mt-4">
        <button onClick={prevPage} disabled={currPage === 1} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
          {"<"}
        </button>

        {pages.map((p, index) => (
          <button
            key={index}
            onClick={() => typeof p === "number" && handlePage(p)}
            className={`px-3 py-1 rounded ${
              currPage === p ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            disabled={p === "..."}
          >
            {filteredMeals.length > 0 ?  p : null}
          </button>
        ))}

        <button onClick={nextPage} disabled={currPage === totalPages} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default RecipesPage;
