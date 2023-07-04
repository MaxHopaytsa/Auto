/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { setAvailabilityFilter, setSortBy } from "../../Redux/carsSlice"
import { useEffect, useState } from "react"

const FilterSidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const sortBy = useSelector((state) => state.sortBy)
    const availabilityFilter = useSelector((state) => state.availabilityFilter)
    const [availabilityChecked, setAvailabilityChecked] = useState(
        availabilityFilter !== null
    )
    const [selectedSortBy, setSelectedSortBy] = useState(sortBy)
    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value))
    }
    const handleAvailabilityFilter = (e) => {
        const newFilter = e.target.checked ? "available" : null
        dispatch(setAvailabilityFilter(newFilter))
    }
    //resetting the filter settings
    const handleResetFilters = () => {
        setSelectedSortBy(null)
        setAvailabilityChecked(null)
        dispatch(setSortBy(null))
        dispatch(setAvailabilityFilter(null))
    }

    useEffect(() => {
        setAvailabilityChecked(availabilityFilter !== null)
        setSelectedSortBy(sortBy)
    }, [availabilityFilter, sortBy])

    const handleClose = () => {
        onClose()
    }

    return (
        <div
            className={`fixed top-0 right-0 bottom-0 bg-white dark:bg-gray-900 w-64 p-4 transition-transform duration-300 transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Sort By:
                </h3>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="radio"
                        name="sort"
                        value="alphabetical"
                        className="mr-2"
                        checked={selectedSortBy === "alphabetical"}
                        onChange={handleSortChange}
                    />
                    Alphabetical Order (Company and Model)
                </label>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Year:
                </h3>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="radio"
                        name="sort"
                        value="newest"
                        className="mr-2"
                        checked={selectedSortBy === "newest"}
                        onChange={handleSortChange}
                    />
                    Newest to Oldest
                </label>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="radio"
                        name="sort"
                        value="oldest"
                        className="mr-2"
                        checked={selectedSortBy === "oldest"}
                        onChange={handleSortChange}
                    />
                    Oldest to Newest
                </label>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Price:
                </h3>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="radio"
                        name="sort"
                        value="lowest"
                        className="mr-2"
                        checked={selectedSortBy === "lowest"}
                        onChange={handleSortChange}
                    />
                    Lowest to Highest
                </label>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="radio"
                        name="sort"
                        value="highest"
                        className="mr-2"
                        checked={selectedSortBy === "highest"}
                        onChange={handleSortChange}
                    />
                    Highest to Lowest
                </label>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Availability:
                </h3>
                <label className="flex items-center mb-2 dark:text-white">
                    <input
                        type="checkbox"
                        name="availability"
                        value="available"
                        className="mr-2"
                        checked={availabilityChecked}
                        onChange={handleAvailabilityFilter}
                    />
                    Available Cars Only
                </label>
            </div>
            <button
                onClick={handleResetFilters}
                className="bg-gray-200 dark:bg-indigo-600 dark:text-white text-gray-700 py-1 px-3 rounded-md mt-4"
            >
                Reset Filters
            </button>
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 dark:bg-indigo-600 dark:text-white bg-gray-200 rounded-md p-1"
            >
                Close
            </button>
        </div>
    )
}

export default FilterSidebar
