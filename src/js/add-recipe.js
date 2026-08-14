import heartImg from "./src/assets/images/heart.png";
import userImg from "./src/assets/images/user.png";
import trayImg from "./src/assets/images/tray.png";

const recipeGrid = document.getElementById("recipe-grid");
const recipeDialog = document.getElementById("recipe-dialog");
const recipeForm = document.getElementById("add-form");

const DEFAULT_IMG = "https://www.bing.com/th/id/OIP.pQDb49sa3kzRGxV_FYQJjQHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=ImgAns&rm=2";

const updateNoRecipesUI = (hasRecipes) => {
    const noRecipesElements = document.querySelectorAll(".no-recipes");
    noRecipesElements.forEach((element) => {
        element.style.display = hasRecipes ? "none" : "";
    });
    const nofavsElements = document.querySelectorAll(".no-favs");
    nofavsElements.forEach((element) => {
        element.style.display = "none";
    });
};

export const createCard = (el) => {
    const article = document.createElement("article");
    article.className = "recipe-card";
    
    const imgUrl = el.url || DEFAULT_IMG;

    article.innerHTML = `
        <div class="recipe-img">
            <img src="${imgUrl}" alt="${el.name}" class="recipe-card-img">
            <img src="${heartImg}" alt="heart icon" class="recipe-card-heart">
        </div>
        <h2 class="recipe-card-name">${el.name}</h2>
        <div class="icons">
            <img src="${userImg}" alt="user icon" class="user-icon">
            <span class="recipe-card-serving">${el.servings || 1} people</span>
            <img src="${trayImg}" alt="tray icon" class="tray-icon">
            <span class="recipe-card-category">${el.category}</span>
        </div>
        <button class="recipe-card-btn" data-id="${el.id}">VIEW RECIPE</button>
    `;

    return article;
};

export const renderRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipeGrid.innerHTML = "";

    recipes.forEach(element => {
        const card = createCard(element);
        recipeGrid.appendChild(card);
    });

    updateNoRecipesUI(recipes.length > 0);
};

document.getElementById("cancel-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    recipeForm.reset();
    recipeDialog.close();
});

renderRecipes();