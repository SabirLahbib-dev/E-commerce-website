import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { ObtainDeliveryPriceCents } from "../../data/deliveryOption.js";
import { createOrdersList } from "../../data/orders.js";

function calculateOrderPaymentDetails() {
  let itemsPriceCents = 0;
  let shippingPriceCents = 0;
  let totalBeforeTaxCents = 0;
  let estimatedTaxCents = 0;
  let orderTotalPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    itemsPriceCents += cartItem.quantity * product.priceCents;

    shippingPriceCents += ObtainDeliveryPriceCents(cartItem.deliveryOptionId);
  });

  totalBeforeTaxCents = itemsPriceCents + shippingPriceCents;

  estimatedTaxCents = totalBeforeTaxCents * 0.1;

  orderTotalPriceCents = estimatedTaxCents + totalBeforeTaxCents;

  return {
    itemsPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    estimatedTaxCents,
    orderTotalPriceCents,
  };
}

export function renderPaymentSummary() {
  const {
    itemsPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    estimatedTaxCents,
    orderTotalPriceCents,
  } = calculateOrderPaymentDetails();

  document.querySelector(".js-order-summary").innerHTML = `
          <div class="order-summary-title">ORDER SUMMARY</div>
          <div class="order-detail">
            <p>Items (${calculateCartQuantity()}) :</p>
            <p>$${formatCurrency(itemsPriceCents)}</p>
          </div>
          <div class="order-detail">
            <p>Shipping & handling:</p>
            <p class="hr">$${formatCurrency(shippingPriceCents)}</p>
          </div>
          <div class="order-detail">
            <p>Total before tax:</p>
            <p>$${formatCurrency(totalBeforeTaxCents)}</p>
          </div>
          <div class="order-detail">
            <p>Estimated tax (10%):</p>
            <p>$${formatCurrency(estimatedTaxCents)}</p>
          </div>
          <hr />
          <div class="order-detail">
            <p class="order-total">ORDER TOTAL:</p>
            <p class="order-total">$${formatCurrency(orderTotalPriceCents)}</p>
          </div>
          <button class="place-order-button js-place-order-button">PLACE YOUR ORDER</button>
  `;

  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", () => {
      window.location.href = "orders.html";
      createOrdersList(cart);
    });
}
