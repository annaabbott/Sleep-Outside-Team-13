import { getParam, loadHeaderFooter } from "./utils.mjs";
<<<<<<< HEAD
import ProductData from "./ProductData.mjs";
=======
import ExternalServices from "./ExternalServices.mjs";
>>>>>>> 1fb615a2eeb33ceb04da6cda2fe0eee2590fbea1
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

<<<<<<< HEAD
const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();
=======
const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

//////////////////////////////////////////////////////////////////////////

// Test product lookup
dataSource
  .findProductById(productId)
  .then((productItem) => console.log("Product Details:", productItem))
  .catch((error) => console.error(error));
>>>>>>> 1fb615a2eeb33ceb04da6cda2fe0eee2590fbea1
