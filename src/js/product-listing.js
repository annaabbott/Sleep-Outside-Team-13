import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

async function initialize() {
  try {
    await loadHeaderFooter();
    
    const category = getParam("category");
    if (!category) {
      throw new Error("No category specified");
    }
    
    const dataSource = new ExternalServices();
    const element = document.querySelector(".product-list");
    
    if (element) {
      const listing = new ProductList(category, dataSource, element);
      await listing.init();
    } else {
      console.error("Could not find product list element");
    }
  } catch (error) {
    console.error("Initialization error:", error);
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `<div class="error">Error loading products: ${error.message}</div>`;
    }
  }
}

// Iniciar solo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initialize);