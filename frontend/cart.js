function cartOpen() {
  let cart = document.getElementById("dropdownCart");
  console.log(cart);
  let body = document.getElementById("body");
  console.log(body);

  cart.classList.add("cartOpened");
  body.classList.add("cartOpened");
}
