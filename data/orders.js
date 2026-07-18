import {
  calculateDeliveryDates,
  deliveryOptions,
  ObtainDeliveryPriceCents,
} from "../data/deliveryOption.js";
import { getProduct, loadProducts, products } from "./products.js";
import { formatCurrency } from "../scripts/utils/formatCurrency.js";

export let orders = JSON.parse(localStorage.getItem("orders"));

// save to local storage
function saveOrdersToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// create order list
export function createOrdersList(cart) {
  orders = [];

  cart.forEach((cartItem) => {
    let order = orders.find((order) => {
      return order.deliveryOptionId === cartItem.deliveryOptionId;
    });

    if (!order) {
      order = {
        deliveryOptionId: cartItem.deliveryOptionId,
        orderId: crypto.randomUUID(),
        orderProducts: [],
      };

      orders.push(order);
    }

    order.orderProducts.push(cartItem);
  });

  saveOrdersToStorage();
}

// get an Order Place date
export function getOrderPlaceDate(deliveryOptionId) {
  let deliveryDays;

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      deliveryDays = deliveryOption.deliveryDays;
    }
  });

  return calculateDeliveryDates(deliveryDays);
}

// get the total price for an order
export function getOrderTotalPriceCents(deliveryOptionId) {
  let matchingOrder;
  let itemsPriceCents = 0;

  orders.forEach((order) => {
    if (order.deliveryOptionId === deliveryOptionId) {
      matchingOrder = order;
    }
  });

  matchingOrder.orderProducts.forEach((productOrdered) => {
    itemsPriceCents +=
      getProduct(productOrdered.productId).priceCents * productOrdered.quantity;
  });

  const shippingPriceCents = ObtainDeliveryPriceCents(deliveryOptionId);

  const orderTotalPriceCents =
    itemsPriceCents +
    shippingPriceCents +
    (itemsPriceCents + shippingPriceCents) * 0.1;

  return formatCurrency(orderTotalPriceCents);
}
