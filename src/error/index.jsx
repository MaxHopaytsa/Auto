import { useRouteError, useNavigate } from "react-router-dom"
//a component for displaying errors that will be visible to the user
export default function ErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()

    const handleReload = () => {
        window.location.reload()
    }

    const handleGoHome = () => {
        navigate("/")
    }

    console.error(error)

    return (
        <div
            id="error-page"
            className="flex flex-col items-center justify-center h-screen"
        >
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Oops!</h1>
            <p className="text-lg mb-2 dark:text-white">
                Sorry, an unexpected error has occurred.
            </p>
            <p className="text-sm mb-4 dark:text-white">
                <i>{error.statusText || error.message}</i>
            </p>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
                    onClick={handleReload}
                >
                    Reload
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleGoHome}
                >
                    Go Home
                </button>
            </div>
        </div>
    )
}
