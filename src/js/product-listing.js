import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

async function initialize() {
  await loadHeaderFooter(); // Espera a que el header se cargue
  
  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element);

  listing.init();
}

initialize(); // Llama a la función inicializadora