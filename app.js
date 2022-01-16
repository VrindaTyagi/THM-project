const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

const single_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 5;

const fetchData = () => {
  fetch("https://my-json-server.typicode.com/VrindaTyagi/THM-project")
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("menu", JSON.stringify(data.menu));

      DisplayList(data.menu, single_element, rows, current_page);
      SetupPagination(data.menu, pagination_element, rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = fetchData();

document.getElementById("button").addEventListener("click", handleSearch);

function handleSearch() {
  let search_text = document.getElementById("search-text").value;
  const menuData = getLocalStorage("menu");
  if (search_text === "")
    DisplayList(menuData, single_element, rows, current_page);
  else {
    const filtered_data = menuData.filter((data) => {
      const title = data.title.toLowerCase();
      if (title.includes(search_text)) return data;
    });
    diplayMenuItems(filtered_data);
  }
  console.log("clicked searchh butoonnnnnnn");
}

const getLocalStorage = (key) => {
  let list = localStorage.getItem(key);
  if (list) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
};

function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);
    return `<article class="menu-item">
    <img src=${item.img} alt=${item.title} class="photo" />
    <div class="item-info">
    <header>
    <h4>${item.title}</h4>
    <button id="fav-button" type="button" class="fas fa-heart" onclick="${addFavs(
      item
    )}" style="color: red; background: transparent;border: none"></button>
    </header>
    <p class="item-text">
    ${item.desc}
    </p>
    </div>
    </article>`;
  });

  displayMenu = displayMenu.join("");
  // console.log(displayMenu);
  sectionCenter.innerHTML = displayMenu;
}
var favs_array = [];

function addFavs(item) {
  console.log("clickeddd");
  // favs_array.push(item);
  // console.log("favs_array", favs_array);
}

// console.log("dummy dataaa",dummy_data);

function DisplayList(data, wrapper, rows, currentPage) {
  wrapper.innerHTML = "";
  currentPage--;
  let start = rows * currentPage;
  let end = start + rows;
  let page_count = Math.ceil(data.length / rows);
  let paginatedItems = data.slice(start, end);

  for (let i = 0; i < page_count; i++) {
    // console.log(dummy_data[i], "loginggg");
    diplayMenuItems(paginatedItems);
  }
}

function SetupPagination(items, wrapper, rows) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, single_element, rows, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}
