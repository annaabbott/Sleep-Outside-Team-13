import { addProductToCart, renderListWithTemplate } from "./utils.mjs";

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
        <button type="button" id="modalBtn_${product.Id}" class="modalBtn">Quick view</button>
        <dialog id="quickview_${product.Id}" class="quickview">
          <section id="product-info">
          <img 
                src="${product.Images.PrimaryMedium}" 
                alt="Image of ${product.Brand.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>

            <p id="p-color">${product.Colors[0].ColorName}</p>
            <p id="p-description">${product.DescriptionHtmlSimple}</p>
            <p id="p-price">\$${product.SuggestedRetailPrice}</p>
            <button id="addToCart_${product.Id}" class="modalBtn">Add to Cart</button>
            <button type="button" id="closeModal_${product.Id}" class="modalBtn" >Close</button>
          </section>
        </dialog>
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

  addTemplateEventListeners(product) {
    const dialogElement = document.querySelector(`#quickview_${product.Id}`);
    const modalBtn = document.querySelector("#modalBtn_" + product.Id);
    const closeModalBtn = document.querySelector(`#closeModal_${product.Id}`);
    const addToCartBtn = document.querySelector(`#addToCart_${product.Id}`);

    modalBtn.addEventListener("click", () => {
      dialogElement.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
      dialogElement.close();
    });

    addToCartBtn.addEventListener("click", () => {
      addProductToCart(product);
    })
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    for (let i = 0; i < list.length; i++) {
      this.addTemplateEventListeners(list[i]);
    }
  }
}
