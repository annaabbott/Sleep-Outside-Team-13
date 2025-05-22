import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        // Update the DOM with product details
        document.querySelector('h3').textContent = this.product.Brand.Name;
        document.querySelector('h2').textContent = this.product.NameWithoutBrand;

        const imgElement = document.querySelector('.product-detail img');
        imgElement.src = this.product.Image;
        imgElement.alt = this.product.NameWithoutBrand;

        document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
        document.querySelector('.product__color').textContent = this.product.Colors[0].ColorName;
        document.querySelector('.product__description').textContent = this.product.DescriptionText;

        document.getElementById('addToCart').dataset.id = this.product.Id;
    }
}