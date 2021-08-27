// Afficher les produits sur la page

let _id = [];

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

const cartCounterList = document.getElementById("cartCounterAlert2");
console.log(cartCounterList);
const qtyTotal = localStorage.getItem("totalQty");
console.log(qtyTotal);
cartCounterList.innerText = qtyTotal;
