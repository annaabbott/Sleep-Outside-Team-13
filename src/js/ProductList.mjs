import { renderListWithTemplate } from "./utils.mjs";

//   <li class="product-card">
//     <a href="product_pages/marmot-ajax-3.html">
//       <img
//         src="images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
//         alt="Marmot Ajax tent"
//       />
//       <h3 class="card__brand">Marmot</h3>
//       <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
//       <p class="product-card__price">$199.99</p>
//     </a>
//   </li>

function productCardTemplate(product) {
  const {
    Id,
    Image,
    Brand: { Name },
  } = product;
  return `
    <li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img 
                src="${product.Images.PrimaryMedium}" 
                alt="Image of ${product.Brand.Name}">
            <h3 class="card__brand">${product.NameWithoutBrand}</h3>
            <h2 class="card__name">${product.DescriptionHtmlSimple}</h2>
            <p class="product-card__price">\$${product.SuggestedRetailPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    this.renderList(list.Result);
    document.querySelector("#product-category").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
