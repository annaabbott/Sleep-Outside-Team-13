import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

// Test the parameter
console.log("Product ID:", productId);

// Test product lookup
dataSource
  .findProductById(productId)
  .then((product) => console.log("Product Details:", product))
  .catch((error) => console.error(error));

// Existing cart functionality remains unchanged
function addProductToCart(product) {
  debugger;
  let cartItems = getLocalStorage("so-cart", "[]");
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const id = e.target.dataset.id;
  console.log(`addToCartHandler - id: ${id}`);
  const product = await dataSource.findProductById(e.target.dataset.id);
  console.log(`addToCartHandler - product`, product);

  addProductToCart(product);
}
// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
