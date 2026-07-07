import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

async function renderCheckoutPage() {
  await loadProducts();
  renderCheckoutHeader();
  renderOrderSummaryHTML();
}

renderCheckoutPage();
