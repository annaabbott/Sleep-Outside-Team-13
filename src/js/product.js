import {
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

