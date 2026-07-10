import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "../scripts/utils/formatCurrency.js";
import { cart, saveToLocalStorage } from "./cart.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryPriceCents: 0,
    deliveryDays: 7,
  },
  {
    id: "2",
    deliveryPriceCents: 499,
    deliveryDays: 3,
  },
  {
    id: "3",
    deliveryPriceCents: 999,
    deliveryDays: 1,
  },
];

export function getDeliveryPrice(priceCents) {
  const deliveryPrice =
    priceCents === 0 ? "FREE" : `$${formatCurrency(priceCents)}`;
  return deliveryPrice;
}

export function calculateDeliveryDates(deliveryDays) {
  let daysAdded = 0;
  let deliveryDate = dayjs();

  while (daysAdded < deliveryDays) {
    deliveryDate = deliveryDate.add(1, "day");

    const day = deliveryDate.format("dddd");

    if (day !== "Saturday" && day !== "Sunday") {
      daysAdded++;
    }
  }

  return deliveryDate.format("dddd MMMM DD");
}

export function getDeliveryDate(productId) {
  let matchingProduct;
  let matchingDeliveryOption;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === matchingProduct.deliveryOptionId) {
      matchingDeliveryOption = deliveryOption;
    }
  });
  return calculateDeliveryDates(matchingDeliveryOption.deliveryDays);
}

export function updateDeliveryOption(productId, id) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });

  matchingProduct.deliveryOptionId = id;
  saveToLocalStorage();
}
