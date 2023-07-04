export const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
}

export const initializeTheme = () => {
    const currentTheme = localStorage.getItem("theme")
    document.documentElement.classList.toggle("dark", currentTheme === "dark")
}
