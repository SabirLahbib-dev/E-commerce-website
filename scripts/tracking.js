import { getProduct, loadProducts } from "../data/products.js";
import { hamburgerMenu } from "./shared/humbergerMenu.js";
import { orders, getOrderPlaceDate } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { calculateCartQuantity } from "../data/cart.js";
import { getCurrentDeliveryStatus } from "./utils/deliveryStatus.js";

hamburgerMenu();

async function renderTrackingPageHTML() {
  await loadProducts();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  const orderId = params.get("orderId");

  // get the infos
  let matchingOrder;

  orders.forEach((order) => {
    if (order.orderId === orderId) {
      matchingOrder = order;
    }
  });

  let matchingProduct;
  matchingOrder.orderProducts.forEach((orderedProduct) => {
    if (orderedProduct.productId === productId) {
      matchingProduct = orderedProduct;
    }
  });

  const product = getProduct(matchingProduct.productId);

  // calculate deliveryProgress
  const today = dayjs();
  const orderDate = dayjs(matchingOrder.orderDate);
  const deliveryDate = dayjs(
    getOrderPlaceDate(matchingProduct.deliveryOptionId),
  );

  const deliveryProgress = Math.min(
    Math.max(
      ((today.valueOf() - orderDate.valueOf()) /
        (deliveryDate.valueOf() - orderDate.valueOf())) *
        100,
      0,
    ),
    100,
  );

  const html = `
  <a href="orders.html"
        ><button class="back-to-orders-button">
          <img src="images/icons/back.png" class="back-icon" /> BACK TO ORDERS
        </button></a
      >
  <div class="arriving-date">Arriving on ${getOrderPlaceDate(matchingProduct.deliveryOptionId)}</div>
      <div class="order-name">
        ${product.name}
      </div>
      <div class="order-quantity">Quantity: ${matchingProduct.quantity}</div>

      <div class="order-image-container">
        <img
          src=${product.image}
          class="order-image"
        />
      </div>
      <div class="preparing-Shipped-Delivered-container">
        <span class="preparing-status">PREPARING</span>
        <span class="shipping-status">SHIPPED</span>
        <span class="delivered-status">DELIVERED</span>
      </div>
      <div class="status-progress-bar">
        <div class="bar" style="width: ${deliveryProgress}%"></div>
      </div>
  `;

  document.querySelector(".js-product-details-container").innerHTML = html;
  document.querySelector(".js-cart-quantity").innerHTML =
    `CART(${calculateCartQuantity()})`;

  document
    .querySelector(`.${getCurrentDeliveryStatus(deliveryProgress)}-status`)
    .classList.add("current-status-label");
}

renderTrackingPageHTML();
