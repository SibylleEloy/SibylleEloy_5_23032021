// Récupération de l'id et total de la commande

const idOrder = localStorage.getItem("orderId");
console.log(idOrder);

const totalPrice = localStorage.getItem("totalPrice");
console.log(totalPrice);

// Injection des infos dans la page confirmation

const orderPosition = document.getElementById("orderSummary");

const structureOrderSummary = `
<h1  class="text-3xl font-bold text-center mb-4 cursor-pointer">Vos informations</h1>
<p class="w-80 text-left text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Numéro de Commande:<br> ${idOrder}</p>
<p class="w-80 text-left text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Prix total : ${totalPrice} <span>€</span></p>
<p class="text-left ">Merci &#128522;</p>
`;

orderPosition.innerHTML = structureOrderSummary;

// Vider les produits du localStorage

function removeKeyLocalStorage(key) {
  localStorage.removeItem(key);
}

removeKeyLocalStorage("total");
removeKeyLocalStorage("products");
removeKeyLocalStorage("orderId");
removeKeyLocalStorage("totalQty");
