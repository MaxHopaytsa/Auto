/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { addCar, updateCar } from "../../Redux/carsSlice"
import {
    CarFormInput,
    CarFormPriceInput,
    CarFormVinInput,
    CarFormYearInput,
} from "./carFormInput"
import { validateCarForm } from "./helper/validation"

const CarModal = memo(({ onCancel, isEditMode, car }) => {
    const [company, setCompany] = useState(car?.car || "")
    const [model, setModel] = useState(car?.car_model || "")
    const [vin, setVin] = useState(car?.car_vin || "")
    const [year, setYear] = useState(car?.car_model_year || "")
    const [color, setColor] = useState(car?.car_color || "")
    const [price, setPrice] = useState(car?.price || "")
    const [availability, setAvailability] = useState(car?.availability || false)
    const [validationErrors, setValidationErrors] = useState({})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        // Disable scrolling when the modal is open
        document.body.style.overflow = "hidden"

        // Re-enable scrolling when the modal is closed
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleSave = async (e) => {
        e.preventDefault()

        const carData = {
            car_color: color,
            price: price,
            availability: availability,
        }

        const errors = validateCarForm({
            company,
            model,
            vin,
            year,
            color,
            price,
        })

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        setIsLoading(true)

        try {
            switch (isEditMode) {
                case true:
                    await dispatch(updateCar({ carId: car.id, ...carData }))
                    setIsLoading(false)
                    onCancel()
                    break
                case false:
                    carData.id = nanoid()
                    carData.car = company
                    carData.car_model = model
                    carData.car_vin = vin
                    carData.car_model_year = year
                    await dispatch(addCar(carData))
                    setIsLoading(false)
                    onCancel()
                    break
                default:
                    setIsLoading(false)
                    onCancel()
                    break
            }
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
    }

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target

        setter(value)

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }))
    }

    const handleClose = () => {
        if (!isLoading) {
            onCancel()
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-84 shadow-xl">
                <h3 className="text-lg dark:text-white font-semibold mb-4">
                    {isEditMode ? "Edit Car" : "Add Car"}
                </h3>
                <form onSubmit={handleSave}>
                    <CarFormInput
                        name="company"
                        value={company}
                        placeholder="Car manufacturing company"
                        onChange={(e) => handleInputChange(e, setCompany)}
                        error={validationErrors.company}
                        readOnly={isEditMode}
                    />
                    <CarFormInput
                        name="model"
                        value={model}
                        placeholder="Car model"
                        onChange={(e) => handleInputChange(e, setModel)}
                        error={validationErrors.model}
                        readOnly={isEditMode}
                    />
                    <CarFormVinInput
                        value={vin}
                        onChange={(value) =>
                            handleInputChange(
                                { target: { name: "vin", value } },
                                setVin
                            )
                        }
                        error={validationErrors.vin}
                        readOnly={isEditMode}
                    />
                    <CarFormYearInput
                        value={year}
                        onChange={(value) =>
                            handleInputChange(
                                { target: { name: "year", value } },
                                setYear
                            )
                        }
                        error={validationErrors.year}
                        readOnly={isEditMode}
                    />
                    <CarFormInput
                        name="color"
                        value={color}
                        onChange={(e) => handleInputChange(e, setColor)}
                        placeholder="Car color"
                        error={validationErrors.color}
                    />
                    <CarFormPriceInput
                        value={price}
                        onChange={(value) =>
                            handleInputChange(
                                { target: { name: "price", value } },
                                setPrice
                            )
                        }
                        onInput={(e) => {
                            if (!e.target.value.startsWith("$")) {
                                e.target.value = "$" + e.target.value
                            }
                        }}
                        error={validationErrors.price}
                    />
                    <label className="block mb-2 dark:text-white">
                        Availability:
                        <select
                            name="availability"
                            value={availability}
                            onChange={(e) =>
                                setAvailability(e.target.value === "true")
                            }
                            className="border dark:text-black  border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                        >
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </label>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 mr-2 text-sm text-gray-600 dark:text-white hover:text-gray-800"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-500 mt-4">
                            Error occurred while saving the car.
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
})

export default CarModal
