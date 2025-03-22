import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const usePagination = <T,>(data: T[], itemsPerPage: number) => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const [currPage, setCurrPage] = useState(
        Number(searchParams.get('page')) || 1,
    )

    const totalPages = data.length ? Math.ceil(data.length / itemsPerPage) : 0

    const startIndex = (currPage - 1) * itemsPerPage
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage)

    const nextPage = () => setCurrPage((prev) => Math.min(prev + 1, totalPages))
    const prevPage = () => setCurrPage((prev) => Math.max(prev - 1, 1))

    const pages = useMemo(() => {
        if (totalPages <= 5)
            return Array.from({ length: totalPages }, (_, i) => i + 1)

        if (currPage <= 3) return [1, 2, 3, '...', totalPages]
        if (currPage >= totalPages - 2)
            return [1, '...', totalPages - 2, totalPages - 1, totalPages]

        return [
            1,
            '...',
            currPage - 1,
            currPage,
            currPage + 1,
            '...',
            totalPages,
        ]
    }, [currPage, totalPages])

    return {
        currPage,
        totalPages,
        currentItems,
        nextPage,
        prevPage,
        setCurrPage,
        pages,
    }
}

export default usePagination
