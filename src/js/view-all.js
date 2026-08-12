import { renderRecipes } from "./add-recipe.js";

const viewAllBtn = document.getElementById("view-all-btn");

viewAllBtn?.addEventListener("click", () => {
    renderRecipes(); 
});