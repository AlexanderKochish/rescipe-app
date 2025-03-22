import { Link } from 'react-router-dom'
import cartImg from '../../../assets/add-to-cart-8.png'
import { Meal } from '../../../utils/types'

type Props = {
    cart: Meal[]
}

const Cart = ({ cart }: Props) => {
    return (
        <div className="fixed bottom-10 right-10 z-50">
            <Link to="/cart" state={{ cart }}>
                <button className="p-2 rounded-[50%] bg-blue-500 text-white cursor-pointer hover:bg-blue-400 duration-150">
                    <img src={cartImg} alt="cart icon" className="w-10 h-10" />
                    <span className="absolute rounded-[50%] top-0 right-[-2] px-[6px] bg-red-600 text-sm">
                        {cart.length}
                    </span>
                </button>
            </Link>
        </div>
    )
}

export default Cart
