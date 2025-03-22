const PreLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <svg
                className="animate-spin h-12 w-12 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8"></path>
            </svg>
        </div>
    )
}

export default PreLoader
