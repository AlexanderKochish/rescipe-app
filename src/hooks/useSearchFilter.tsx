import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from './useDebounce'

const useSearchFilter = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const debounceValue = useDebounce({ value: search, delay: 1000 });

    useEffect(() => {
        const newParams = new URLSearchParams()

        if(selectedCategory) {
            newParams.set('category', selectedCategory)
        }

        if(debounceValue){
            newParams.set('search', debounceValue)
        }

        navigate(`?${newParams.toString()}`)
    }, [debounceValue, selectedCategory, navigate])
  return {debounceValue,search, setSearch, selectedCategory, setSelectedCategory}
}

export default useSearchFilter
