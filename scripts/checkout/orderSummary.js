import { cart } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryPrice,
  calculateDeliveryDates,
  updateDeliveryOption,
  getDeliveryDate,
} from "../../data/deliveryOption.js";
import { getProduct } from "../../data/products.js";

export function renderOrderSummaryHTML() {
  let html = ``;

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
                  <p class="cart-item-price">$10.90</p>
                  <div class="cart-item-management-links">
                    <p>Quantity: ${cartItem.quantity}</p>
                    <input type="number" class="update-quantity-input" />
                    <div class="save-quantity-link">Save</div>
                    <div class="update-link">Update</div>
                    <div class="delete-link">Delete</div>
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

  document.querySelectorAll(".js-radio-input").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const { deliveryId } = button.dataset;

      updateDeliveryOption(productId, deliveryId);
      renderOrderSummaryHTML();
    });
  });
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
