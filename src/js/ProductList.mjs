import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
<<<<<<< HEAD
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
=======
        <a href="/product_pages/?product=${product.Id}">
            <img 
                src="${product.Images.PrimaryMedium}" 
                alt="Image of ${product.Brand.Name}">
            <h3 class="card__brand">${product.NameWithoutBrand}</h3>
            <h2 class="card__name">${product.DescriptionHtmlSimple}</h2>
            <p class="product-card__price">\$${product.SuggestedRetailPrice}</p>
        </a>
    </li>`;
>>>>>>> 1fb615a2eeb33ceb04da6cda2fe0eee2590fbea1
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
<<<<<<< HEAD
    document.querySelector(".title").textContent = this.category;
=======
    document.querySelector("#product-category").textContent = this.category;
>>>>>>> 1fb615a2eeb33ceb04da6cda2fe0eee2590fbea1
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}