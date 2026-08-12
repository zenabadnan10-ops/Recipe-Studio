import { renderRecipes } from "./add-recipe.js";

const editBtn = document.getElementById("edit-recipe-btn");
const recipeForm = document.getElementById("add-form");
const recipeDialog = document.getElementById("recipe-dialog");
const viewDialog = document.getElementById("view-recipe-dialog");

export let editingRecipeId = null;

const DEFAULT_IMG = "https://www.bing.com/th/id/OIP.pQDb49sa3kzRGxV_FYQJjQHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=ImgAns&rm=2";

const openEditModal = (id) => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return;

    editingRecipeId = id;

    document.getElementById("recipe-name").value = recipe.name || "";
    document.getElementById("recipe-img").value = recipe.url || "";
    document.getElementById("recipe-desc").value = recipe.desc || "";
    document.getElementById("servings").value = recipe.servings || 1;
    document.getElementById("recipe-category").value = recipe.category || "";
    document.getElementById("recipe-ingredients").value = (recipe.ingredients || []).join("\n");
    document.getElementById("recipe-instructions").value = (recipe.instructions || []).join("\n");

    if (viewDialog) viewDialog.close();
    recipeDialog.showModal();
};

export const openAddModal = () => {
    editingRecipeId = null;
    recipeForm.reset();
    recipeDialog.showModal();
};

recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const ingredients = document.getElementById("recipe-ingredients").value
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

    const instructions = document.getElementById("recipe-instructions").value
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (editingRecipeId !== null) {
        recipes = recipes.map(recipe => {
            if (recipe.id === editingRecipeId) {
                return {
                    ...recipe,
                    name: document.getElementById("recipe-name").value,
                    url: document.getElementById("recipe-img").value || DEFAULT_IMG,
                    desc: document.getElementById("recipe-desc").value,
                    servings: document.getElementById("servings").value,
                    category: document.getElementById("recipe-category").value,
                    ingredients: ingredients,
                    instructions: instructions
                };
            }
            return recipe;
        });
    } else {
        const newRecipe = {
            id: Date.now(),
            name: document.getElementById("recipe-name").value,
            url: document.getElementById("recipe-img").value || DEFAULT_IMG,
            desc: document.getElementById("recipe-desc").value,
            servings: document.getElementById("servings").value,
            category: document.getElementById("recipe-category").value,
            ingredients: ingredients,
            instructions: instructions,
            isFavorite: false
        };
        recipes.push(newRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();

    recipeForm.reset();
    editingRecipeId = null;
    recipeDialog.close();
});

document.getElementById("add-btn")?.addEventListener("click", openAddModal);
document.getElementById("add-recipe-btn")?.addEventListener("click", openAddModal);

editBtn?.addEventListener("click", () => {
    const recipeId = Number(editBtn.dataset.id);
    openEditModal(recipeId);
});