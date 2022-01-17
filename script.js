const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners ,add functionality to buttons
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch("app1.json?i=${searchInputTxt}")
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => 
                {
                html += `
                    <div class = "meal-item" data-id = "${meal.id}">
                        <div class = "meal-img">
                            <img src = "${meal.img}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h1>${meal.category}</h1> </br>
                            <h2>${meal.title}</h2></br>
                            <h3>${meal.desc}</h3>
                            </br>
                            <h4>${meal.price}</h4>
                            <a href = "#" class = "recipe-btn">Add to Cart</a>
                        </div>
                    </div>
                `;
            });
          
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem = e.target.parentElement.parentElement;
//         fetch("app1.json?i=${mealItem.dataset.id}")
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.meals));
//     }
// }

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.title}</h2>
        <p class = "recipe-category">${meal.category}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.desc}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.img}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}