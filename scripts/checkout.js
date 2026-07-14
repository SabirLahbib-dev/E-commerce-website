import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function renderCheckoutPage() {
  await loadProducts();
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummaryHTML();
}

renderCheckoutPage();
