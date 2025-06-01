import { getShoppingCart, calcSubTotal, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getShoppingCart();
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
    this.displayOrderTotals();
  }

  calculateItemSubTotal() {
    this.itemTotal = calcSubTotal(this.list);
    return this.itemTotal;
  }

  calculateOrderTotal() {
    this.tax = 0.06 * this.itemTotal;
    this.shipping = 10 + 2 * (this.list.length - 1);
    this.orderTotal = this.tax + this.shipping + this.itemTotal;
  }

  displayOrderTotals() {
    const subTotal = document.querySelector("#subtotal");
    subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    const tax = document.querySelector("#tax");
    tax.innerText = `$${this.tax.toFixed(2)}`;
    const shipping = document.querySelector("#shipping");
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    const orderTotal = document.querySelector("#orderTotal");
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async submit(event) {
    event.preventDefault();
    const form = document.forms.checkoutForm;
    const checkoutItems = this.list.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.count,
    }));

    const data = {
      orderDate: new Date(),
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      items: checkoutItems,
    };
    const url = "http://wdd330-backend.onrender.com/checkout";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      console.log("Order successfully placed!", response);
      window.location.href = "../checkout/success.html";
      order.list.innerText = "";
    } catch (error) {
      console.log("Order failed.", error.message);
    }
  }
}
const order = new CheckoutProcess();
order.init();

document
  .querySelector("#checkout")
  .addEventListener("click", (e) => order.submit(e));
