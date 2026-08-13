import { renderRecipes } from "./add-recipe.js";

const viewAllBtn = document.getElementById("view-all-btn");

viewAllBtn?.addEventListener("click", () => {
    renderRecipes(); 
});

document.getElementById("reset-filter").addEventListener("click", () => {
    document.getElementById("filter").value = "all";
    renderRecipes();
});