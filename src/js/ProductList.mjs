export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Obtener datos usando dataSource (instancia de ProductData)
    const products = await this.dataSource.getData();
    this.renderProductList(products);
  }

  renderProductList(products) {
    // Generar HTML para cada producto
    const htmlStrings = products.map(product => this.productTemplate(product));
    this.listElement.innerHTML = htmlStrings.join('');
  }

  productTemplate(product) {
    return `
      <div class="product-card">
        <img src="${product.Image}" alt="${product.Name}">
        <h3>${product.Name}</h3>
        <p class="price">$${product.FinalPrice}</p>
      </div>
    `;
  }
}