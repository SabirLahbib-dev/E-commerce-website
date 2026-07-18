import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
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
  ];
}

export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

// delete from the cart
export function deleteFromTheCart(cartItemID) {
  let newcart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== cartItemID) {
      newcart.push(cartItem);
    }
  });

  cart = newcart;

  saveToLocalStorage();
}

// update cart item quantity
export function updatecartItemQuantity(productID, quantity) {
  let matchingProuct;
  const maxQuantity = 99;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productID) {
      matchingProuct = cartItem;
    }
  });

  if (!quantity || quantity < 0) {
    matchingProuct.quantity = 1;
  } else if (quantity > maxQuantity) {
    return;
  } else {
    matchingProuct.quantity = quantity;
  }

  saveToLocalStorage();
}

// add to cart
export function addToCart(productId, quantity) {
  let existedProduct;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      existedProduct = cartItem;
    }
  });

  if (existedProduct) {
    existedProduct.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToLocalStorage();
}
