import { createCard } from "./add-recipe.js";
import { renderRecipes } from "./add-recipe.js";

const filter = document.getElementById("filter");
const recipeGrid = document.getElementById("recipe-grid");

const renderFilter = (option) => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipeGrid.innerHTML = "";

    if (option === "all") {
        renderRecipes();
        return;
    }

    const filteredRecipes = recipes.filter(
        (recipe) => recipe.category === option
    );

    filteredRecipes.forEach(element => {
        const card = createCard(element);
        recipeGrid.appendChild(card);
    });
}

filter.addEventListener("change", () => {
    renderFilter(filter.value);
})