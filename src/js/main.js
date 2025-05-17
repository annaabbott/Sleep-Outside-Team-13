import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const list = new ProductList("tents", dataSource, element);

const productList = (await list.init()).filter((product) => product.ImgIsValid);
list.renderList(productList);
