//----------------Gestion du panier et localStorage---------------------

//******Récuperer les données produit au clic sur bouton Order Now
// let clicks = 0;
function addToCart(option) {
  // compter les quantités de produit - nb clic sur le bouton order
  // clicks += 1;
  // document.getElementById("cart").innerHTML = clicks;

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

  //******Enregistrer les données dans le localStorage

  // If you are not already storing a serialized array in your localStorage session variable.
  // var a = [];
  // a.push(JSON.parse(localStorage.getItem('session')));
  // localStorage.setItem('session', JSON.stringify(a));

  // Parse the serialized data back into an aray of objects
  productInLocalStorage = JSON.parse(localStorage.getItem("session")) || [];
  // Push the new data (whether it be an object or anything else) onto the array

  option == "add" ? productInLocalStorage.push(selectedProduct) : "";
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("session", JSON.stringify(productInLocalStorage));

  //*******Afficher le panier

  // afficher le compteur
  const cartCounter = document.getElementById("cartCounterAlert");
  console.log(productInLocalStorage.length);
  cartCounter.innerText = productInLocalStorage.length;

  // afficher la dropdown
  const cartPosition = document.getElementById("cartStructure");
  console.log(cartPosition);

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
  console.log(productInLocalStorage);

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

      document.getElementById("refreshBtn").click();
    });
  }

  //******Supprimer le panier en totalité

  const detelAllBtnHtml = `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-3 py-1 px-1 border border-gray-400 rounded shadow" id="deleteAllBtn"> Empty Cart </button>`;
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

  const displayTotalPriceHtml = `<div>Checkout - ${cartTotalPrice} €</div>`;

  document.getElementById("checkoutBtn").innerHTML = displayTotalPriceHtml;

  return false;
}
