import {
  orders,
  getOrderPlaceDate,
  getOrderTotalPriceCents,
} from "../data/orders.js";
import { getProduct, loadProducts } from "../data/products.js";
import { calculateCartQuantity, addToCart } from "../data/cart.js";
import { hamburgerMenu } from "../scripts/shared/humbergerMenu.js";
import { searchFeatureEventListener } from "./shared/searchEventListener.js";
import { searchProductsByCategories } from "./shared/searchPoductsByCategories.js";

hamburgerMenu();
// render the orders HTML
async function renderOrdersHTML() {
  let orderPageHTML = `<h2>YOUR ORDERS</h2>`;

  await loadProducts();
  orders.forEach((order) => {
    let ordersBodyHTML = "";

    let ordersHeaderHTML = `
  <div class="order-details">
            <div class="order-place-date">
              <b>Order Placed:</b>
             ${getOrderPlaceDate(order.deliveryOptionId)}
            </div>
            <div class="order-total">
              <b>Total:</b>
              $${getOrderTotalPriceCents(order.deliveryOptionId)}
            </div>
          </div>
          <div class="order-id">
            <b>Order ID:</b>
            ${order.orderId}
          </div>
  `;

    order.orderProducts.forEach((productOrdered) => {
      let matchingProduct = getProduct(productOrdered.productId);

      ordersBodyHTML += `
      <div class="order-item-container">
            <div class="order-item-details">
              <div class="order-item-image-container">
                <img
                  src=${matchingProduct.image}
                  class="order-item-image"
                />
              </div>
              <div class="order-item-info-container">
                <div class="cart-item-name">
                  ${matchingProduct.name}
                </div>
                <div class="arriving-date">Arriving on: ${getOrderPlaceDate(order.deliveryOptionId)}</div>
                <div class="order-item-quantity">Quantity: ${productOrdered.quantity}</div>
                <button class="buy-it-again-button js-buy-it-again-button" data-ordered-product-id="${matchingProduct.id}">
                  <img
                    src="images/icons/buy it again.png"
                    class="buy-it-again-icon"
                  /><span class="js-button-text">BUY IT AGAIN</span>
                </button>
                <button class="mobile-track-package-button">
                  TRACK PACKAGE
                </button>
              </div>
            </div>
            <button class="track-package-button js-track-package-button" data-ordered-product-id="${matchingProduct.id}" data-order-id="${order.orderId}">TRACK PACKAGE</button>
            </div>
    `;
    });

    orderPageHTML += `
  <section>
    <div class="orders-header">
    ${ordersHeaderHTML}
    </div>
    <div class="orders-grid">
    ${ordersBodyHTML}
    </div>
  </section>
  `;
  });

  document.querySelector("main").innerHTML = orderPageHTML;

  // cart quantity
  document.querySelector(".js-cart-quantity").innerHTML =
    `CART(${calculateCartQuantity()})`;

  attachEventListeners();
}

renderOrdersHTML();

// event listeners
function attachEventListeners() {
  // buy it again
  document.querySelectorAll(".js-buy-it-again-button").forEach((button) => {
    let setTimeOutID;

    button.addEventListener("click", () => {
      const { orderedProductId } = button.dataset;

      const text = button.querySelector(".js-button-text");

      text.textContent = `ADDED `;

      clearTimeout(setTimeOutID);

      setTimeOutID = setTimeout(() => {
        text.textContent = `BUY IT AGAIN`;
      }, 2000);

      addToCart(orderedProductId, 1);

      document.querySelector(".js-cart-quantity").innerHTML =
        `CART(${calculateCartQuantity()})`;
    });
  });

  // track package
  document.querySelectorAll(".js-track-package-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { orderedProductId } = button.dataset;
      const { orderId } = button.dataset;

      window.location.href = `tracking.html?productId=${orderedProductId}&orderId=${orderId}`;
    });
  });

  // search feature
  searchFeatureEventListener();
  // categories links
  searchProductsByCategories();
}
