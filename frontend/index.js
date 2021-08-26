// afficher le compteur du panier

const cartCounter = document.getElementById("cartCounterAlert3");
console.log(cartCounter);
const qtyTotal = localStorage.getItem("totalQty");
console.log(qtyTotal);
cartCounter.innerText = qtyTotal;
