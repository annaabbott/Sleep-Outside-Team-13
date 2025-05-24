import ProductData from "./ProductData.mjs"; //this has the category url
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list"); 
const categoryList = new ProductList(category, dataSource, element);
categoryList.init();