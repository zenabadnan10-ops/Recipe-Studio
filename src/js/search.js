import { createCard } from "./add-recipe.js";

const recipeGrid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search-input");

const renderSearch = () => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipeGrid.innerHTML = "";

    const filteredRecipes = recipes.filter(
        (recipe) => (recipe.name.toLowerCase().includes(searchInput.value)) || (recipe.name === searchInput.value)
    );

    filteredRecipes.forEach(element => {
        const card = createCard(element);
        recipeGrid.appendChild(card);
    });
}

searchInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        renderSearch();
    }
})

document.getElementById("search-icon").addEventListener("click", () => {
    renderSearch();
})