import React from 'react'
import { Meal } from '../../../utils/types'

type Props = {
    currPage: number
    pages: (string | number)[]
    nextPage: () => void
    prevPage: () => void
    filteredMeals: Meal[]
    totalPages: number
    setPage: React.Dispatch<React.SetStateAction<string>>
    setCurrPage: React.Dispatch<React.SetStateAction<number>>
}

const ViewPagination = ({
    currPage,
    pages,
    nextPage,
    prevPage,
    filteredMeals,
    setPage,
    setCurrPage,
    totalPages,
}: Props) => {
    const handlePage = (p: number) => {
        setPage(String(p))
        setCurrPage(Number(p))
    }

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                onClick={prevPage}
                disabled={currPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
                {'<'}
            </button>

            {pages.map((p, index) => (
                <button
                    key={index}
                    onClick={() => typeof p === 'number' && handlePage(p)}
                    className={`px-3 py-1 rounded ${
                        currPage === p
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300'
                    }`}
                    disabled={p === '...'}
                >
                    {filteredMeals.length > 0 ? p : null}
                </button>
            ))}

            <button
                onClick={nextPage}
                disabled={currPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
                {'>'}
            </button>
        </div>
    )
}

export default ViewPagination
