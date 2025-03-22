import { Link } from 'react-router-dom'
import errorImg from '../../assets/oops-404-error-with-broken-robot-concept-illustration_114360-5529.avif'

const NotFoundPage = () => {
    return (
        <div className="w-full flex items-center justify-center flex-col container relative">
            <img
                src={errorImg}
                alt="error image"
                className="sm:w-[325px] sm:h-[325px] md:w-[625px] md:h-[625px]"
            />
            <p className="absolute bottom-2 text-2xl my-2">
                Back to{' '}
                <Link
                    to={'/'}
                    className="text-blue-600 hover:underline decoration-1 font-bold"
                >
                    Home
                </Link>
                !
            </p>
        </div>
    )
}

export default NotFoundPage
