// recupérer la châine de requête dans l'url

const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

// extraire l'id de l'url
const pageId = queryStringUrlId.slice(4);
console.log(pageId);

// afficher le produit de l'objet correspondant à l'id récupéré

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
    <h3 class="text-gray-700 uppercase text-lg">${data.name}</h3>
    <span class="text-gray-500 mt-3">${data.price}€</span>`;
  teddyImage.innerHTML += `
    <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto"
    src="${data.imageUrl}" alt="Ours en peluche"/>`;
}
