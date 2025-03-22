import { Link } from 'react-router-dom'

type Props = {
    id: string
    image: string | null
    recipeName: string | null
    decsription?: string | null
}

const RecipeCard = ({ image, recipeName, id }: Props) => {
    return (
        <div className="bg-white">
            <div className="mx-auto sm:px-3 sm:py-2 lg:max-w-4xl">
                <Link to={`/recipe/${id}`}>
                    <div className="mt-4">
                        <figure className="group relative">
                            {image ? (
                                <img
                                    src={image}
                                    alt="recipe image"
                                    loading="lazy"
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                            ) : null}
                            <figcaption className="mt-2 flex text-xl justify-between">
                                {recipeName}
                            </figcaption>
                        </figure>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default RecipeCard
