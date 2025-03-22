import { useLocation } from 'react-router-dom'
import { Meal } from '../../utils/types'
import CartItem from '../../components/CartItem/Cart.Item'

const CartPage = () => {
    const location = useLocation()
    const cart: Meal[] = location.state?.cart || []

    const calculateIngredients = () => {
        const allIngredients: string[] = []

        cart.forEach((meal) => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}` as keyof Meal]
                const measure = meal[`strMeasure${i}` as keyof Meal]

                if (ingredient) {
                    const all = new Map()
                    all.set(ingredient, measure)

                    const numericPart = parseFloat(measure || '')
                    const isNumber = !isNaN(numericPart)

                    const result = isNumber ? numericPart * 2 : measure
                    allIngredients.push(
                        `${ingredient} - ${typeof result === 'number' ? `${result}${measure?.replace(/^\d+(\s\d+\/\d+|\.\d+|\/\d+)?|\d+$/g, '')}` : 'Pinch'}`,
                    )
                }
            }
        })

        return allIngredients
    }

    const ingredients = calculateIngredients()

    return (
        <div>
            <h1>Cart</h1>

            {cart.length > 0 ? (
                <div>
                    <h2 className="font-bold">Selected recipes:</h2>
                    <ul className="flex flex-wrap gap-2 w-full">
                        {cart.map((meal) => (
                            <CartItem meal={meal} key={meal.idMeal} />
                        ))}
                    </ul>

                    <h3 className="mt-6 font-bold">
                        Ingredients required for selected recipes:
                    </h3>
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
    )
}

export default CartPage
