import ProductData from "./ProductData.mjs"; //this has the category url
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list"); 
const categoryList = new ProductList(category, dataSource, element);
categoryList.init();

const productCategory = document.querySelector("#product-category");

const categoryNames = {
    tents: "Tents",
    backpacks: "Backpacks",
    "sleeping-bags": "Sleeping Bags",
    hammocks: "Hammocks"
}

productCategory.textContent = categoryNames[category];