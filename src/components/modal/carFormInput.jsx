/* eslint-disable react/prop-types */
const CarFormInput = ({
    name,
    value,
    placeholder,
    onChange,
    error,
    readOnly,
}) => {
    return (
        <div>
            <label className="block mb-2 dark:text-white">
                {name.charAt(0).toUpperCase() + name.slice(1)}:
                <input
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`border dark:text-black border-gray-300 rounded-md px-3 py-2 mt-1 w-full ${
                        error ? "border-red-500" : ""
                    }`}
                    readOnly={readOnly}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
        </div>
    )
}

const CarFormVinInput = ({ value, onChange, error, readOnly }) => {
    const handleInputChange = (e) => {
        const { value } = e.target
        onChange(value.toUpperCase())
    }

    return (
        <div>
            <label className="block mb-2 dark:text-white">
                VIN:
                <input
                    type="text"
                    value={value}
                    placeholder="Vehicle identification number"
                    onChange={handleInputChange}
                    className={`border dark:text-black border-gray-300 rounded-md px-3 py-2 mt-1 w-full ${
                        error ? "border-red-500" : ""
                    }`}
                    readOnly={readOnly}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
        </div>
    )
}

const CarFormPriceInput = ({ value, onChange, onInput, error }) => {
    const handleInputChange = (e) => {
        let { value } = e.target

        const regex = /^\$?\d*\.?\d*$/
        if (value === "$") {
            onChange("")
        } else if (value === "" || regex.test(value)) {
            onChange(value)
        }
    }

    return (
        <div>
            <label className="block mb-2 dark:text-white">
                Price:
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onInput={onInput}
                    placeholder="Specify the price only in dollars"
                    className={`border dark:text-black border-gray-300 rounded-md px-3 py-2 mt-1 w-full ${
                        error ? "border-red-500" : ""
                    }`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
        </div>
    )
}

const CarFormYearInput = ({ value, onChange, error, readOnly }) => {
    const handleInputChange = (e) => {
        const { value } = e.target
        onChange(value)
    }

    return (
        <div>
            <label className="block mb-2">
                Year:
                <input
                    type="number"
                    value={value}
                    min={1910}
                    max={2023}
                    placeholder="Year of production (1910-2023)"
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md px-3 py-2 mt-1 w-full ${
                        error ? "border-red-500" : ""
                    }`}
                    readOnly={readOnly}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
        </div>
    )
}

export { CarFormInput, CarFormVinInput, CarFormYearInput, CarFormPriceInput }
