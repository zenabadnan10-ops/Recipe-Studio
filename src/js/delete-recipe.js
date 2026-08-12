import { renderRecipes } from "./add-recipe.js";

const deleteBtn = document.getElementById("delete-recipe-btn");
const viewDialog = document.getElementById("view-recipe-dialog");

const deleteRecipe = (id) => {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    recipes = recipes.filter(recipe => Number(recipe.id) !== Number(id));
    favorites = favorites.filter(recipe => Number(recipe.id) !== Number(id));

    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderRecipes();
}

deleteBtn.addEventListener("click", () => {
    const recipeId = Number(deleteBtn.dataset.id);
    deleteRecipe(recipeId);
    viewDialog.close();
})