import {
  orders,
  getOrderPlaceDate,
  getOrderTotalPriceCents,
} from "../data/orders.js";
import { getProduct, loadProducts } from "../data/products.js";

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
                <button class="buy-it-again-button">
                  <img
                    src="images/icons/buy it again.png"
                    class="buy-it-again-icon"
                  />BUY IT AGAIN
                </button>
                <button class="mobile-track-package-button">
                  TRACK PACKAGE
                </button>
              </div>
            </div>
            <button class="track-package-button">TRACK PACKAGE</button>
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
}

renderOrdersHTML();
