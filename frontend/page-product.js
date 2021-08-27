// recupérer la chaîne de requête dans l'url
var productInLocalStorage = [];
const queryStringUrlId = window.location.search;
// console.log(queryStringUrlId);

// extraire l'id de l'url
const pageId = queryStringUrlId.slice(4);
// console.log(pageId);

//-------------------Affichage produit sur la page------------------

fetch(`http://localhost:3000/api/teddies/${pageId}`)
  .then((response) => response.json())
  .then((data) => putTeddyOnPage(data))
  .then(() => addToCart("refresh"));

function putTeddyOnPage(data) {
  // sélectionner élement du DOM
  const teddyDetails = document.getElementById("teddySelection");
  const teddyImage = document.getElementById("teddyImage");
  // console.log(teddyDetails);
  // console.log(teddyImage);

  teddyDetails.innerHTML += `
    <h3 id="teddyName" class="text-gray-700 uppercase text-lg">${data.name}</h3>
    <p class="text-indigo-500 mt-3">Description : <span id="teddyDescription">${
      data.description
    }</span>
    <p class="text-gray-500 mt-3">Prix : <span id="teddyPrice">${
      parseFloat(data.price) / 100
    }</span> € </span>`;
  teddyImage.innerHTML += `
    <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
    src="${data.imageUrl}" alt="Ours en peluche"/>`;
}

//-------------------Affichage des autres produits sur la page------------------

// déclaration des variables
let _id = [];

// afficher les produits sur la page
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((data) => putTeddiesOnPage(data));

function putTeddiesOnPage(data) {
  // sélection élement du DOM
  const moreTeddiesDiv = document.getElementById("moreTeddies");
  // boucle pour afficher les objets sur la page
  data.forEach(function (teddy) {
    if (teddy._id !== pageId) {
      moreTeddiesDiv.innerHTML += `
        <a href="page-product.html?id=${teddy._id}">
        <div
        class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
      >
        <div
          class="flex items-end justify-end h-56 w-full bg-cover"
          style="background-image: url('${teddy.imageUrl}')"
        >
        </div>
        <div class="px-5 py-3">
          <h3 class="text-gray-700 uppercase">${teddy.name}</h3>
          <span class="text-gray-500 mt-2">${
            parseFloat(teddy.price) / 100
          } €</span>
        </div>
      </div>
        </a>
            `;
    }
  });
}

// Modifier les quantités
function decrement(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value--;
  target.value = value;
}

function increment(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value++;
  target.value = value;
}
const decrementButtons = document.querySelectorAll(
  `button[data-action="decrement"]`
);
const incrementButtons = document.querySelectorAll(
  `button[data-action="increment"]`
);
decrementButtons.forEach((btn) => {
  btn.addEventListener("click", decrement);
});
incrementButtons.forEach((btn) => {
  btn.addEventListener("click", increment);
});

//----------------Gestion du panier et localStorage---------------------

//Récuperer les données produit au clic sur bouton Mettre au panier

function addToCart(option) {
  // récuperer les données produit de l'utilisateur
  const cartName = document.getElementById("teddyName").innerText;
  // console.log(cartName);

  const cartDescription = document.getElementById("teddyDescription").innerText;

  const cartPrice = document.getElementById("teddyPrice").innerText;
  // console.log(cartPrice);

  const cartImage = document.getElementById("teddyImage").innerHTML;
  // console.log(cartImage);

  const cartQty = document.getElementById("productQty").value;
  // console.log(cartQty);

  // Enregistrer les données dans le localStorage
  // Rationnaliser le panier

  productInLocalStorage = JSON.parse(localStorage.getItem("products")) || [];
  if (option == "add") {
    let flag = false;
    for (var cpt = 0; cpt < productInLocalStorage.length; cpt++) {
      if (productInLocalStorage[cpt]["id"] == pageId) {
        productInLocalStorage[cpt]["quantity"] += parseInt(cartQty);
        productInLocalStorage[cpt]["total"] +=
          parseInt(cartPrice) * parseInt(cartQty);
        flag = true;
      }
    }
    if (!flag) {
      let newProductInLocalStorage = {
        id: pageId,
        image: cartImage,
        name: cartName,
        description: cartDescription,
        price: parseInt(cartPrice),
        total: parseInt(cartPrice) * parseInt(cartQty),
        quantity: parseInt(cartQty),
      };
      productInLocalStorage.push(newProductInLocalStorage);
    }
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(productInLocalStorage));
  }

  // Afficher le compteur du panier
  let totalQuantity = [];

  for (let m = 0; m < productInLocalStorage.length; m++) {
    let cartQuantities = Number(productInLocalStorage[m].quantity);
    totalQuantity.push(cartQuantities);
    // console.log(totalQuantity);
  }
  const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
  const cartTotalQuantity = totalQuantity.reduce(reducer1, 0).toLocaleString();
  // console.log(cartTotalQuantity);

  const cartCounterList = document.getElementById("cartCounterAlert");
  cartCounterList.innerText = cartTotalQuantity;
  localStorage.setItem("totalQty", cartTotalQuantity);
}
