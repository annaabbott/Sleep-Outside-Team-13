import { renderListWithTemplate } from './utils.mjs';
import { calculateDiscount } from './utils.mjs';


function productCardTemplate(product) {
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discount = hasDiscount ? 
    calculateDiscount(product.SuggestedRetailPrice, product.FinalPrice) : 0;

  return `
    <li class="product-card">
      ${hasDiscount ? 
        `<div class="discount-flag" aria-label="On sale">
          <span class="discount-percent">${discount}% Off</span>
        </div>` : ''}
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" loading="lazy">
        <h3 class="card__brand">${product.Brand?.Name || ''}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <div class="price-wrapper">
          ${hasDiscount ? 
            `<p class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</p>` : ''}
          <p class="final-price">$${product.FinalPrice.toFixed(2)}</p>
        </div>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      this.renderList(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,  // templateFn
      this.listElement,     // parentElement
      products,             // list
      'afterbegin',         // position
      true                  // clear
    );
  }
}