import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="bg-orange-500 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    🍽 MyRecipes
                </Link>
            </div>
        </nav>
    )
}

export default Header
