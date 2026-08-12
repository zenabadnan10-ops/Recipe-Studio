import { createCard } from "./add-recipe.js";

const dialogHeart = document.getElementById("dialog-recipe-heart");
const editBtn = document.getElementById("edit-recipe-btn");
const viewFavsBtn = document.getElementById("favorite-btn");
const recipeGrid = document.getElementById("recipe-grid");

const addToFav = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return;

    const isAlreadyFav = favorites.some(item => item.id === id);

    if (!isAlreadyFav) {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${recipe.name} added to favorites!`); 
    } else {
        alert(`${recipe.name} is already in your favorites.`);
    }
}

const renderFavs = () => {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    recipeGrid.innerHTML = "";

    favorites.forEach(element => {
        const card = createCard(element);
        recipeGrid.appendChild(card);
    });

    updateNoRecipesUI(favorites.length > 0);
};

const updateNoRecipesUI = (hasRecipes) => {
    const noFavsElements = document.querySelectorAll(".no-favs");
    noFavsElements.forEach((element) => {
        element.style.display = hasRecipes ? "none" : "";
    });
    const noRecipesElements = document.querySelectorAll(".no-recipes");
    noRecipesElements.forEach((element) => {
        element.style.display = "none";
    });
};

dialogHeart.addEventListener("click", () => {
    const recipeId = Number(editBtn.dataset.id);
    addToFav(recipeId);
});

recipeGrid?.addEventListener("click", (e) => {
    if (e.target.classList.contains("recipe-card-heart")) {
        const card = e.target.closest(".recipe-card");
        const viewBtn = card.querySelector(".recipe-card-btn");
        const recipeId = Number(viewBtn.dataset.id);
        
        addToFav(recipeId);
    }
});

viewFavsBtn.addEventListener("click", () => {
    renderFavs();
})