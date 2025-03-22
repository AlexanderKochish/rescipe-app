import { useQuery } from '@tanstack/react-query'
import RecipeCard from '../../components/RecipeCard'
import { useState } from 'react'
import { getAllCategories, getAllRecipes } from '../../api/api'
import { Meal } from '../../utils/types'
import useSearchFilter from '../../hooks/useSearchFilter'
import usePagination from '../../hooks/usePagination'
import PreLoader from '../../components/UI/PreLoader/PreLoader'
import ViewPagination from '../../components/UI/ViewPagination/ViewPagination'
import toast from 'react-hot-toast'
import Cart from '../../components/UI/Cart/Cart'

const RecipesPage = () => {
    const {
        debounceValue,
        selectedCategory,
        search,
        setSearch,
        setSelectedCategory,
        setPage,
    } = useSearchFilter()
    const [cart, setCart] = useState<Meal[]>([])

    const { data, isLoading, error } = useQuery({
        queryKey: ['recipes', debounceValue, 'categories'],
        queryFn: async () => {
            const meals = await getAllRecipes(debounceValue)
            const categories = await getAllCategories()
            return { meals, categories }
        },
    })

    const filteredMeals =
        data?.meals.filter((meal) => {
            if (!selectedCategory) return true
            return meal.strCategory === selectedCategory
        }) || []

    const addToCart = (meal: Meal) => {
        const isRecipeInCart = cart.some((item) => item.idMeal === meal.idMeal)

        if (!isRecipeInCart) {
            setCart([...cart, meal])
            toast.success('Recipe successfully added to cart')
        } else {
            toast.error('This recipe has already been added to your cart.')
        }
    }

    const {
        currPage,
        totalPages,
        currentItems,
        nextPage,
        prevPage,
        setCurrPage,
        pages,
    } = usePagination(filteredMeals, 4)
    if (isLoading) return <PreLoader />
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <Cart cart={cart} />
            <input
                type="search"
                placeholder="Search recipe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border rounded my-2 outline-blue-500"
            />

            <ul className="w-full flex flex-wrap space-x-2 space-y-2">
                <li>
                    <button
                        onClick={() => setSelectedCategory('')}
                        className="px-2 py-1 bg-gray-200 cursor-pointer hover:bg-gray-300 duration-300"
                    >
                        All
                    </button>
                </li>
                {data?.categories &&
                    data?.categories.map((c) => (
                        <li className="text-black" key={c.idCategory}>
                            <button
                                onClick={() =>
                                    setSelectedCategory(c.strCategory)
                                }
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

            <ViewPagination
                currPage={currPage}
                filteredMeals={filteredMeals}
                nextPage={nextPage}
                pages={pages}
                prevPage={prevPage}
                setCurrPage={setCurrPage}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default RecipesPage
