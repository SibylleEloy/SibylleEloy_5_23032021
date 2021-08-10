// recupérer la chaîne de requête dans l'url
const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

// extraire l'id de l'url
const pageId = queryStringUrlId.slice(4);
console.log(pageId);

//-------------------Affichage produit------------------

fetch(`http://localhost:3000/api/teddies/${pageId}`)
  .then((response) => response.json())
  .then((data) => putTeddyOnPage(data));

function putTeddyOnPage(data) {
  // sélectionner élement du DOM
  const teddyDetails = document.getElementById("teddySelection");
  const teddyImage = document.getElementById("teddyImage");
  console.log(teddyDetails);
  console.log(teddyImage);

  teddyDetails.innerHTML += `
    <h3 id="teddyName" class="text-gray-700 uppercase text-lg">${data.name}</h3>
    <p class="text-gray-500 mt-3">Prix : <span id="teddyPrice">${data.price}</span> € </span>`;
  teddyImage.innerHTML += `
    <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
    src="${data.imageUrl}" alt="Ours en peluche"/>`;
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
