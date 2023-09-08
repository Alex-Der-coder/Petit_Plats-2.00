const ingredientsButton = document.getElementById("ingredients-button");
const ingredientsList = document.getElementById("ingredients");

// Afficher ou masquer la liste des ingrédients lorsque le bouton est cliqué
ingredientsButton.addEventListener("click", function () {
    if (ingredientsList.style.display === "none" || ingredientsList.style.display === "") {
        ingredientsList.style.display = "flex";
    } else {
        ingredientsList.style.display = "none";
    }
});

// Écouteur d'événement pour la saisie dans la zone de recherche
document.getElementById("ingredient-search").addEventListener("input", function () {
    // Votre logique de suggestion ici
});

// Écouteur d'événement pour le bouton de recherche
document.getElementById("search-button").addEventListener("click", () => {
    // Votre logique de recherche ici
});