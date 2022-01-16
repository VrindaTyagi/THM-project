// import { dummy_data } from "./data";
const dummy_data = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "bison steak",
    category: "dinner",
    price: 22.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");
// display all items when page loads
// window.addEventListener("DOMContentLoaded", function () {
//   diplayMenuItems(menu);
// });

const fetchData = () => {
  fetch("https://my-json-server.typicode.com/VrindaTyagi/THM-project")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      diplayMenuItems(data.menu);
      // pagination(data.menu);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = fetchData();

//LOCAL STORAGE
// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else {
//     return [];
//   }
// };

function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);
    return `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo" />
             <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="fas fa-heart" style="color: red" onclick=${addFav(item)}></h4>
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

function addFav(item) {
  console.log("clickeddd");
  favs_array.push(item);
  console.log("favs_array", favs_array);
}

// console.log("dummy dataaa",dummy_data);

const single_element = document.getElementById('list')
const pagination_element = document.getElementById('pagination')

let current_page=2
let rows = 5

function DisplayList(dummy_data,wrapper,rows_per_page, page){
  wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = dummy_data.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
	// console.log(dummy_data[i], "loginggg");
  let item = paginatedItems[i].id;
  let item_element = document.createElement('div');
  item_element.classList.add('item');
  item_element.innerText = item;

  wrapper.appendChild(item_element);

	}
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, single_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

DisplayList(dummy_data, single_element, rows, current_page);
SetupPagination(dummy_data, pagination_element, rows);
