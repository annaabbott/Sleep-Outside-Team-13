import {
  getLocalStorage,
  setLocalStorage,
  getParam,
  loadHeaderFooter,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

//////////////////////////////////////////////////////////////////////////

// Test product lookup
dataSource
  .findProductById(productId)
  .then((productItem) => console.log("Product Details:", productItem))
  .catch((error) => console.error(error));

// Existing cart functionality remains unchanged
function addProductToCart(productItem) {
  let cartItems = getLocalStorage("so-cart", "[]");
  cartItems.push(productItem);
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
