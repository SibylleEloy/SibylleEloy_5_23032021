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
    <p class="text-indigo-500 mt-3">Description : <span id="teddyDescription">${data.description}</span>
    <p class="text-gray-500 mt-3">Prix : <span id="teddyPrice">${data.price}</span> € </span>`;
  teddyImage.innerHTML += `
    <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
    src="${data.imageUrl}" alt="Ours en peluche"/>`;
}

//****Modifier les quantités
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

//******Récuperer les données produit au clic sur bouton Order Now
// let clicks = 0;
function addToCart(option) {
  // compter les quantités de produit - nb clic sur le bouton order
  // clicks += 1;
  // document.getElementById("cart").innerHTML = clicks;

  // récuperer les données produit de l'utilisateur
  const cartName = document.getElementById("teddyName").innerText;
  // console.log(cartName);
  // document.getElementById("name").innerText = cartName;

  const cartDescription = document.getElementById("teddyDescription").innerText;

  const cartPrice = document.getElementById("teddyPrice").innerText;
  // console.log(cartPrice);
  // document.getElementById("price").innerText = cartPrice;

  const cartImage = document.getElementById("teddyImage").innerHTML;
  // console.log(cartImage);
  // document.getElementById("image").innerHTML = cartImage;

  const cartQty = document.getElementById("productQty").value;
  // console.log(cartQty);

  //******Enregistrer les données dans le localStorage

  //******Rationnaliser le panier

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

  //*******Afficher le panier

  // afficher le compteur
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

  // afficher la dropdown
  const cartPosition = document.getElementById("cartStructure");
  // console.log(cartPosition);

  let structureCartProduct = [];
  console.log(productInLocalStorage);

  if (productInLocalStorage === null || productInLocalStorage == 0) {
    const emptyCart = `
    <div class="flex-auto text-sm w-32">Cart is empty</div>`;
    cartPosition.innerHTML = emptyCart;
  } else {
    for (j = 0; j < productInLocalStorage.length; j++) {
      structureCartProduct =
        structureCartProduct +
        `<div id="image" class="p-2 w-12">
        ${productInLocalStorage[j].image}
      </div>
      <div class="flex-auto text-sm w-32">
        <div id="name" class="font-bold">${productInLocalStorage[j].name}</div>
        <div id="quantity" class="text-gray-400">Quantity: 1</div>
      </div>
      <div class="flex flex-col w-18 font-medium items-end">
      <div class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
        <button class="deleteBtn"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        <input class="index-produit" type="hidden" value=${j}/></button>
      </div>
      <div id="price">${productInLocalStorage[j].price} €</div>
      </div>`;
    }
    if (j == productInLocalStorage.length) {
      cartPosition.innerHTML = structureCartProduct;
    }
  }
  // console.log(productInLocalStorage);

  //******Supprimer des éléments du panier
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  // console.log(deleteBtn);

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();

      productInLocalStorage.splice(k, 1);

      // productInLocalStorage = productInLocalStorage.filter(
      //   (element) => element.id !== idToDelete
      // );
      console.log(
        "element courant du panier",
        JSON.stringify(productInLocalStorage)
      );

      localStorage.setItem("products", JSON.stringify(productInLocalStorage));

      document.getElementById("refreshBtn").click();
    });
  }

  //******Supprimer le panier en totalité
  const detelAllBtnHtml = `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-3 py-1 px-1 border border-gray-400 rounded shadow" id="deleteAllBtn"> Empty Cart </button>`;
  cartPosition.insertAdjacentHTML("beforeend", detelAllBtnHtml);
  const deteleAllBtn = document.getElementById("deleteAllBtn");
  // console.log(deleteAllBtn);
  deteleAllBtn.addEventListener("click", (e) => {
    e.preventDefault;
    localStorage.removeItem("products");

    window.location.reload();
  });

  //******Calculer le montant total du panier
  let totalPrice = [];

  for (let k = 0; k < productInLocalStorage.length; k++) {
    let cartPrices = Number(productInLocalStorage[k].price);
    totalPrice.push(cartPrices);
    console.log(totalPrice);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const cartTotalPrice = totalPrice.reduce(reducer, 0).toLocaleString();
  console.log(cartTotalPrice);

  const displayTotalPriceHtml = `<div>Checkout - ${cartTotalPrice} €</div>`;

  document.getElementById("checkoutBtn").innerHTML = displayTotalPriceHtml;

  return false;
}

//-------------Dropdown cart----------------------------

function cartOpen() {
  let cart = document.getElementById("dropdownCart");
  console.log(cart);
  // let body = document.getElementById("body");
  // console.log(body);

  cart.classList.add("cartOpened");
  // body.classList.add("cartOpened");

  return false;
}

// ----------------Function localStorage-----------------------------
// This code below should only be run if you are not already storing a serialized array in your localStorage session variable.
// var a = [];
// a.push(JSON.parse(localStorage.getItem('session')));
// localStorage.setItem('session', JSON.stringify(a));

// function saveDataToLocalStorage(selectedProduct) {
//   var a = [];
//   // Parse the serialized data back into an aray of objects
//   a = JSON.parse(localStorage.getItem("session")) || [];
//   // Push the new data (whether it be an object or anything else) onto the array
//   a.push(selectedProduct);
//   // Re-serialize the array back into a string and store it in localStorage
//   localStorage.setItem("session", JSON.stringify(a));
// }

//-----------Gestion du panier----------------------

// let clicks = 0;
// function addToCart() {
//   // compter les quantités de produit - nb clic sur le bouton order
//   clicks += 1;
//   document.getElementById("clicks").innerHTML = clicks;

//   // récuperer les données produit de l'utilisateur
//   const cartName = document.getElementById("teddyName").innerText;
//   console.log(cartName);
//   document.getElementById("name").innerText = cartName;

//   const cartPrice = document.getElementById("teddyPrice").innerText;
//   console.log(cartPrice);
//   document.getElementById("price").innerText = cartPrice;

//   const cartImage = document.getElementById("teddyImage").innerHTML;
//   console.log(cartImage);
//   document.getElementById("image").innerHTML = cartImage;

//   let selectedProduct = {
//     id: pageId,
//     image: cartImage,
//     name: cartName,
//     price: cartPrice,
//     quantity: 1,
//   };

//   saveDataToLocalStorage(selectedProduct);
// }

// function SaveDataToLocalStorage(selectedProduct){
//   let a = [];
//   // Parse the seralized data back into an array of objects
//   a = JSON.parse(localStorage.getItem('session')) || [];
// }
// console.log(selectedProduct);
// // Put the object into localStorage:
// localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
// // Retrieve the object from storage:
// let retrievedProducts = localStorage.getItem("selectedProduct");
// console.log("retrievedProducts: ", JSON.parse(retrievedProducts));

//   if (selectedProduct_serialized) {
//     selectedProduct_serialized.push(selectedProduct);
//     localStorage.setItem("selectedProduct", selectedProduct_serialized);
//   } else {
//     selectedProduct_serialized = [];
//     selectedProduct_serialized.push(selectedProduct);
//     localStorage.setItem("selectedProduct", selectedProduct_serialized);
//   }
// }

// let data;

// fetch(`http://localhost:3000/api/teddies/${pageId}`)
// .then((response))

// async function getTeddyAsync() {
//   const response = await fetch(`http://localhost:3000/api/teddies/${pageId}`);
//   const teddy = await response.json();
//   // afficher le produit de l'objet correspondant à l'id récupéré
//   // sélectionner élement du DOM
//   const teddyDetails = document.getElementById("teddySelection");
//   const teddyImage = document.getElementById("teddyImage");
//   console.log(teddyDetails);
//   console.log(teddyImage);

//   teddyDetails.innerHTML += `
//       <h3 id="teddyName" class="text-gray-700 uppercase text-lg">${teddy.name}</h3>
//       <span id="teddyPrice" class="text-gray-500 mt-3">${teddy.price}€</span>`;
//   teddyImage.innerHTML += `
//       <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
//       src="${teddy.imageUrl}" alt="Ours en peluche"/>`;
//   return teddy;
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   let teddy = [];
//   try {
//     teddy = await getTeddyAsync();
//   } catch (e) {
//     console.log("Error!");
//     console.log(e);
//   }
// });

// async function addTeddyToCart() {
//   const response = await fetch(`http://localhost:3000/api/teddies/${pageId}`);
//   const teddytoCart = await response.json();

//   // remplir le cart
//   cartOpen();
//   document.getElementById("name").innerText = teddyToCart.name;
//   document.getElementById("price").innerText = teddyToCart.price;
//   document.getElementById("image").innerHTML = teddyToCart.imageUrl;

//   const cartName = teddytoCart.name;
//   const cartPrice = teddytoCart.price;
//   const cartImage = teddytoCart.imageUrl;
//   const cartId = nameTeddy.getAttribute("data-id");

//   let teddyToCart = {
//     cartId,
//     cartName,
//     cartPrice,
//     cartImage,
//   };
//   console.log(selectedProduct);
// }

// document.getElementById("order-button").addEventListener("click", async () => {
//   let teddyToCart = [];
//   try {
//     teddyToCart = await addTeddyToCart();
//   } catch (e) {
//     console.log("Error!");
//     console.log(e);
//   }
// });

// // fetch(`http://localhost:3000/api/teddies/${pageId}`)
// //   .then(function (res) {
// //     if (res.ok) {
// //       return res.json();
// //     }
// //   })
// //   .then(function (value) {
// //     const teddyDetails = document.getElementById("teddySelection");
// //     const teddyImage = document.getElementById("teddyImage");
// //     console.log(teddyDetails);
// //     console.log(teddyImage);

// //     const structureDetails = `
// //     <h3 id="teddy-name" data-id=${pageId} class="text-gray-700 uppercase text-lg">${value.name}</h3>
// //     <span id="teddy-price" class="text-gray-500 mt-3">${value.price}€</span>`;
// //     const structureImage = `
// //     <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
// //     src="${value.imageUrl}" alt="Ours en peluche"/>`;

// //     teddyDetails.innerHTML = structureDetails;
// //     teddyImage.innerHTML = structureImage;
// //   })
// //   .catch(function (err) {
// //     // Une erreur est survenue
// //   });

// // const nameTeddy = document.getElementById("teddyName");
// // const cartName = document.getElementById("teddyName").innerText;
// // const cartPrice = document.getElementById("teddyPrice").innerText;
// // const cartImage = document.getElementById("teddyImage").innerHTML;
// // const cartId = nameTeddy.getAttribute("data-id");

// // let selectedProduct = {
// //   id: cartId,
// //   name: cartName,
// //   price: cartPrice,
// //   image: cartImage,
// //   quantity: 1,
// // };

// // console.log(selectedProduct);
// // console.log(nameTeddy);

// //---------------Gestion du panier-----------------------

// // const cartName = document.querySelector("#teddy-name");
// // console.log(cartName);
