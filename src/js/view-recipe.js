const viewDialog = document.getElementById("view-recipe-dialog");
const closeView = document.getElementById("cross-emoji");
const recipeGrid = document.getElementById("recipe-grid");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const showRecipeDialog = (id) => {

    const recipe = recipes.find(el => el.id === id);
    if(!recipe) return;

    document.getElementById("dialog-image").src = recipe.url || "https://www.bing.com/th/id/OIP.pQDb49sa3kzRGxV_FYQJjQHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=ImgAns&rm=2";
    document.getElementById("dialog-recipe-name").textContent = recipe.name;
    document.getElementById("dialog-recipe-desc").textContent = recipe.desc || "";
    document.getElementById("dialog-recipe-serving").textContent = recipe.servings || 1;
    document.getElementById("dialog-recipe-category").textContent = recipe.category;

    const ingredients = document.getElementById("dialog-recipe-ingredient-list");
    ingredients.innerHTML = (recipe.ingredients || []).map(ingredient => `<li>${ingredient}</li>`).join("");

    const instructions = document.getElementById("dialog-recipe-instructions-list");
    instructions.innerHTML = (recipe.instructions || []).map(instruction => `<li>${instruction}</li>`).join("");

    viewDialog.showModal();
}   

recipeGrid.addEventListener("click", (e) => {
    if(e.target.classList.contains("recipe-card-btn")){
        const recipeId = Number(e.target.dataset.id);
        showRecipeDialog(recipeId);
    }
})

closeView.addEventListener("click", (e) => {
    e.preventDefault(); 
    viewDialog.close(); 
});