// dropdown cart

function cartOpen() {
  let cart = document.getElementById("dropdownCart");
  console.log(cart);
  let body = document.getElementById("body");
  console.log(body);

  cart.classList.add("cartOpened");
  body.classList.add("cartOpened");
}

//-----------Gestion du panier----------------------

let clicks = 0;
function addToCart() {
  // compter les quantités de produit - nb clic sur le bouton order
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  console.log(clicks);
  // récuperer les données produit de l'utilisateur
  const cartName = document.getElementById("teddyName").innerText;
  console.log(cartName);
  document.getElementById("name").innerText = cartName;

  const cartPrice = document.getElementById("teddyPrice").innerText;
  console.log(cartPrice);
  document.getElementById("price").innerText = cartPrice;

  const cartImage = document.getElementById("teddyImage").innerHTML;
  console.log(cartImage);
  document.getElementById("image").innerHTML = cartImage;

  // ----------------localStorage-----------------------------
  let selectedProduct = {
    name: cartName,
    price: cartPrice,
    quantity: clicks,
  };
  console.log(selectedProduct);

  let selectedProduct_serialized = JSON.stringify(selectedProduct);
  console.log(selectedProduct_serialized);
  localStorage.setItem("selectedProduct", selectedProduct_serialized);
  console.log(localStorage);
  let selectedProduct_deserialized = JSON.parse(
    localStorage.getItem("selectedProduct")
  );
  console.log(selectedProduct_deserialized);
}

// document.getElementById("total").innerText = total;
// let total = 0;
// let price = 0;
// for (let i = 0; i < price.length; i++) {
//   total += price[i];
// }
// console.log(total);
