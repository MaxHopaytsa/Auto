/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { removeCar } from "../../Redux/carsSlice"

function ModalDelete({ onCancel, car }) {
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Disable scrolling when the modal is open
        document.body.style.overflow = "hidden"

        // Re-enable scrolling when the modal is closed
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleDelete = () => {
        setIsDeleting(true)

        // Simulate artificial delay for demonstration purposes
        setTimeout(() => {
            dispatch(removeCar(car.id))
                .then(() => {
                    setIsDeleted(true)
                })
                .catch((error) => {
                    setError(error)
                })
                .finally(() => {
                    setIsDeleting(false)
                })
        }, 2000)
    }

    if (isDeleted) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                <div className="bg-white rounded-lg p-6 w-64 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4">Success</h3>
                    <p className="mb-4">Deletion completed successfully.</p>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600"
                            onClick={onCancel}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                <div className="bg-white rounded-lg p-6 w-64 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4">Error</h3>
                    <p className="mb-4">Failed to delete the selected row.</p>
                    <p className="mb-4">Error message: {error.message}</p>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600"
                            onClick={onCancel}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-64 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Confirm Delete
                </h3>
                <p className="mb-4 dark:text-white">
                    Are you sure you want to delete the selected row?
                </p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 mr-2 text-sm text-gray-600 hover:text-gray-800"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete
