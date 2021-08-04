// dropdown cart

function cartOpen() {
  let cart = document.getElementById("dropdownCart");
  console.log(cart);
  let body = document.getElementById("body");
  console.log(body);

  cart.classList.add("cartOpened");
  body.classList.add("cartOpened");
}

//-----------Gestion du panier---------------
// récuperation des données produit de l'utilisateur

// compter le nombre de clics sur le bouton Order
// let clicks = 0;
// function onClick() {
//   clicks += 1;
//   document.getElementById("clicks").innerHTML = clicks;
// }
// console.log(clicks);

let clicks = 0;
function addToCart() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  console.log(clicks);
  // sélectionner élement du DOM

  //   const teddyName = document.getElementById("name").innerHTML
  //   console.log(teddyName;
  const name = document.getElementById("teddyName").innerText;
  console.log(name);

  document.getElementById("name").innerText = name;

  //   teddyCart.innerHTML += `
  //     <div class="font-bold">${name}</div>`;
  //     <h3 class="text-gray-700 uppercase text-lg">${data.name}</h3>
  //     <span class="text-gray-500 mt-3">${data.price}€</span>`;
  //   teddyImage.innerHTML += `
  //     <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
  //     src="${data.imageUrl}" alt="Ours en peluche"/>`;
}
