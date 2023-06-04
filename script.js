const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const recipeDetails = document.getElementById('recipeDetails');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = searchInput.value;
  if (searchQuery.trim() !== '') {
    searchRecipes(searchQuery);
  }
});

function searchRecipes(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erreur lors de la récupération des données.");
    })
    .then(data => {
      displayRecipes(data.meals);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayRecipes(recipes) {
  recipeList.innerHTML = '';

  if (!recipes) {
    recipeList.innerHTML = '<p>Aucune recette trouvée.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const recipeItem = document.createElement('div');
    recipeItem.classList.add('card', 'mb-3');
    recipeItem.style.width = '18rem';

    const recipeImage = document.createElement('img');
    recipeImage.classList.add('card-img-top');
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;

    const recipeCardBody = document.createElement('div');
    recipeCardBody.classList.add('card-body');

    const recipeTitle = document.createElement('h5');
    recipeTitle.classList.add('card-title');
    recipeTitle.textContent = recipe.strMeal;

    const recipeButton = document.createElement('button');
    recipeButton.classList.add('btn', 'btn-primary');
    recipeButton.textContent = 'Voir les détails';
    recipeButton.addEventListener('click', () => {
      showRecipeDetails(recipe.idMeal);
    });

    recipeCardBody.appendChild(recipeTitle);
    recipeCardBody.appendChild(recipeButton);

    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(recipeCardBody);

    recipeList.appendChild(recipeItem);
  });
}

function showRecipeDetails(recipeId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erreur lors de la récupération des données.");
    })
    .then(data => {
      const recipe = data.meals[0];
      displayRecipeDetails(recipe);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayRecipeDetails(recipe) {
  recipeDetails.innerHTML = '';

  const recipeTitle = document.createElement('h2');
  recipeTitle.textContent = recipe.strMeal;

  const recipeCategory = document.createElement('p');
  recipeCategory.textContent = `Catégorie: ${recipe.strCategory}`;

  const recipeInstructions = document.createElement('p');
  recipeInstructions.textContent = recipe.strInstructions;

  const recipeImage = document.createElement('img');
  recipeImage.src = recipe.strMealThumb;
  recipeImage.alt = recipe.strMeal;

  recipeDetails.appendChild(recipeTitle);
  recipeDetails.appendChild(recipeCategory);
  recipeDetails.appendChild(recipeInstructions);
  recipeDetails.appendChild(recipeImage);
}