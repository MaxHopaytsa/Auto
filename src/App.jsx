import { useEffect } from "react"
import CarsTable from "./cars-table"
import { initializeTheme } from "./utils/themeUtils"
function App() {
    //initialization of the theme according to the last saved user's local storage
    useEffect(() => {
        initializeTheme()
    }, [])

    return (
        <div className="container mx-auto my-auto py-10 xl:px-20 ">
            <CarsTable />
        </div>
    )
}

export default App
