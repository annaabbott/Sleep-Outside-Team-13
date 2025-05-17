import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

// Test the parameter
// console.log("Product ID:", productId);

// Test product lookup
dataSource
  .findProductById(productId)
  // .then((productItem) => console.log("Product Details:", productItem))
  .catch((error) => console.error(error));

// Existing cart functionality remains unchanged
function addProductToCart(productItem) {
  let cartItems = getLocalStorage("so-cart");
  cartItems.push(productItem);
  setLocalStorage("so-cart", cartItems);
}

document.getElementById("addToCart").addEventListener("click", async (e) => {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productItem);
});
