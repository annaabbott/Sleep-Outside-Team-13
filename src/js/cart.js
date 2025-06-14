import { getShoppingCart, loadHeaderFooter, calcSubTotal } from "./utils.mjs";
const prodSection = document.querySelector(".products");

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getShoppingCart();
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cartSummary");
  prodSection.append(cartSummary);
  const cartTotal = document.createElement("p");
  cartTotal.classList.add("cartTotal");

  let total = calcSubTotal(cartItems);
  cartTotal.textContent = `Total: $${total}`;
  cartSummary.append(cartTotal);

  if (cartItems.length === 0) {
    cartSummary.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  console.log(`cartItemTemplate - item:`, item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">quantity: ${item.count}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// function calcSubTotal(cartItems) {
//   let total = 0;
//   cartItems.forEach((item) => {
//     total = total + item.FinalPrice;
//   });
//   return total;
// }
console.log("cart.js loaded");
renderCartContents();
