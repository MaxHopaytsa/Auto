import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchCars,
    selectAllCarsMemoized,
    selectSortedCars,
} from "../Redux/carsSlice"
import RenderActionsDropdown from "../components/dropdown/dropdown"
import Pagination from "../components/pagination/pagination"
import Search from "../components/search/search"
import { usePagination, useToggle } from "../hooks/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import CarModal from "../components/modal/modal"
import Spinner from "../components/loader/spinner"
import { HomeIcon, FunnelIcon } from "@heroicons/react/24/outline"
import FilterSidebar from "../components/filter/filterSidebar"
import { toggleTheme } from "../utils/themeUtils"

const CarsTable = () => {
    const dispatch = useDispatch()
    const { cars, status, error } = useSelector(selectAllCarsMemoized)
    const sortedCars = useSelector(selectSortedCars)
    const applyPagination = usePagination(18)
    const [searchQuery, setSearchQuery] = useState("")
    const [openDropdownId, setOpenDropdownId] = useState(false)
    const [isModalOpenAdd, toggleModalOpenAdd] = useToggle()
    const [isFilterOpen, toggleFilterOpen] = useToggle()
    //filtering cars for search
    const filteredCars = sortedCars.filter((car) =>
        Object.values(car).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    )

    const {
        currentItems: currentCars,
        totalPages,
        currentPage,
        onPage,
    } = applyPagination(filteredCars)

    //getting all the cars
    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchCars())
        }
    }, [cars.length, dispatch])

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "succeeded") {
            const params = new URLSearchParams(location.search)
            const page = parseInt(params.get("page"))
            const query = params.get("q")

            if (location.search === "") {
                navigate("/?page=1")
            } else if (page && page >= 1 && page <= totalPages) {
                onPage(page)
            } else if (searchQuery) {
                navigate(`?q=${encodeURIComponent(searchQuery)}&page=1`)
            } else {
                throw new Error("Page not found.")
            }

            if (query && query !== searchQuery) {
                setSearchQuery(query)
            }
        }
    }, [status, totalPages, onPage, searchQuery, location.search, navigate])

    const handlePageChange = useCallback(
        (pageNumber) => {
            onPage(pageNumber)
            setOpenDropdownId(false)
            if (searchQuery) {
                navigate(
                    `?q=${encodeURIComponent(searchQuery)}&page=${pageNumber}`
                )
            } else {
                navigate(`?page=${pageNumber}`)
            }
        },
        [onPage, setOpenDropdownId, navigate, searchQuery]
    )

    const handleSearch = useCallback(
        (query) => {
            setSearchQuery(query)
            setOpenDropdownId(false)
            onPage(1)
            navigate(`?q=${encodeURIComponent(query)}&page=1`)
        },
        [setSearchQuery, setOpenDropdownId, onPage, navigate]
    )

    const handleDropdownToggle = useCallback(
        (carId) => {
            setOpenDropdownId((prevId) => (prevId === carId ? false : carId))
        },
        [setOpenDropdownId]
    )

    if (status === "loading") {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    if (status === "failed") {
        throw new Error(`Error: ${error}`)
    }

    let tableContent
    if (filteredCars.length === 0) {
        tableContent = (
            <tr>
                <td colSpan="8" className="px-4 py-2 text-center">
                    Car not found.
                </td>
            </tr>
        )
    } else {
        // eslint-disable-next-line no-unused-vars
        tableContent = currentCars.map((car) => (
            <tr
                key={car.id}
                className={`border-b border-gray-300 ${
                    car.availability ? "" : "bg-gray-200 dark:bg-gray-500"
                }`}
            >
                <td className="px-4 py-2 text-center">{car.car}</td>
                <td className="px-4 py-2 text-center">{car.car_model}</td>
                <td className="px-4 py-2 text-center">{car.car_vin}</td>
                <td className="px-4 py-2 text-center">{car.car_color}</td>
                <td className="px-4 py-2 text-center">{car.car_model_year}</td>
                <td className="px-4 py-2 text-center">{car.price}</td>
                <td className="px-4 py-2 text-center">
                    {car.availability ? "Available" : "Not Available"}
                </td>
                <td className="px-4 py-2 text-center ">
                    <RenderActionsDropdown
                        isOpenDropdown={openDropdownId === car.id}
                        handleDropdownToggle={() =>
                            handleDropdownToggle(car.id)
                        }
                        carId={car.id}
                    />
                </td>
            </tr>
        ))
    }

    const handleHomeClick = () => {
        window.location.href = "/"
    }

    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center mr-2">
                    <button
                        className="rounded-full bg-blue-900 "
                        onClick={handleHomeClick}
                    >
                        <HomeIcon className="h-5 w-5 text-white" />
                    </button>
                </div>
                <Search
                    query={searchQuery}
                    onSearch={(event) => handleSearch(event)}
                />
                <button
                    className="font-semibold py-2 px-4 ml-2 bg-blue-900 dark:bg-orange-600 rounded-full"
                    onClick={toggleFilterOpen}
                >
                    <FunnelIcon className="h-5 w-5 text-white" />
                </button>
            </div>

            {isFilterOpen && (
                <div className="relative z-10">
                    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50" />
                    <div className="absolute top-0 bottom-0 right-0">
                        <FilterSidebar
                            isOpen={isFilterOpen}
                            onClose={toggleFilterOpen}
                        />
                    </div>
                </div>
            )}
            <div className="flex-grow overflow-y-auto ">
                <table className="w-full mx-auto dark:text-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Model</th>
                            <th className="px-4 py-2">VIN</th>
                            <th className="px-4 py-2">Color</th>
                            <th className="px-4 py-2">Year</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Availability</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tableContent}</tbody>
                </table>
            </div>
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 mb-4 mx-auto"
                onClick={toggleModalOpenAdd}
            >
                Add Car
            </button>
            {isModalOpenAdd && (
                <CarModal
                    onCancel={() => toggleModalOpenAdd()}
                    isEditMode={false}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-4"
            />

            <div className="fixed bottom-0 right-0 p-4 ">
                <button
                    className="dark:bg-orange-600 bg-blue-900 text-white"
                    onClick={toggleTheme}
                >
                    Switch Theme
                </button>
            </div>
        </div>
    )
}

export default CarsTable
