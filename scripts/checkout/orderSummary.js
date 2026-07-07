import { cart, getProduct } from "../../data/cart.js";

export function renderOrderSummaryHTML() {
  let html = ``;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    html += `
    <div class="cart-item">
            <div class="delivery-date">Delivery date: Friday, July 10</div>
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
                <div class="delivery-option">
                  <input type="radio" class="radio-input" />
                  <div class="delivery-infos">
                    <p class="delivery-option-date">Friday, July 10</p>
                    <p class="delivery-option-status">FREE Shipping</p>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="radio-input" />
                  <div class="delivery-infos">
                    <p class="delivery-option-date">Tuesday, July 13</p>
                    <p class="delivery-option-status">$4.99 - Shipping</p>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="radio-input" />
                  <div class="delivery-infos">
                    <p class="delivery-option-date">Monday, July 18</p>
                    <p class="delivery-option-status">$9.99 - Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  });

  document.querySelector(".js-cart-items-container").innerHTML = html;
}
