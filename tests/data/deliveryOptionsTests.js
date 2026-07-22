import {
  getDeliveryPrice,
  calculateDeliveryDates,
  getDeliveryDate,
  updateDeliveryOption,
} from "../../data/deliveryOption.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

describe("Test suite: getDeliveryPrice", () => {
  it("returns the delivery price in dollars ", () => {
    const deliveryPriceForDeliveryOptionId1 = getDeliveryPrice(0);
    const deliveryPriceForDeliveryOptionId2 = getDeliveryPrice(499);
    const deliveryPriceForDeliveryOptionId3 = getDeliveryPrice(999);
    expect(deliveryPriceForDeliveryOptionId1).toEqual("FREE");
    expect(deliveryPriceForDeliveryOptionId2).toEqual("$4.99");
    expect(deliveryPriceForDeliveryOptionId3).toEqual("$9.99");
  });
});

describe("Test suite: calculateDeliveryDates", () => {
  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date("2026-07-22"));
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("returns the delivery date by delivery days", () => {
    const fakeDate = dayjs("7-22-2026");
    const deliveryDateForDeliveryOptionId1 = calculateDeliveryDates(
      7,
      fakeDate,
    );
    const deliveryDateForDeliveryOptionId2 = calculateDeliveryDates(
      3,
      fakeDate,
    );
    const deliveryDateForDeliveryOptionId3 = calculateDeliveryDates(
      1,
      fakeDate,
    );
    expect(deliveryDateForDeliveryOptionId1).toEqual("Friday July 31");
    expect(deliveryDateForDeliveryOptionId2).toEqual("Monday July 27");
    expect(deliveryDateForDeliveryOptionId3).toEqual("Thursday July 23");
  });
});

describe("Test suite: getDeliveryDate", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("returns the delivery date by product ID", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "2",
        },
      ]);
    });
    const fakeDate = dayjs("7-22-2026");
    loadFromStorage();
    expect(
      getDeliveryDate("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", fakeDate),
    ).toEqual("Monday July 27");
  });
});

describe("Test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("updates the delivery option ID", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
  });
});
