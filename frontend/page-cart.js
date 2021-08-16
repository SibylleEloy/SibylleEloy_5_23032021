let productInLocalStorage = JSON.parse(localStorage.getItem("session"));
console.log(productInLocalStorage);

//----------------Gestion du panier et localStorage---------------------

// afficher les compteurs
const cartCounterList = document.getElementById("cartCounterAlert");
console.log(cartCounterList);
console.log(productInLocalStorage.length);
cartCounterList.innerText = productInLocalStorage.length;

// afficher les produits dans le panier

const cartPosition = document.querySelector("#container-products-cart");
console.log(cartPosition);

let structureCartProduct = [];

if (productInLocalStorage === null || productInLocalStorage == 0) {
  const emptyCart = `<div class="font-bold text-sm">Cart is empty</div>`;
  cartPosition.innerHTML = emptyCart;
} else {
  for (j = 0; j < productInLocalStorage.length; j++) {
    structureCartProduct =
      structureCartProduct +
      `<div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    ${productInLocalStorage[j].image}
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">${productInLocalStorage[j].name}</span>
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
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
                  <input class="mx-2 border text-center w-8" type="text" value="1">
                  <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">${productInLocalStorage[j].price} €</span>
                <span class="text-center w-1/5 font-semibold text-sm">$400.00</span>
              </div>`;
  }
  if (j == productInLocalStorage.length) {
    cartPosition.innerHTML = structureCartProduct;
  }
}

//******Supprimer des éléments du panier
let deleteBtn = document.querySelectorAll(".deleteBtn");
console.log(deleteBtn);

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

    localStorage.setItem("session", JSON.stringify(productInLocalStorage));

    window.location.reload();
  });
}

//  ******Supprimer le panier en totalité

const detelAllBtnHtml = `<div class="flex justify-center mt-4"><button id="deleteAllBtn" class="uppercase p-3 flex items-center  border border-red-600 text-red-600 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12 ">
<svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);"><path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path><path d="M12 2h8v2h-8z" fill="currentColor"></path></svg>
        </button></div>`;
cartPosition.insertAdjacentHTML("beforeend", detelAllBtnHtml);
const deteleAllBtn = document.getElementById("deleteAllBtn");
console.log(deleteAllBtn);
deteleAllBtn.addEventListener("click", (e) => {
  e.preventDefault;
  localStorage.removeItem("session");

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

const displayTotalPriceHtml = `<div>${cartTotalPrice} €</div>`;

document.getElementById("orderPrice").innerHTML = displayTotalPriceHtml;
document.getElementById("totalCost").innerHTML = displayTotalPriceHtml;

//-------------------Récupérer les données Checkout------------------------

// afficher le formulaire
const displayFormHtml = () => {
  const formPosition = document.getElementById("form");
  const structureForm = `<label class="font-medium inline-block mb-3 text-sm uppercase">Contact</label>
    <div class="py-2">
      <div class="max-w-md">
        <div class="grid grid-cols-1 gap-6">
          <label class="block">
            <span class="block text-sm font-medium text-gray-700">Full name</span>
            <input id="fullName"
              type="text"
              class="
                mt-0
                block
                w-full
                px-0.5
                border-0 border-b-2 border-gray-200
                focus:ring-0 focus:border-black
              "
              placeholder=""
            />
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-gray-700">Email address</span>
            <input id="email"
              type="email"
              class="
                mt-0
                block
                w-full
                px-0.5
                border-0 border-b-2 border-gray-200
                focus:ring-0 focus:border-black
              "
              placeholder="john@example.com"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="py-10">
      <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Shipping</label>
      <div class="mt-2">
        <div class="col-span-6">
          <label for="street_address" class="block text-sm font-medium text-gray-700">Street address</label>
          <input id="adress" type="text" name="street_address" id="street_address" autocomplete="street-address" class="
          mt-0
          block
          w-full
          px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-black
        ">
        </div>

        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
          <label for="city" class="mt-4 block text-sm font-medium text-gray-700">City</label>
          <input id="city" type="text" name="city" id="city" class="
          mt-0
          block
          w-full
          px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-black
        ">
        </div>
      </div>
    </div>`;
  formPosition.insertAdjacentHTML("afterend", structureForm);
};

displayFormHtml();

// récupérer les données dans le localStorage

function store() {
  let inputFullName = document.getElementById("fullName");
  localStorage.setItem("Full Name", inputFullName.value);

  let inputEmail = document.getElementById("email");
  localStorage.setItem("Email", inputEmail.value);

  let inputAddress = document.getElementById("adress");
  localStorage.setItem("Address", inputAddress.value);

  let inputCity = document.getElementById("city");
  localStorage.setItem("City", inputCity.value);
}

// //----------------Gestion du panier et localStorage---------------------

// //******Récuperer les données produit au clic sur bouton Order Now
// // let clicks = 0;
// function addToCart(option) {
//   // compter les quantités de produit - nb clic sur le bouton order
//   // clicks += 1;
//   // document.getElementById("cart").innerHTML = clicks;

//   // récuperer les données produit de l'utilisateur
//   const cartName = document.getElementById("teddyName").innerText;
//   console.log(cartName);
//   // document.getElementById("name").innerText = cartName;

//   const cartPrice = document.getElementById("teddyPrice").innerText;
//   console.log(cartPrice);
//   // document.getElementById("price").innerText = cartPrice;

//   const cartImage = document.getElementById("teddyImage").innerHTML;
//   console.log(cartImage);
//   // document.getElementById("image").innerHTML = cartImage;

//   let selectedProduct = {
//     id: pageId,
//     image: cartImage,
//     name: cartName,
//     price: cartPrice,
//     quantity: 1,
//   };

//   console.log(selectedProduct);

//   //******Enregistrer les données dans le localStorage

//   // If you are not already storing a serialized array in your localStorage session variable.
//   // var a = [];
//   // a.push(JSON.parse(localStorage.getItem('session')));
//   // localStorage.setItem('session', JSON.stringify(a));

//   // Parse the serialized data back into an aray of objects
//   productInLocalStorage = JSON.parse(localStorage.getItem("session")) || [];
//   // Push the new data (whether it be an object or anything else) onto the array

//   option == "add" ? productInLocalStorage.push(selectedProduct) : "";
//   // Re-serialize the array back into a string and store it in localStorage
//   localStorage.setItem("session", JSON.stringify(productInLocalStorage));

//   //*******Afficher le panier

//   // afficher le compteur
//   const cartCounter = document.getElementById("cartCounterAlert");
//   console.log(productInLocalStorage.length);
//   cartCounter.innerText = productInLocalStorage.length;

//   // afficher la dropdown
//   const cartPosition = document.getElementById("cartStructure");
//   console.log(cartPosition);

//   let structureCartProduct = [];
//   console.log(productInLocalStorage);

//   if (productInLocalStorage === null || productInLocalStorage == 0) {
//     const emptyCart = `
//       <div class="flex-auto text-sm w-32">Cart is empty</div>`;
//     cartPosition.innerHTML = emptyCart;
//   } else {
//     for (j = 0; j < productInLocalStorage.length; j++) {
//       structureCartProduct =
//         structureCartProduct +
//         `<div id="image" class="p-2 w-12">
//           ${productInLocalStorage[j].image}
//         </div>
//         <div class="flex-auto text-sm w-32">
//           <div id="name" class="font-bold">${productInLocalStorage[j].name}</div>
//           <div id="quantity" class="text-gray-400">Quantity: 1</div>
//         </div>
//         <div class="flex flex-col w-18 font-medium items-end">
//         <div class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
//           <button class="deleteBtn"><svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="100%"
//             height="100%"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="feather feather-trash-2"
//           >
//             <polyline points="3 6 5 6 21 6"></polyline>
//             <path
//               d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
//             ></path>
//             <line x1="10" y1="11" x2="10" y2="17"></line>
//             <line x1="14" y1="11" x2="14" y2="17"></line>
//             </svg>
//           <input class="index-produit" type="hidden" value=${j}/></button>
//         </div>
//         <div id="price">${productInLocalStorage[j].price} €</div>
//         </div>`;
//     }
//     if (j == productInLocalStorage.length) {
//       cartPosition.innerHTML = structureCartProduct;
//     }
//   }
//   console.log(productInLocalStorage);

//   //******Supprimer des éléments du panier
//   let deleteBtn = document.querySelectorAll(".deleteBtn");
//   console.log(deleteBtn);

//   for (let k = 0; k < deleteBtn.length; k++) {
//     deleteBtn[k].addEventListener("click", (event) => {
//       event.preventDefault();

//       productInLocalStorage.splice(k, 1);

//       // productInLocalStorage = productInLocalStorage.filter(
//       //   (element) => element.id !== idToDelete
//       // );
//       console.log(
//         "element courant du panier",
//         JSON.stringify(productInLocalStorage)
//       );

//       localStorage.setItem("session", JSON.stringify(productInLocalStorage));

//       document.getElementById("refreshBtn").click();
//     });
//   }

//   //******Supprimer le panier en totalité

//   const detelAllBtnHtml = `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-3 py-1 px-1 border border-gray-400 rounded shadow" id="deleteAllBtn"> Empty Cart </button>`;
//   cartPosition.insertAdjacentHTML("beforeend", detelAllBtnHtml);
//   const deteleAllBtn = document.getElementById("deleteAllBtn");
//   console.log(deleteAllBtn);
//   deteleAllBtn.addEventListener("click", (e) => {
//     e.preventDefault;
//     localStorage.removeItem("session");

//     window.location.reload();
//   });

//   //******Calculer le montant total du panier
//   let totalPrice = [];

//   for (let k = 0; k < productInLocalStorage.length; k++) {
//     let cartPrices = Number(productInLocalStorage[k].price);
//     totalPrice.push(cartPrices);
//     console.log(totalPrice);
//   }
//   const reducer = (accumulator, currentValue) => accumulator + currentValue;
//   const cartTotalPrice = totalPrice.reduce(reducer, 0).toLocaleString();
//   console.log(cartTotalPrice);

//   const displayTotalPriceHtml = `<div>Checkout - ${cartTotalPrice} €</div>`;

//   document.getElementById("checkoutBtn").innerHTML = displayTotalPriceHtml;

//   return false;
// }
