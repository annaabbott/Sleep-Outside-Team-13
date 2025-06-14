// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

const SO_CART = "so-cart";

// save data to local storage
export function getShoppingCart() {
  return JSON.parse(localStorage.getItem(SO_CART) || "[]");
}

export function addProductToCart(product) {
  const cartItems = getShoppingCart();
  const match = cartItems.find((item) => item.Id === product.Id);
  if (match) {
    match.count++;
  } else {
    product.count = 1;
    cartItems.push(product);
  }
  setShoppingCart(cartItems);
}

// save data to local storage
export function setShoppingCart(data) {
  localStorage.setItem(SO_CART, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  const cartItems = getShoppingCart();
  const itemCount = cartItems.length;

  cartCountElement.textContent = itemCount;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}

export function calcSubTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total = total + item.FinalPrice;
  });
  return total;
}

export async function convertToJson(response) {
  const json = await response.json();
  if (!response.ok) {
    throw { name: "servicesError", message: jsonResponse };
  }
  return json;
}
