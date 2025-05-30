import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

(async () => {
  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  const tentList = new ProductList("tents", dataSource, element);
  const productList = (await tentList.init()).filter(
    (product) => product.ImgIsValid,
  );
  tentList.renderList(productList);
})();
