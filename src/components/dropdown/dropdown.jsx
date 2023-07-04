/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useToggle } from "../../hooks/hooks"
import { selectCarById } from "../../Redux/carsSlice"
import ModalDelete from "../modal/modalDelete"
import CarModal from "../modal/modal"
import { memo } from "react"
const RenderActionsDropdown = memo(
    ({ carId, isOpenDropdown, handleDropdownToggle }) => {
        const car = useSelector((state) => selectCarById(state, carId))
        const [isModalOpenEdit, toggleModalOpenEdit] = useToggle()
        const [isModalOpenDelete, toggleModalOpenDelete] = useToggle()

        return (
            <div className="relative inline-block text-left">
                <button
                    type="button"
                    className="inline-flex justify-center items-center px-4 py-2 dark:bg-indigo-600 dark:text-white border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleDropdownToggle}
                >
                    Actions
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 0 0-1 1v1.586L6.707 5.293a1 1 0 0 0-1.414 1.414l3.707 3.707a1 1 0 0 0 1.414 0l3.707-3.707a1 1 0 0 0-1.414-1.414L11 5.586V4a1 1 0 0 0-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {isOpenDropdown && (
                    <div className="absolute right-0 z-10 mt-2 w-full rounded-md shadow-lg  dark:bg-indigo-600 bg-white ring-1 ring-black ring-opacity-5 ">
                        <button
                            className="block px-4 py-2 w-full text-sm text-gray-700 dark:bg-orange-600 dark:text-white hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => {
                                toggleModalOpenDelete()
                                handleDropdownToggle(false)
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="block px-4 py-2  w-full text-sm text-gray-700 dark:bg-orange-600 dark:text-white hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => {
                                toggleModalOpenEdit()
                                handleDropdownToggle(false)
                            }}
                        >
                            Edit
                        </button>
                    </div>
                )}
                {isModalOpenDelete && (
                    <ModalDelete
                        onCancel={() => toggleModalOpenDelete()}
                        car={car}
                    />
                )}
                {isModalOpenEdit && (
                    <CarModal
                        onCancel={() => toggleModalOpenEdit()}
                        isEditMode={true}
                        car={car}
                    />
                )}
            </div>
        )
    }
)

export default RenderActionsDropdown
