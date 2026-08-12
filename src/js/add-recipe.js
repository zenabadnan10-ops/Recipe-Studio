const recipeGrid = document.getElementById("recipe-grid");
const recipeDialog = document.getElementById("recipe-dialog");
const recipeForm = document.getElementById("add-form");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const updateNoRecipesUI = () => {
    const noRecipesElements = document.querySelectorAll(".no-recipes");
    const hasRecipes = recipes.length > 0;

    noRecipesElements.forEach((element) => {
        element.style.display = hasRecipes ? "none" : "";
    });
};

const createCard = (el) => {
    const article = document.createElement("article");
    article.className = "recipe-card";
    
    const imgUrl = el.url || "https://www.bing.com/th/id/OIP.pQDb49sa3kzRGxV_FYQJjQHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=ImgAns&rm=2";

    article.innerHTML = `
        <div class="recipe-img">
            <img src="${imgUrl}" alt="${el.name}" class="recipe-card-img">
            <img src="./src/assets/images/heart.png" alt="heart icon" class="recipe-card-heart">
        </div>
        <h2 class="recipe-card-name">${el.name}</h2>
        <p class="recipe-card-desc">${el.desc || ""}</p>
        <div class="icons">
            <img src="./src/assets/images/user.png" alt="user icon" class="user-icon">
            <span class="recipe-card-serving">${el.servings || 1} people</span>
            <img src="./src/assets/images/tray.png" alt="tray icon" class="tray-icon">
            <span class="recipe-card-category">${el.category}</span>
        </div>
        <button class="recipe-card-btn">VIEW RECIPE</button>
    `;

    return article;
};

const renderRecipes = () => {
    recipeGrid.innerHTML = "";

    recipes.forEach(element => {
        const card = createCard(element);
        recipeGrid.appendChild(card);
    });

    updateNoRecipesUI();
};

const addRecipe = () => {
    const ingredients = document.getElementById("recipe-ingredients").value
        .split("\n")
        .map(item => item.trim())
        .filter(step => step !== "");

    const instructions = document.getElementById("recipe-instructions").value
        .split("\n")
        .map(item => item.trim())
        .filter(step => step !== "");

    const newRecipe = {
        id: Date.now(),
        name: document.getElementById("recipe-name").value,
        url: document.getElementById("recipe-img").value,
        desc: document.getElementById("recipe-desc").value,
        servings: document.getElementById("servings").value,
        category: document.getElementById("recipe-category").value,
        ingredients: ingredients,
        instructions: instructions,
        isFavorite: false
    };

    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    renderRecipes();
};

document.getElementById("add-btn").addEventListener("click", () => recipeDialog.showModal());
document.getElementById("add-recipe-btn").addEventListener("click", () => recipeDialog.showModal());

document.getElementById("cancel-btn").addEventListener("click", (e) => {
    e.preventDefault();
    recipeForm.reset();
    recipeDialog.close();
});

recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addRecipe();
    recipeForm.reset();
    recipeDialog.close();
});

renderRecipes();