// js/ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails();
      document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    } catch (error) {
      console.error('Error initializing product details:', error);
    }
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    if (!this.product) return;

    // Update product name and title
    document.title = this.product.Name;
    document.getElementById('product-name').textContent = this.product.Name;

    // Update brand
    document.getElementById('brand-name').textContent = this.product.Brand.Name;

    // Update price
    document.querySelector('.product-card__price').textContent = 
      `$${this.product.FinalPrice.toFixed(2)}`;

    // Update image
    const imgElement = document.getElementById('product-image');
    imgElement.src = this.product.Image.replace('../', '/');
    imgElement.alt = this.product.Name;

    // Update description
    const descriptionElement = document.getElementById('product-description');
    descriptionElement.innerHTML = this.product.DescriptionHtmlSimple;

    // Update color
    const colorElement = document.getElementById('product-color');
    if (this.product.Colors?.length > 0) {
      colorElement.textContent = this.product.Colors[0].ColorName;
    }

    // Set data-id for add to cart button
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}