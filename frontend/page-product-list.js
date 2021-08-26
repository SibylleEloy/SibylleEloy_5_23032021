// OK

// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// OK
// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   for (let i = 0; i < data.length; i++) {
//     const name = data[i]["name"];
//     const description = data[i]["description"];

//     document.getElementById("name").innerHTML += name;
//     document.getElementById("description").innerHTML += description;
//   }
// }
// ---------------

// déclaration des variables
let _id = [];

// afficher les produits sur la page
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((data) => putTeddiesOnPage(data));

function putTeddiesOnPage(data) {
  // sélection élement du DOM
  const teddyCollectionDiv = document.getElementById("teddiesCollection");
  // boucle pour afficher les objets sur la page
  data.forEach(function (teddy) {
    teddyCollectionDiv.innerHTML += `
        <a href="page-product.html?id=${teddy._id}">
            <div id="teddyCard" class="w-auto m-auto" id="${teddy._id}">
                <img style="width: 100%" src="${
                  teddy.imageUrl
                }" alt="Teddy Bear" class="block h-60 rounded-lg shadow-lg" />
                <div class="flex items-center justify-between mt-3">
                  <div>
                      <div class="font-medium">${teddy.name}</div>
                      <span class="text-xs font-medium text-gray-600 mb-2"
                      >${teddy.description}</span>
                      <span class="text-xs font-medium ml-1 mt-2 text-indigo-500"
                      ><p class="mt-2">Prix : <span id="total-price">${
                        parseFloat(teddy.price) / 100
                      }</span> € </p>
                  </div>
                </div>
            </div>
        </a>
            `;
    console.log(teddy._id);
  });
}

// afficher le compteur du panier
// var productInLocalStorage = [];
// let totalQuantity = [];
// const objectProducts = localStorage.getItem("products");
// const quantityCart = JSON.parse(objectProducts);
// const quantityAlert = quantityCart.products[]

// for (let p = 0; p < productInLocalStorage.length; p++) {
//   let cartQuantities = Number(productInLocalStorage[p].quantity);
//   totalQuantity.push(cartQuantities);
//   console.log(totalQuantity);
// }
// const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
// const cartTotalQuantity = totalQuantity.reduce(reducer1, 0);
// console.log(cartTotalQuantity);

const cartCounterList = document.getElementById("cartCounterAlert2");
console.log(cartCounterList);
const qtyTotal = localStorage.getItem("totalQty");
console.log(qtyTotal);
cartCounterList.innerText = qtyTotal;

// const teddyCard = document.getElementById("5be9c8541c9d440000665243");
// console.log(teddyCard);

// .addEventListener('click', function() {
//     console.log(data-id);
// };

// essai raté
// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   for (let i = 0; i < data.length; i++) {
//     var newElement = document.createElement("div");
//     newElement.innerHTML = "KPI Name : " + data[i].name;
//     document.getElementById("name").appendChild(newElement);
//   }
// }

// for (let i = 0; i < url.length; i++) {
//   fetch(url[i])
//     .then((result) => result.json())
//     .then((res) => {
//       console.log(res);
//       renderTeddy(res);
//     })
//     .catch((err) => console.log(err));
// }

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// ------------

// document.getElementById("clickButton").addEventListener("click", askTeddy);

// function askTeddy() {
//   fetch("http://localhost:3000/api/teddies")
//     .then(function (res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function (value) {
//       document.getElementById("Ours1").innerText = value.name;
//     })
//     .catch(function (err) {
//       // Une erreur est survenue
//     });
// }
