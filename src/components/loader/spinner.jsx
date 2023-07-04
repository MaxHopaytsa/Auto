const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="mb-2 w-24 h-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <p className="text-blue-900 text-lg animate-pulse">Loading...</p>
        </div>
    )
}

export default Spinner
