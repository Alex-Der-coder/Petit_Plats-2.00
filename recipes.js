function creerCarte(recette) {
    const card = document.createElement("div");
    card.classList.add("recipe-card"); // Ajoutez des classes CSS pour le style
  
    // Créez un tableau pour stocker les noms d'ingrédients
    const ingredientsArray = [];
  
    // Ajoutez un attribut data-filter à la carte pour chaque ingrédient
    recette.ingredients.forEach(ingredient => {
      if (ingredient.ingredient) {
        ingredientsArray.push(ingredient.ingredient.toLowerCase().replace(/\s+/g, '-'));
      }
    });
  
    card.innerHTML = `
      <img src="assets/images/${recette.image}" alt="${recette.name}">
      <span class="price"> ${recette.time}min</span>
      <h2>${recette.name}</h2>
      <p class="letter_typographie">Recette</p>
      <p class="font_style">${recette.description}</p>
      <p class="letter_typographie">Ingrédients</p>
      <ul>
          ${recette.ingredients.map(ingredient => `
              <li>${ingredient.ingredient}: ${ingredient.quantity || ''} ${ingredient.unit || ''}</li>
          `).join('')}
      </ul>
    `;
  
    return card;
  }

  // Récupérer les données JSON via fetch
fetch("data.Json")
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
  
    // Créer une nouvelle div
    const newDiv = document.createElement("div");
    newDiv.classList.add("number_recipes");
    // Créer une balise p à l'intérieur de la div et y placer la valeur de la longueur
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `${length} recettes`;
  
    // Ajouter la balise p à l'intérieur de la div
    newDiv.appendChild(newParagraph);
  
    // Ajouter la div à l'élément avec la classe .container_filter (vous devez avoir cet élément dans votre HTML)
    const containerFilter = document.querySelector(".container_filter");
    containerFilter.appendChild(newDiv);
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

    // Ajoutez un attribut data-filter à la carte pour cette recette
    recipeCard.setAttribute('data-filter', [applianceName, ...uniqueIngredients, ...uniqueUstensils].join(' '));
  });


  const toggleListDisplay = (button, list) => {
    button.addEventListener("click", function () {
      if (list.style.display === "flex") {
        list.style.display = "none";
      } else {
        list.style.display = "flex";
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
  

  function createButtons(list, container) {
    list.forEach(item => {
      const button = document.createElement("button");
      button.classList.add("ingredient-button");
      button.textContent = item;
      
      // Ajoutez un gestionnaire d'événement "click" à chaque bouton créé
      button.addEventListener('click', () => {
        // Vous pouvez ajouter ici le code pour réagir au clic du bouton
        console.log(`Bouton "${item}" cliqué`);
      });
      
      container.appendChild(button);
    });
  }
  // Utiliser les tableaux uniques pour créer des boutons
  createButtons(uniqueIngredients, ingredientsList);
  createButtons(uniqueAppareils, appareilsList);
  createButtons(uniqueUstensils, ustensilsList);



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



