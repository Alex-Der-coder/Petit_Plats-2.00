const filterRecipes = (filterValue) => {
  recipeCards.forEach(card => {
    const cardAppliance = card.getAttribute('data-appliance').toLowerCase();
    const cardIngredients = card.getAttribute('data-ingredients').toLowerCase();
    const cardUstensils = card.getAttribute('data-ustensils').toLowerCase();

    // Vérifiez si la carte correspond à tous les filtres actifs
    const isApplianceMatch = activeFilters.appliances.length === 0 || activeFilters.appliances.includes(cardAppliance);
    const areIngredientsMatch = activeFilters.ingredients.length === 0 || activeFilters.ingredients.every(filter => cardIngredients.includes(filter));
    const areUstensilsMatch = activeFilters.ustensils.length === 0 || activeFilters.ustensils.every(filter => cardUstensils.includes(filter));

    // Si la carte correspond à tous les filtres actifs, affichez-la, sinon masquez-la
    const isMatch = isApplianceMatch && areIngredientsMatch && areUstensilsMatch;

    if (!isMatch) {
      // Si la carte ne correspond pas, supprimez-la du tableau
      const index = Array.from(recipeCards).indexOf(card);
      recipeCards.splice(index, 1);
      console.log(recipeCards);
      createDivWithLength(filteredRecipes);
    }

  });
};
