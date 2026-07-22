import { renderOrderSummaryHTML } from "../../scripts/checkout/orderSummary.js";
import { loadProducts, getProduct } from "../../data/products.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { formatCurrency } from "../../scripts/utils/formatCurrency.js";

describe("Test suite: RenderOrderSummary", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("render the order summary", async () => {
    await loadProducts();
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 7,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummaryHTML();

    const orderSummaryHTMLTestContainer = document.querySelector(
      ".js-cart-items-container",
    ).innerHTML;
    const product1 = getProduct(cart[0].productId);
    const product2 = getProduct(cart[1].productId);

    expect(orderSummaryHTMLTestContainer).toContain("Quantity: 7");
    expect(orderSummaryHTMLTestContainer).toContain("Quantity: 2");
    expect(orderSummaryHTMLTestContainer).toContain(product1.name);
    expect(orderSummaryHTMLTestContainer).toContain(product2.name);
    expect(orderSummaryHTMLTestContainer).toContain(
      formatCurrency(product1.priceCents),
    );
    expect(orderSummaryHTMLTestContainer).toContain(
      formatCurrency(product2.priceCents),
    );
  });

  it("Removes a product when the Delete button is clicked", async () => {
    await loadProducts();
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 7,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    const product1 = getProduct(cart[0].productId);
    const product2 = getProduct(cart[1].productId);

    renderOrderSummaryHTML();

    document
      .querySelector(
        `.js-delete-link[data-product-id="e43638ce-6aa0-4b85-b27f-e1d07eb678c6"]`,
      )
      .click();

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(
      document.querySelector(".js-cart-items-container").innerHTML,
    ).not.toContain(product1.name);
    expect(
      document.querySelector(".js-cart-items-container").innerHTML,
    ).toContain(product2.name);
  });

  it("Updates the delivery option", async () => {
    await loadProducts();
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 7,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummaryHTML();

    document
      .querySelector(
        `.js-radio-input[data-product-id="15b6fc6f-327a-4ec4-896f-486349e85a3d"][data-delivery-id="2"]`,
      )
      .click();

    expect(cart[1].deliveryOptionId).toEqual("2");
    expect(
      document.querySelector(
        `.js-radio-input[name="15b6fc6f-327a-4ec4-896f-486349e85a3d"][data-delivery-id='2']`,
      ).checked,
    ).toBe(true);
  });
});
