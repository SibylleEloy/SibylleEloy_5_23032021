// OK

// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// OK
// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   for (let i = 0; i < data.length; i++) {
//     const name = data[i]["name"];
//     const description = data[i]["description"];

//     document.getElementById("name").innerHTML += name;
//     document.getElementById("description").innerHTML += description;
//   }
// }
// ---------------

// add the teddies to the page
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((data) => putTeddiesOnPage(data));

function putTeddiesOnPage(data) {
  const teddyCollectionDiv = document.getElementById("teddiesCollection");

  data.forEach(function (teddy) {
    teddyCollectionDiv.innerHTML += `

		<div class="teddyCard" id="${teddy._id}">
            <img style="width: 100%" src="${teddy.imageUrl}" alt="Teddy Bear" class="block h-60 rounded-lg shadow-lg" />
            <div class="flex items-center justify-between mt-3">
            <div>
                <div class="font-medium">${teddy.name}</div>
                <span class="text-xs font-medium text-gray-600"
                  ><i class="fas fa-shopping-cart"></i></span>
                <span class="text-xs font-medium ml-1 text-indigo-500"
                  >${teddy.description}</span>
            </div>
        </div>
        <button class="bg-white
              hover:bg-gray-100
              text-gray-600
              font-semibold
              py-2
              px-4
              my-4
              border border-gray-400
              rounded
              shadow
            ">Voir plus</button>
			</div>
		`;
  });
}

const teddyCard = document.getElementById("5be9c8541c9d440000665243");
console.log(teddyCard);

// .addEventListener('click', function() {
//     console.log(data-id);
// };

// essai raté
// fetch("http://localhost:3000/api/teddies")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   for (let i = 0; i < data.length; i++) {
//     var newElement = document.createElement("div");
//     newElement.innerHTML = "KPI Name : " + data[i].name;
//     document.getElementById("name").appendChild(newElement);
//   }
// }

// for (let i = 0; i < url.length; i++) {
//   fetch(url[i])
//     .then((result) => result.json())
//     .then((res) => {
//       console.log(res);
//       renderTeddy(res);
//     })
//     .catch((err) => console.log(err));
// }

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243")
//   .then((response) => response.json())
//   .then((data) => renderTeddy(data));

// function renderTeddy(data) {
//   const name = document.getElementById("name");
//   const description = document.getElementById("description");
//   name.innerHTML = data.name;
//   description.innerHTML = data.description;
// }

// ------------

// document.getElementById("clickButton").addEventListener("click", askTeddy);

// function askTeddy() {
//   fetch("http://localhost:3000/api/teddies")
//     .then(function (res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function (value) {
//       document.getElementById("Ours1").innerText = value.name;
//     })
//     .catch(function (err) {
//       // Une erreur est survenue
//     });
// }
