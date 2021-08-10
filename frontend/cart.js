//-------------Dropdown cart----------------------------

function cartOpen() {
  let cart = document.getElementById("dropdownCart");
  console.log(cart);
  // let body = document.getElementById("body");
  // console.log(body);

  cart.classList.add("cartOpened");
  // body.classList.add("cartOpened");
}

// ----------------Function localStorage-----------------------------
// This code below should only be run if you are not already storing a serialized array in your localStorage session variable.
// var a = [];
// a.push(JSON.parse(localStorage.getItem('session')));
// localStorage.setItem('session', JSON.stringify(a));

function saveDataToLocalStorage(selectedProduct) {
  var productInLocalStorage = [];
  // Parse the serialized data back into an aray of objects
  productInLocalStorage = JSON.parse(localStorage.getItem("session")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  productInLocalStorage.push(selectedProduct);
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("session", JSON.stringify(productInLocalStorage));

  // afficher le panier
  const cartPosition = document.getElementById("cartStructure");
  console.log(cartPosition);

  let structureCartProduct = [];
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
        </svg></button>
      </div>
      <div id="price">${productInLocalStorage[j].price} €</div>
      </div>`;
  }
  if (j == productInLocalStorage.length) {
    cartPosition.innerHTML = structureCartProduct;
  }

  console.log(productInLocalStorage);
  // supprimer des éléments du panier
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  console.log(deleteBtn);

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();

      let idToDelete = productInLocalStorage[k].id;
      console.log(idToDelete);

      productInLocalStorage = productInLocalStorage.filter(
        (element) => element.id !== idToDelete
      );
      console.log(productInLocalStorage);

      localStorage.setItem("session", JSON.stringify(productInLocalStorage));

      alert("Product deleted!");
      window.location.href = "page-product.html";
    });
  }
}

//-----------Gestion du panier----------------------

function addToCart() {
  // compter les quantités de produit - nb clic sur le bouton order
  // clicks += 1;
  // document.getElementById("clicks").innerHTML = clicks;

  // récuperer les données produit de l'utilisateur
  const cartName = document.getElementById("teddyName").innerText;
  console.log(cartName);
  // document.getElementById("name").innerText = cartName;

  const cartPrice = document.getElementById("teddyPrice").innerText;
  console.log(cartPrice);
  // document.getElementById("price").innerText = cartPrice;

  const cartImage = document.getElementById("teddyImage").innerHTML;
  console.log(cartImage);
  // document.getElementById("image").innerHTML = cartImage;

  let selectedProduct = {
    id: pageId,
    image: cartImage,
    name: cartName,
    price: cartPrice,
    quantity: 1,
  };

  console.log(selectedProduct);

  saveDataToLocalStorage(selectedProduct);

  // Affichage des produits dans le panier
}

// let clicks = 0;
// function addToCart() {
//   // compter les quantités de produit - nb clic sur le bouton order
//   clicks += 1;
//   document.getElementById("clicks").innerHTML = clicks;
//   console.log(clicks);
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

// // ----------------localStorage-----------------------------

// //   let selectedProduct = {
// //     name: cartName,
// //     price: cartPrice,
// //     quantity: clicks,
// //   };
// //   console.log(selectedProduct);
// // }

// // let selectedProduct_serialized = JSON.stringify(selectedProduct);
// // console.log(selectedProduct_serialized);

// // localStorage.setItem("selectedProduct", selectedProduct_serialized);
// // console.log(localStorage);

// // let selectedProduct_deserialized = JSON.parse(
// //   localStorage.getItem("selectedProduct")
// // );
// // console.log(selectedProduct_deserialized);
// // // --------------------------------------

// // //----------Afichage du panier----------------
// // console.log(coucou);

// // let selectedProduct_deserialized = JSON.parse(
// //   localStorage.getItem("selectedProduct")
// // );
// // console.log(selectedProduct_deserialized);
// // // sélection de la position où j'injecte le code HTML

// // const positionCart = document.getElementById("name");
// // console.log(positionCart);

// // if (selectedProduct_deserialized === null) {
// //   console.log("je suis vide");
// //   positionCart.innerHTML += `
// //     <div>Cart is empty</div>`;
// // } else {
// //   console.log("Je ne suis pas vide");
// // }
// // // document.getElementById("total").innerText = total;
// // // let total = 0;
// // // let price = 0;
// // // for (let i = 0; i < price.length; i++) {
// // //   total += price[i];
// // // }
// // // console.log(total);
