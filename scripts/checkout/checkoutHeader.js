import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  document.querySelector(".js-checkout-header").innerHTML = `
    <a href="sabir.html" class="sabir-page-link">
        <div class="logo-container">
          <img
            src="images/sabir-logo.png"
            class="logo-image"
            alt="SABIR Logo"
          /></div
      ></a>
      <div class="checkout-quantity-items">
        Checkout (<span class="items-quantity"
          ><a href="sabir.html" class="sabir-page-link">${calculateCartQuantity()} Items</a></span
        >)
      </div>
      <div><img src="images/icons/checkout-lock-icon.png" /></div>
  `;
}
