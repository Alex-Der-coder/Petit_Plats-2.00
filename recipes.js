function creerCarte(recette) {
  const card = document.createElement("div");
  card.classList.add("recipe-card"); // Ajoutez des classes CSS pour le style
  
  // Créez un tableau pour stocker les noms d'ingrédients, ustensiles, appareil et le titre
  const filtersArray = [];
  
  // Ajoutez le titre à l'attribut data-filter
  filtersArray.push(recette.name.toLowerCase().replace(/\s+/g, ' '));
  
  // Ajoutez un attribut data-filter à la carte pour chaque ingrédient
  recette.ingredients.forEach(ingredient => {
    if (ingredient.ingredient) {
      filtersArray.push(ingredient.ingredient.toLowerCase().replace(/\s+/g, ' '));
    }
  });
  
  // Ajoutez les ustensiles à l'attribut data-filter
  if (recette.ustensils) {
    recette.ustensils.forEach(ustensil => {
      filtersArray.push(ustensil.toLowerCase().replace(/\s+/g, ' '));
    });
  }
  
  // Ajoutez l'appareil à l'attribut data-filter
  if (recette.appliance) {
    filtersArray.push(recette.appliance.toLowerCase().replace(/\s+/g, ' '));
  }
  
  // Créez une chaîne de filtres en joignant les éléments du tableau
  const filtersString = filtersArray.join(' ');
  
  card.innerHTML = `
  <img src="assets/images/${recette.image}" alt="${recette.name}">
  <span class="price">${recette.time} min</span>
  <h2>${recette.name}</h2>
  <p class="letter_typographie">Recette</p>
  <p class="font_style">${recette.description}</p>
  <p class="letter_typographie">Ingrédients</p>
  <ul class="ingredient-container">
    ${recette.ingredients.map((ingredient, index) => `
      <li>
        <div class="ingredient-div ${recette.ingredients.length === 5 && index === 4 ? 'alternative_disposition_ingredient' : ''}">
          <div class="ingredient-name">${ingredient.ingredient}</div>
          <div class="ingredient-quantity">${ingredient.quantity ? ingredient.quantity : '-' } ${ingredient.unit || ''}</div>
        </div>
      </li>
    `).join('')}
  </ul>
`;

  // Ajoutez l'attribut data-filter à la carte
  card.setAttribute('data-filter', filtersString);
  
  return card;
}


  // Récupérer les données JSON via fetch
fetch("https://raw.githubusercontent.com/Alex-Der-coder/Petit_Plats-2.00/main/data.Json")
.then(response => response.json())
.then(data => {
  console.log(data.length);
  
  
  // Supposons que data soit un tableau d'objets de recettes
  const container = document.getElementById("recipesContainer");
  const ingredientsList = document.getElementById("ingredients");
  const appareilsList = document.getElementById("appareils");
  const ustensilsList = document.getElementById("ustensils");
  
  const uniqueIngredients = [];
  const uniqueAppareils = [];
  const uniqueUstensils = [];
  
  const createDivWithLength = (data) => {
    const length = data.length;
    console.log(length);
    
    // Trouver la première div existante avec la classe "number_recipes"
    const existingDiv = document.querySelector(".number_recipes");
    
    if (existingDiv) {
      // Mettre à jour le texte de la balise p à l'intérieur de la div existante
      const paragraph = existingDiv.querySelector("p");
      paragraph.textContent = `${length} recettes`;
    } else {
      // Si la div n'existe pas, créez-la comme vous l'avez déjà fait
      const newDiv = document.createElement("div");
      newDiv.classList.add("number_recipes");
      
      const newParagraph = document.createElement("p");
      newParagraph.textContent = `${length} recettes`;
      
      newDiv.appendChild(newParagraph);
      
      // Ajouter la div à l'élément avec la classe .container_filter
      const containerFilter = document.querySelector(".container_filter");
      containerFilter.appendChild(newDiv);
    }
  };
  
  createDivWithLength(data);
  // Créez une carte pour chaque recette dans les données JSON
  data.forEach(recette => {
    // Ajoutez les ingrédients de cette recette au tableau uniqueIngredients
    recette.ingredients.forEach(ingredient => {
      if (ingredient.ingredient) {
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!uniqueIngredients.includes(ingredientName)) {
          uniqueIngredients.push(ingredientName);
        }
      }
    });
    
    // Vérifiez si l'appareil de la recette n'est pas déjà dans le tableau uniqueAppareils
    const applianceName = recette.appliance.toLowerCase();
    if (!uniqueAppareils.includes(applianceName)) {
      uniqueAppareils.push(applianceName);
    }
    
    // Ajoutez les ustensiles de cette recette au tableau uniqueUstensils
    recette.ustensils.forEach(ustensil => {
      const ustensilName = ustensil.toLowerCase();
      if (!uniqueUstensils.includes(ustensilName)) {
        uniqueUstensils.push(ustensilName);
      }
    });
    
    // Créez une carte de recette
    const recipeCard = creerCarte(recette);
    container.appendChild(recipeCard);
    
  });


  
  const toggleListDisplay = (button, list) => {
    button.addEventListener("click", function () {
      if (list.style.display === "flex") {
        list.style.display = "none";
        button.style.borderRadius = "11px 11px 11px 11px"; // Réinitialiser le border-radius
      } else {
        list.style.display = "flex";
        button.style.borderRadius = "11px 11px 0 0"; // Appliquer le border-radius uniquement en haut
      }
    });
  };


  // Gestionnaire d'événement pour le bouton Ingrédients
  const ingredientsButton = document.getElementById("ingredients-button");
  
  toggleListDisplay(ingredientsButton, ingredientsList);
  
  // Gestionnaire d'événement pour le bouton Appareils
  const appareilsButton = document.getElementById("appareils-button");
  
  toggleListDisplay(appareilsButton, appareilsList);
  
  // Gestionnaire d'événement pour le bouton Ustensiles
  const ustensilsButton = document.getElementById("ustensils-button");
  
  toggleListDisplay(ustensilsButton, ustensilsList);

  function createIngredientsButtons(ingredientsList, container) {
    ingredientsList.forEach(item => {
      const button = document.createElement("button");
      button.classList.add("ingredient-button");
      button.textContent = item;
      const ingredientsList = document.getElementById("ingredients");
      button.addEventListener('click', () => {
        const ingredientClicked = item;
        console.log(`Bouton "${ingredientClicked}" cliqué`);
  
        if (!activeFilters.ingredients.includes(ingredientClicked)) {
          activeFilters.ingredients.push(ingredientClicked);
          ingredientsList.style.display = "none";
        } else {
          // Gérer le cas où l'ingrédient est déjà dans les filtres actifs
          // Vous pouvez afficher un message d'erreur ou effectuer une autre action appropriée.
          console.log("Cet ingrédient est déjà sélectionné.");
        }
        console.log(activeFilters);
        
        filterRecipes();
        mettreAJourFiltres();
      });
  
      container.appendChild(button);
    });
  }
  

  function createAppareilsButtons(appareilsList, container) {
    appareilsList.forEach(item => {
      const button = document.createElement("button");
      button.classList.add("appareil-button");
      button.textContent = item;
      const appareilsList = document.getElementById("appareils");
      button.addEventListener('click', () => {
        const appareilClicked = item;
        console.log(`Bouton "${appareilClicked}" cliqué`);

  
        if (!activeFilters.ingredients.includes(appareilClicked)) {
          activeFilters.ingredients.push(appareilClicked);
          appareilsList.style.display = "none";
        } else {
          // Gérer le cas où l'ingrédient est déjà dans les filtres actifs
          // Vous pouvez afficher un message d'erreur ou effectuer une autre action appropriée.
          console.log("Cet ingrédient est déjà sélectionné.");
        }
        console.log(activeFilters);
        filterRecipes();
        mettreAJourFiltres();
      });
  
      container.appendChild(button);
    });
  }
  

  function createUstensilsButtons(ustensilsList, container) {
    ustensilsList.forEach(item => {
      const button = document.createElement("button");
      button.classList.add("ustensil-button");
      button.textContent = item;
      const ustensilsList = document.getElementById("ustensils");
      button.addEventListener('click', () => {
        const ustensilClicked = item;
        console.log(`Bouton "${ustensilClicked}" cliqué`);
  
        if (!activeFilters.ingredients.includes(ustensilClicked)) {
          activeFilters.ingredients.push(ustensilClicked);
          appareilsList.style.display = "none";
        } else {
          // Gérer le cas où l'ingrédient est déjà dans les filtres actifs
          // Vous pouvez afficher un message d'erreur ou effectuer une autre action appropriée.
          console.log("Cet ingrédient est déjà sélectionné.");
        }
        console.log(activeFilters);
        ustensilsList.style.display = "none";
        filterRecipes();
        mettreAJourFiltres();
      });
  
      container.appendChild(button);
    });
  }
  
  
  const activeFilters = {
    ingredients: [], // Vous pouvez également ajouter des tableaux pour d'autres types de filtres (appareils, ustensiles, etc.) si nécessaire
  };
  
  // Ajoutez une classe spécifique à la div contenant les spans
  var divForSpans = document.querySelector(".spans-container");
  
  function mettreAJourFiltres() {
    var container = document.querySelector(".container_filter_recipe");
    
    // Si la div contenant les spans existe déjà, supprimez-la
    if (divForSpans) {
      container.removeChild(divForSpans);
    }
    
    // Créez une nouvelle div pour les spans
    divForSpans = document.createElement("div");
    divForSpans.classList.add("spans-container");
    
    // Parcourez les filtres actifs et créez un span pour chaque filtre
    activeFilters.ingredients.forEach(function (filtre) {
      var span = document.createElement("span");
      span.textContent = filtre;
      
      // Ajoutez un bouton de suppression à chaque span
      var closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.classList.add("close-button");

      
      // Ajoutez un gestionnaire d'événement pour supprimer le filtre
      closeButton.addEventListener('click', function () {
        supprimerFiltre(filtre);
      });
      
      // Ajoutez le bouton de suppression au span
      span.appendChild(closeButton);
      
      divForSpans.appendChild(span);
    });

    container.style.marginBottom = "3%";

    // Ajoutez la nouvelle div avec les spans au conteneur
    container.appendChild(divForSpans);
  }
  // Fonction pour supprimer un filtre
  const beforefilter = Array.from(document.querySelectorAll('.recipe-card'));
  
  // Fonction pour restaurer les recettes
  function restaurerRecettes() {
    // Sélectionnez le conteneur de recettes
    const recipeContainer = document.querySelector(".recipe-container");
    
    // Videz le conteneur existant
    recipeContainer.innerHTML = '';
    
    // Ajoutez les recettes stockées dans "beforefilter" au conteneur
    beforefilter.forEach(function (recipe) {
      recipeContainer.appendChild(recipe.cloneNode(true));
    });
    
    // Réinitialisez le contenu de "recipeCards" avec les recettes restaurées
    recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
    
    createDivWithLength(recipeCards);
  }
  
  
  function supprimerFiltre(filtre) {
    handleDeleteButtonClick();
    var index = activeFilters.ingredients.indexOf(filtre);
    if (index !== -1) {
      activeFilters.ingredients.splice(index, 1);
      console.log(activeFilters);
      mettreAJourFiltres();
      if (activeFilters.ingredients.length === 0) {
        var container = document.querySelector(".container_filter_recipe");
        container.style.marginBottom = "unset";
        restaurerRecettes();
      } else if (activeFilters.ingredients.length === 1 || activeFilters.ingredients.length === 2 || activeFilters.ingredients.length === 3 ) {
        restaurerRecettes();
        filterRecipes();
      } else {
        filterRecipes();
      }
    }
  }
  
  
  function filterRecipes() {
    
    const filteredRecipeCards = recipeCards.filter(card => {
      const cardFilters = card.getAttribute('data-filter').toLowerCase();
      const activeFiltersLowerCase = activeFilters.ingredients.map(filter => filter.toLowerCase());
      const isCardMatching = activeFiltersLowerCase.length === 0 || activeFiltersLowerCase.every(activeFilter => {
        // Vérifiez si au moins un filtre actif est inclus dans la chaîne cardFilters
        return cardFilters.includes(activeFilter);
      });
      
      return isCardMatching;
    });
    
    recipeCards.length = 0;
    Array.prototype.push.apply(recipeCards, filteredRecipeCards);
    
    createDivWithLength(recipeCards);
    updateRecipeContainer();
  }
  
  let recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
  console.log(recipeCards);

  function updateRecipeContainer() {
    
    const recipesContainer = document.getElementById('recipesContainer');
    
    while (recipesContainer.firstChild) {
      recipesContainer.removeChild(recipesContainer.firstChild);
    }
    
    recipeCards.forEach(card => {
      recipesContainer.appendChild(card);
    });
    
  }

  function handleIngredientsSearch() {
    // Récupérez les éléments du DOM
    const searchInput = document.getElementById('ingredients-search');
    const ingredientsList = document.querySelectorAll('.ingredients-list .ingredient-button');
    const searchMainInput = document.getElementById('search-input');
  
    // Fonction pour filtrer les boutons en fonction du texte de recherche
    function filterButtons(input, buttons) {
      const searchText = input.value.toLowerCase();
  
      // Filtrer les boutons en fonction du texte de recherche
      const filteredButtons = Array.from(buttons).filter(button => {
        const buttonText = button.textContent.toLowerCase();
        return buttonText.includes(searchText);
      });
  
      // Cachez les boutons qui ne correspondent pas à la recherche
      buttons.forEach(button => {
        button.style.display = filteredButtons.includes(button) ? 'block' : 'none';
      });
    }
  
    function resetSearch() {

      const buttonGroups = document.querySelectorAll('#appareils button, #ingredients button, #ustensils button');
      // Afficher tous les boutons
      buttonGroups.forEach(button => {
          button.style.display = 'block';
      });
  }

    // Ajoutez un gestionnaire d'événements pour la recherche d'ingrédients
    searchInput.addEventListener('input', () => {
      filterButtons(searchInput, ingredientsList);
    });
  
    // Ajoutez un gestionnaire d'événements pour la recherche principale
    searchMainInput.addEventListener('input', () => {
      filterButtons(searchMainInput, ingredientsList); // Utilisez les mêmes boutons d'ingrédients
    });
  }
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.toLowerCase();
  // Appelez la fonction handleIngredientsSearch pour l'initialisation
  handleIngredientsSearch();
  

  function searchAppareils() {
    // Récupérez les éléments du DOM
    const appareilsSearchInput = document.getElementById('appareils-search');
    const appareilsButtons = document.querySelectorAll('.appareils-list .appareil-button');
    const searchInput = document.getElementById('search-input');
  
    // Fonction pour filtrer les boutons en fonction du texte de recherche
    function filterButtons(input, buttons) {
      const searchText = input.value.toLowerCase();
  
      // Parcourez les boutons et filtrez-les en fonction de la recherche
      buttons.forEach(button => {
        const buttonFilter = button.getAttribute('data-filter').toLowerCase();
  
        if (buttonFilter.includes(searchText)) {
          button.style.display = 'block'; // Affichez les boutons correspondants
        } else {
          button.style.display = 'none'; // Cachez les boutons non correspondants
        }
      });
    }
  
    // Ajoutez un gestionnaire d'événements pour la recherche d'appareils
    appareilsSearchInput.addEventListener('input', () => {
      filterButtons(appareilsSearchInput, appareilsButtons);
    });
  
    // Ajoutez un gestionnaire d'événements pour la recherche principale
    searchInput.addEventListener('input', () => {
      filterButtons(searchInput, appareilsButtons); // Utilisez les mêmes boutons d'appareils
    });
  }
  
  // Appelez la fonction searchAppareils pour l'initialisation
  searchAppareils();
  

  function searchUstensils() {
    // Récupérez les éléments du DOM
    const ustensilsSearchInput = document.getElementById('ustensils-search');
    const ustensilsButtons = document.querySelectorAll('.ustensils-list .ustensil-button');
    const searchInput = document.getElementById('search-input');
  
    // Fonction pour filtrer les boutons en fonction du texte de recherche
    function filterButtons(input, buttons) {
      const searchText = input.value.toLowerCase();
  
      // Parcourez les boutons et filtrez-les en fonction de la recherche
      buttons.forEach(button => {
        const buttonFilter = button.getAttribute('data-filter').toLowerCase();
  
        if (buttonFilter.includes(searchText)) {
          button.style.display = 'block'; // Affichez les boutons correspondants
        } else {
          button.style.display = 'none'; // Cachez les boutons non correspondants
        }
      });
    }
  
    // Ajoutez un gestionnaire d'événements pour la recherche d'ustensils
    ustensilsSearchInput.addEventListener('input', () => {
      filterButtons(ustensilsSearchInput, ustensilsButtons);
    });
  
    // Ajoutez un gestionnaire d'événements pour la recherche principale
    searchInput.addEventListener('input', () => {
      filterButtons(searchInput, ustensilsButtons); // Utilisez les mêmes boutons d'ustensils
    });
  }
  
  // Appelez la fonction searchUstensils pour l'initialisation
  searchUstensils();



  function searchRecipesAndFilters() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();
  
    handleIngredientsSearch(searchText);
    searchAppareils(searchText);
    searchUstensils(searchText);
  
    if (searchText.length >= 3) {
      // Update activeFilters with the search input
      activeFilters.ingredients = [searchText];

      buttonDelete.style.display = 'block';
      console.log(activeFilters.ingredients);
      filterRecipes();
      mettreAJourFiltres();
    } else {
      // Clear filters and recipes if the input length is less than 3
      restaurerRecettes();
      mettreAJourFiltres();
      updateRecipeContainer();
    }
  }
  
  // Listen for the click event on the search button
  const searchButton = document.getElementById('search-button');
  
  searchButton.addEventListener('click', function() {
    // Only trigger the search function if the input length is greater than or equal to 3
    const searchInput = document.getElementById('search-input');
    if (searchInput.value.length >= 3) {
      searchButton.style.backgroundColor = '#FFD15B';
      searchRecipesAndFilters();
    }
    // You may want to add an else statement to handle cases where the input length is less than 3
  });
  
  // Optionally, you may also want to handle the Enter key press to trigger the search

  
  searchInput.addEventListener('input', function() {
    if (searchInput.value.length >= 3) {
      searchButton.style.backgroundColor = '#FFD15B';
      searchRecipesAndFilters();
    }
  });

  searchInput.addEventListener('input', function() {
    if (searchInput.value.length >= 0) {
      searchButton.style.backgroundColor = '#1b1b1b';
      resetSearch();
    }
  });


  

 

const buttonDelete = document.getElementById('button_delete');




function handleDeleteButtonClick() {
  // Efface le contenu de l'input de recherche
  searchInput.value = '';

  // Cache le bouton de suppression
  buttonDelete.style.display = 'none';

  // Rétablir la couleur d'arrière-plan d'origine du bouton de recherche
  searchButton.style.backgroundColor = '#1b1b1b';

  // Appeler les fonctions pour restaurer et filtrer les recettes
  restaurerRecettes();
  filterRecipes();
}


  
  searchRecipesAndFilters();
  
createIngredientsButtons(uniqueIngredients, document.getElementById('ingredients'), filterRecipes);
createAppareilsButtons(uniqueAppareils, document.getElementById('appareils'), filterRecipes);
createUstensilsButtons(uniqueUstensils, document.getElementById('ustensils'), filterRecipes);



// Associez les fonctions de recherche aux champs de recherche
const ingredientsSearchInput = document.getElementById('ingredients-search');
ingredientsSearchInput.addEventListener('input', handleIngredientsSearch);


const appareilsSearchInput = document.getElementById('appareils-search');
appareilsSearchInput.addEventListener('input',  searchAppareils);

const ustensilsSearchInput = document.getElementById('ustensils-search');
ustensilsSearchInput.addEventListener('input',  searchUstensils);

  
  // Ajouter des attributs data-filter aux boutons
  const buttonGroups = document.querySelectorAll('#appareils button, #ingredients button, #ustensils button');
  
  // Parcourez les groupes de boutons et attribuez l'attribut "data-filter" avec le texte en minuscules
  buttonGroups.forEach(group => {
    group.setAttribute('data-filter', group.textContent.toLowerCase());
  });
  
  // Vous avez maintenant les tableaux uniqueIngredients, uniqueAppareils et uniqueUstensils contenant les valeurs uniques
  console.log("Ingrédients uniques :", uniqueIngredients);
  console.log("Appareils uniques :", uniqueAppareils);
  console.log("Ustensiles uniques :", uniqueUstensils);
  
})
.catch(error => {
  console.error("Erreur lors de la récupération des données JSON :", error);
});



