const validationRules = {
    company: {
        required: true,
        errorMessage: "Company is required",
    },
    model: {
        required: true,
        errorMessage: "Model is required",
    },
    vin: {
        required: true,
        errorMessage: "VIN is required",
    },
    year: {
        required: true,
        errorMessage: "Year is required",
    },
    color: {
        required: true,
        errorMessage: "Color is required",
    },
    price: {
        required: true,
        errorMessage: "Price is required",
    },
}
//checking form validation
export const validateCarForm = (data) => {
    const errors = {}

    for (const fieldName in validationRules) {
        const fieldRules = validationRules[fieldName]

        if (fieldRules.required && !data[fieldName]) {
            errors[fieldName] = fieldRules.errorMessage
        }
    }

    return errors
}
