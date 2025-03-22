import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../../api/api'
import PreLoader from '../../components/UI/PreLoader/PreLoader'

const RecipePage = () => {
    const { id } = useParams()
    const {
        data: meal,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <PreLoader />
    if (error)
        return <p className="text-center text-red-500">Error loading recipe</p>
    if (!meal) return <p className="text-center">Recipe not found</p>

    return (
        <div className=" max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
            <img
                className="w-full rounded-lg mb-4"
                src={meal.strMealThumb}
                alt={meal.strMeal}
            />
            <p className="text-gray-700">
                <strong>Category:</strong> {meal.strCategory}
            </p>
            <p className="text-gray-700">
                <strong>Traditional cuisine:</strong> {meal.strArea}
            </p>
            <p className="mt-4">{meal.strInstructions}</p>
            <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-blue-500 underline"
            >
                Watch on YouTube
            </a>
        </div>
    )
}

export default RecipePage
