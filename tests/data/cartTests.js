import {
  addToCart,
  loadFromStorage,
  cart,
  deleteFromTheCart,
  updatecartItemQuantity,
} from "../../data/cart.js";

describe("Test suite: AddToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("Adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(cart[0].quantity).toEqual(7);
  });

  it("Adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 2);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[1].quantity).toEqual(2);
    expect(cart[1].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
  });
});

describe("Test suite: deleteFromTheCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("Deletes an existing product from the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    deleteFromTheCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
  });

  it("Does nothing when the product does not exist", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
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
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    deleteFromTheCart("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
  });
});

describe("Test suite: updatecartItemQuantity", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("Updates the quantity of an existing cart item", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    updatecartItemQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 2);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
  });

  it("Keeps the previous quantity when quantity is greater than the maximum limit", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    updatecartItemQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 100);
    expect(cart[0].quantity).toEqual(6);
  });

  it("Sets quantity to one when a negative value is passed", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 6,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    updatecartItemQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", -1);
    expect(cart[0].quantity).toEqual(1);
  });
});
