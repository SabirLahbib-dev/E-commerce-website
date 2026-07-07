import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";

async function renderCheckoutPage() {
  await loadProducts();
  renderOrderSummaryHTML();
}

renderCheckoutPage();
