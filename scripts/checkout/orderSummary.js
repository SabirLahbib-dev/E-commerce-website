import {
  cart,
  deleteFromTheCart,
  updatecartItemQuantity,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryPrice,
  calculateDeliveryDates,
  updateDeliveryOption,
  getDeliveryDate,
} from "../../data/deliveryOption.js";
import { getProduct } from "../../data/products.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export function renderOrderSummaryHTML() {
  let html = ``;

  if (cart.length > 0) {
    // cart not empty
    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      html += `
    <div class="cart-item">
            <div class="delivery-date">Delivery date: ${getDeliveryDate(product.id)}</div>
            <div class="cart-item-info-container">
              <div class="image-and-info-container">
                <div class="cart-item-image-container">
                  <img
                    src=${product.image}
                    class="cart-item-image"
                  />
                </div>
                <div class="cart-item-details">
                  <p class="cart-item-title">
                    ${product.name}
                  </p>
                  <p class="cart-item-price">$${formatCurrency(product.priceCents)}</p>
                  <div class="cart-item-management-links">
                    <p class="cart-item-quantity">Quantity: ${cartItem.quantity}</p>
                    <input type="text" class="update-quantity-input update-quantity-input-${product.id}" data-product-id="${product.id}"/>
                    <div class="save-quantity-link js-save-quantity-link-${product.id}" data-product-id="${product.id}">Save</div>
                    <div class="update-link js-update-link js-update-link-${product.id}" data-product-id="${product.id}">Update</div>
                    <div class="delete-link js-delete-link" data-product-id="${product.id}">Delete</div>
                  </div>
                </div>
              </div>
              <div class="delivery-options">
                <p class="delivery-option-title">Choose a delivery option :</p>
                ${renderDeliveryOptionsHTML(cartItem.deliveryOptionId, cartItem.productId)}
              </div>
            </div>
          </div>
    `;
    });

    document.querySelector(".js-cart-items-container").innerHTML = html;
  } else {
    document.querySelector("main").innerHTML =
      `    <div class="empty-cart-message-container">
      <div class="empty-cart-icon-container">
        <img src="images/icons/cart.png" class="empty-cart-icon" />
      </div>
      <h1 class="empty-cart-title">YOUR CART IS EMPTY</h1>
      <h4 class="empty-cart-second-title">
        Looks like you haven't make your choice yet...
      </h4>
      <a href="sabir.html">
        <button class="view-products-button">VIEW PRODUCTS</button></a
      >
    </div>`;

    return;
  }
  attachEventListeners();
}

function renderDeliveryOptionsHTML(deliveryOptionId, productId) {
  let html = ``;
  let isChecked;

  deliveryOptions.forEach((deliveryOption) => {
    deliveryOption.id === deliveryOptionId
      ? (isChecked = "checked")
      : (isChecked = "");

    html += `
                    <div class="delivery-option">
                  <input type="radio" name="${productId}" class="radio-input js-radio-input" ${isChecked} data-product-id="${productId}" data-delivery-id="${deliveryOption.id}"/>
                  <div class="delivery-infos">
                    <p class="delivery-option-date">${calculateDeliveryDates(deliveryOption.deliveryDays)}</p>
                    <p class="delivery-option-status">${getDeliveryPrice(deliveryOption.deliveryPriceCents)} - Shipping</p>
                  </div>
                </div>
    `;
  });
  return html;
}

// attach event Listeners
function attachEventListeners() {
  // radio input
  document.querySelectorAll(".js-radio-input").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const { deliveryId } = button.dataset;

      updateDeliveryOption(productId, deliveryId);
      renderOrderSummaryHTML();
    });
  });

  // delete link
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      deleteFromTheCart(productId);
      renderOrderSummaryHTML();
      renderCheckoutHeader();
    });
  });

  // update link
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      link.classList.add("update-link-after");

      document
        .querySelector(`.update-quantity-input-${productId}`)
        .classList.add("update-quantity-after");

      document
        .querySelector(`.js-save-quantity-link-${productId}`)
        .classList.add("save-quantity-link-after");
    });
  });

  // save link
  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      const quantity = Number(
        document.querySelector(`.update-quantity-input-${productId}`).value,
      );

      document
        .querySelector(`.update-quantity-input-${productId}`)
        .classList.remove("update-quantity-after");

      document
        .querySelector(`.js-save-quantity-link-${productId}`)
        .classList.remove("save-quantity-link-after");

      document
        .querySelector(`.js-update-link-${productId}`)
        .classList.remove("update-link-after");

      updatecartItemQuantity(productId, quantity);

      renderCheckoutHeader();
      renderOrderSummaryHTML();
    });
  });

  // enter event in quantity input
  document
    .querySelectorAll(".update-quantity-input")
    .forEach((quantityInput) => {
      quantityInput.addEventListener("keydown", (event) => {
        const { productId } = quantityInput.dataset;
        if (event.key === "Enter") {
          const quantity = Number(quantityInput.value);

          document
            .querySelector(`.update-quantity-input-${productId}`)
            .classList.remove("update-quantity-after");

          document
            .querySelector(`.js-save-quantity-link-${productId}`)
            .classList.remove("save-quantity-link-after");

          document
            .querySelector(`.js-update-link-${productId}`)
            .classList.remove("update-link-after");

          updatecartItemQuantity(productId, quantity);

          renderCheckoutHeader();
          renderOrderSummaryHTML();
        }
      });
    });
}
