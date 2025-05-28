import { getShoppingCart, calcSubTotal, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = keythis.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    Init() {
        this.list = getShoppingCart();
        this.calculateItemsSummary();
    }

    calculateItemSubTotal() {
        return calcSubTotal;
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal) + (0.06 * this.itemTotal);
        this.shipping = 10 + (2* (length(this.list)-1))
        this.orderTotal = (this.tax) + (this.shipping);
    }

    displayOrderTotals() {
        const tax = document.querySelector("#tax");
        tax.innerText = `$${this.tax.toFixed(2)}`;
        const shipping = document.querySelector("#shipping");
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        const orderTotal = document.querySelector("#orderTotal");
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
}
