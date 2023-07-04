import { useCallback, useState } from "react"

const usePagination = (itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1)

    const onPage = useCallback((pageNumber) => {
        setCurrentPage(pageNumber)
    }, [])

    const applyPagination = useCallback(
        (items) => {
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage

            const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
            const totalPages = Math.ceil(items.length / itemsPerPage)

            return {
                currentItems,
                currentPage,
                totalPages,
                onPage,
            }
        },
        [currentPage, itemsPerPage, onPage]
    )

    return applyPagination
}

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState)

    const toggle = () => {
        setState((prevState) => !prevState)
    }

    return [state, toggle]
}
export { usePagination, useToggle }
