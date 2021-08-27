let productInLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(productInLocalStorage);

//----------------Gestion du panier et localStorage---------------------

// afficher les produits dans le panier

const cartPosition = document.querySelector("#container-products-cart");
const cartFull = document.querySelector("#fullCart");
console.log(cartPosition);

let structureCartProduct = [];

if (productInLocalStorage === null || productInLocalStorage == 0) {
  const emptyCart = `<a href="page-product-list.html" class="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                        Commencez les achats
                    </a>`;
  cartPosition.innerHTML = emptyCart;
} else {
  const fullCart = ` <a href="page-product-list.html" class="flex font-semibold text-indigo-600 text-sm mt-10">
<svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
Continuer les achats
</a>`;
  cartFull.innerHTML = fullCart;

  for (j = 0; j < productInLocalStorage.length; j++) {
    structureCartProduct =
      structureCartProduct +
      `<a href="page-product.html?id=${productInLocalStorage[j].id}">
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
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
                       
                    
                        <span class="text-center w-1/5 font-semibold text-sm">${productInLocalStorage[j].quantity}</span>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">${productInLocalStorage[j].price} €</span>
                    <span class="text-center w-1/5 font-semibold text-sm">${productInLocalStorage[j].total} €</span>
                </div>
            </a>`;
  }
  if (j == productInLocalStorage.length) {
    cartPosition.innerHTML = structureCartProduct;
  }
}

// Updater la quantité totale du panier
let totalQuantity = [];

for (let m = 0; m < productInLocalStorage.length; m++) {
  let cartQuantities = Number(productInLocalStorage[m].quantity);
  totalQuantity.push(cartQuantities);
  console.log(totalQuantity);
}
const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
const cartTotalQuantity = totalQuantity.reduce(reducer1, 0).toLocaleString();
console.log(cartTotalQuantity);
localStorage.setItem("totalQty", cartTotalQuantity);

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

    localStorage.setItem("products", JSON.stringify(productInLocalStorage));
    window.location.reload();
  });
}

//  ******Supprimer le panier en totalité
const detelAllBtnHtml = `<div class="flex mt-4"><button id="deleteAllBtn" class="uppercase p-3 flex items-center  border border-red-600 text-red-600 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12 ">
<svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);"><path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path><path d="M12 2h8v2h-8z" fill="currentColor"></path></svg>
        </button></div>`;
cartPosition.insertAdjacentHTML("beforeend", detelAllBtnHtml);
const deteleAllBtn = document.getElementById("deleteAllBtn");
console.log(deleteAllBtn);
deteleAllBtn.addEventListener("click", (e) => {
  e.preventDefault;
  localStorage.removeItem("products");
  window.location.reload();
  localStorage.removeItem("totalPrice");
  localStorage.removeItem("totalQty");
});

//******Calculer le montant total du panier
let totalPrice = [];

for (let k = 0; k < productInLocalStorage.length; k++) {
  let cartPrices = Number(productInLocalStorage[k].total);
  totalPrice.push(cartPrices);
  console.log(totalPrice);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const cartTotalPrice = totalPrice.reduce(reducer, 0).toLocaleString();
console.log(cartTotalPrice);
localStorage.setItem("totalPrice", cartTotalPrice);

const displayTotalPriceHtml = `<div>${cartTotalPrice} €</div>`;

document.getElementById("orderPrice").innerHTML = displayTotalPriceHtml;
document.getElementById("totalCost").innerHTML = displayTotalPriceHtml;

//-------------------Récupérer les données Checkout------------------------

//***Afficher le formulaire
const displayFormHtml = () => {
  const formPosition = document.getElementById("form");
  const structureForm = `<label class="font-medium inline-block mb-3 text-sm uppercase">Contact</label>
    <div class="py-2">
      <div class="max-w-md">
        <div class="grid grid-cols-1 gap-6">
          <label class="block">
            <span class="block text-sm font-medium text-gray-700">Prénom</span>
            <input id="firstName"
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
            <span class="block text-sm font-medium text-gray-700">Nom</span>
            <input id="lastName"
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
            <span class="block text-sm font-medium text-gray-700">Email</span>
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
              placeholder="david@exemple.com"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="py-10">
      <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Expédition</label>
      <div class="mt-2">
        <div class="col-span-6">
          <label for="street_address" class="block text-sm font-medium text-gray-700">Adresse</label>
          <input id="address" type="text" name="street_address" id="street_address" autocomplete="street-address" class="
          mt-0
          block
          w-full
          px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-black
        ">
        </div>

        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
          <label for="city" class="mt-4 block text-sm font-medium text-gray-700">Ville</label>
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

// checkout récupérer les données dans le localStorage et stocker produits et données clients

function store() {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  console.log(contact);

  //*****Validation des données
  const textAlert = (value) => {
    return `${value}: Numbers and symbols are not allowed \n Min 3 to max 20 characters`;
  };

  const regExNameCity = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  function firstNameControl() {
    const formFirstName = contact.firstName;
    if (regExNameCity(formFirstName)) {
      return true;
    } else {
      alert(textAlert("First Name"));
      return false;
    }
  }

  function lastNameControl() {
    const formLastName = contact.lastName;
    if (regExNameCity(formLastName)) {
      return true;
    } else {
      alert(textAlert("Last Name"));
      return false;
    }
  }

  function cityControl() {
    const formCity = contact.city;
    if (regExNameCity(formCity)) {
      return true;
    } else {
      alert(textAlert("City"));
      return false;
    }
  }

  function emailControl() {
    const formEmail = contact.email;
    if (regExEmail(formEmail)) {
      return true;
    } else {
      alert("Email is not valid");
      return false;
    }
  }

  function addressControl() {
    const formAddress = contact.address;
    if (regExAddress(formAddress)) {
      return true;
    } else {
      alert("Address is not valid");
      return false;
    }
  }

  if (
    firstNameControl() &&
    lastNameControl() &&
    cityControl() &&
    emailControl() &&
    addressControl()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));

    let products = [];
    for (let n = 0; n < productInLocalStorage.length; n++) {
      let cartIds = productInLocalStorage[n].id;
      products.push(cartIds);
    }
    sendToServer(contact, products);
    // window.location.href = "page-confirmation.html";
  } else {
    alert("Please fill the form");
  }

  // const promise = fetch("http://localhost:3000/api/teddies/order", {
  //   method: "POST",
  //   body: JSON.stringify(order),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // console.log(promise);

  // promise.then(async (response) => {
  //   try {
  //     const content = await response.json();
  //     console.log(content);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  // window.location.href = "page-confirmation.html";
}

function sendToServer(contact, products) {
  const dataPost = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  };

  fetch("http://localhost:3000/api/teddies/order", dataPost)
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((order) => {
      console.log(order);
      console.log(order.orderId);
      localStorage.setItem("orderId", order.orderId);
      window.location = "page-confirmation.html";
    })
    .catch((e) => {
      console.log(e);
    });
}
