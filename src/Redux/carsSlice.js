import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (_, { getState }) => {
        const state = getState()
        if (Object.keys(state.entities).length > 0) {
            return Object.values(state.entities)
        }

        try {
            const response = await fetch("https://myfakeapi.com/api/cars/")
            const data = await response.json()
            return data.cars
        } catch (error) {
            throw Error("Error fetching cars: " + error)
        }
    }
)

const carsSlice = createSlice({
    name: "cars",
    initialState: {
        entities: {},
        status: "idle",
        error: null,
        sortBy: null,
        availabilityFilter: null,
    },
    reducers: {
        addCar: (state, action) => {
            const car = action.payload
            state.entities[car.id] = car
        },
        removeCar: (state, action) => {
            const carId = action.payload
            delete state.entities[carId]
        },
        updateCar: (state, action) => {
            const { carId, car_color, price, availability } = action.payload
            const car = state.entities[carId]
            if (car) {
                car.car_color = car_color
                car.price = price
                car.availability = availability
            }
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setAvailabilityFilter: (state, action) => {
            state.availabilityFilter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCars.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchCars.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.entities = {}
            action.payload.forEach((car) => {
                state.entities[car.id] = car
            })
        })
        builder.addCase(fetchCars.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    },
})

export const {
    addCar,
    removeCar,
    updateCar,
    setSortBy,
    setAvailabilityFilter,
} = carsSlice.actions

export const selectAllCars = (state) => Object.values(state.entities)
export const selectCarById = (state, carId) => state.entities[carId]
//memorized selector for retrieving all car data
export const selectAllCarsMemoized = createSelector(
    [selectAllCars, (state) => state.status, (state) => state.error],
    (cars, status, error) => ({
        cars,
        status,
        error,
    })
)
//a memoized selector that describes the logic of sorting by the corresponding sort types and returns the sorted cars
export const selectSortedCars = createSelector(
    [
        selectAllCars,
        (state) => state.sortBy,
        (state) => state.availabilityFilter,
    ],
    (cars, sortBy, availabilityFilter) => {
        let sortedCars = [...cars]

        switch (sortBy) {
            case "alphabetical":
                sortedCars.sort((a, b) =>
                    `${a.car} ${a.car_model}`.localeCompare(
                        `${b.car} ${b.car_model}`
                    )
                )
                break
            case "newest":
                sortedCars.sort((a, b) => b.car_model_year - a.car_model_year)
                break
            case "oldest":
                sortedCars.sort((a, b) => a.car_model_year - b.car_model_year)
                break
            case "lowest":
                sortedCars.sort(
                    (a, b) =>
                        parseFloat(a.price.slice(1)) -
                        parseFloat(b.price.slice(1))
                )
                break
            case "highest":
                sortedCars.sort(
                    (a, b) =>
                        parseFloat(b.price.slice(1)) -
                        parseFloat(a.price.slice(1))
                )
                break
            default:
                break
        }

        if (availabilityFilter === "available") {
            sortedCars = sortedCars.filter((car) => car.availability)
        }
        return sortedCars
    }
)

export default carsSlice.reducer
