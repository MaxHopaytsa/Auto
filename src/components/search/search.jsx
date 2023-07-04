/* eslint-disable react/display-name */
import { memo, useState } from "react"

// eslint-disable-next-line react/prop-types
const Search = memo(({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = () => {
        onSearch(searchQuery)
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleInputKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="flex items-center w-full">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                className="p-2 border border-gray-300 rounded-l-md flex-grow-0 w-full"
            />
            <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md"
            >
                Search
            </button>
        </div>
    )
})

export default Search
