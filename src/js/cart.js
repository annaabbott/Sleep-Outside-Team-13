import { getLocalStorage } from "./utils.mjs";

const prodSection = document.querySelector(".products");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart", "[]");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cartSummary");
  cartSummary.classList.add("hide");
  prodSection.append(cartSummary);
  const cartTotal = document.createElement("p");
  cartTotal.classList.add("cartTotal");

  let total = calcTotal(cartItems);
  cartTotal.textContent = `Total: $${total}`;
  cartSummary.append(cartTotal);

  if (cartItems.length === 0) {
    cartSummary.classList("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calcTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total = total + item.FinalPrice;
  });
  return total;
}

renderCartContents();
