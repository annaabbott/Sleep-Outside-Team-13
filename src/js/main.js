// main.js
import ProductData from '/js/ProductData.mjs';
import ProductList from '/js/ProductList.mjs'; // Corrige la ruta

// Crear instancias
const dataSource = new ProductData('tents');
const listElement = document.getElementById('product-list');

// Crear y inicializar ProductList
const productList = new ProductList('tents', dataSource, listElement);
productList.init(); // Esto ya maneja la carga y renderizado