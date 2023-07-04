import { useEffect, useState } from "react"
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline"
// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [maxVisiblePages, setMaxVisiblePages] = useState(5)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            let visiblePages

            switch (true) {
                case screenWidth < 768:
                    visiblePages = 11
                    break
                case screenWidth < 1240:
                    visiblePages = 14
                    break
                case screenWidth < 1540:
                    visiblePages = 20
                    break
                default:
                    visiblePages = 23
                    break
            }

            setMaxVisiblePages(visiblePages)
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    const getVisiblePageNumbers = () => {
        const MIN_PAGES_BEFORE_CURRENT = Math.floor((maxVisiblePages - 1) / 2)
        const MIN_PAGES_AFTER_CURRENT = Math.ceil((maxVisiblePages - 1) / 2)

        let visiblePages = []

        if (totalPages <= maxVisiblePages) {
            visiblePages = pageNumbers
        } else {
            if (currentPage <= MIN_PAGES_BEFORE_CURRENT + 1) {
                visiblePages = [
                    ...pageNumbers.slice(0, maxVisiblePages - 1),
                    "...",
                ]
            } else if (currentPage >= totalPages - MIN_PAGES_AFTER_CURRENT) {
                visiblePages = [
                    "...",
                    ...pageNumbers.slice(totalPages - maxVisiblePages + 2),
                ]
            } else {
                const startPage = currentPage - MIN_PAGES_BEFORE_CURRENT
                const endPage = currentPage + MIN_PAGES_AFTER_CURRENT
                visiblePages = [
                    "...",
                    ...pageNumbers.slice(startPage, endPage),
                    "...",
                ]
            }
        }

        return visiblePages
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-200 dark:bg-black bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border dark:bg-indigo-600 dark:text-white border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border dark:bg-indigo-600 dark:text-white border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 dark:bg-indigo-600 dark:text-white  text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                            <span className="sr-only">First</span>
                            <ChevronDoubleLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 dark:bg-indigo-600 dark:text-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        {getVisiblePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                disabled={page === "..."}
                                className={`relative ${
                                    page === "..."
                                        ? "inline-flex items-center px-4 py-2 dark:bg-indigo-600 dark:text-white  text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                        : `z-10 inline-flex items-center  ${
                                              page === currentPage
                                                  ? "bg-indigo-600 dark:bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                  : "text-gray-900 dark:bg-indigo-600 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                                          }`
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 dark:bg-indigo-600 dark:text-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 dark:bg-indigo-600 dark:text-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                            <span className="sr-only">Last</span>
                            <ChevronDoubleRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination
