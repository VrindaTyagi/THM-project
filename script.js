const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');
// event listeners ,add functionality to buttons
searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

var cart = document.getElementById('basket');
var select = document.querySelector('.select');
var add = document.querySelector('.recipe-btn');
for(var but of add)
    {
        but.addEventListener('click', (e)=>{
            var item = Number(cart.getAttribute('data-count') || 0);
            cart.setAttribute('data-count', item + 1);
            cart.classList.add('on')
        })
    }
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
                            <p>
                            <button  class="recipe-btn">Add to Cart</button>
                            </p>
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
