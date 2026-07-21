import { hamburgerMenu } from "./shared/humbergerMenu.js";
import {
  products,
  loadProducts,
  Clothing,
  Products,
} from "../data/products.js";
import {
  calculateCartQuantity,
  cart,
  saveToLocalStorage,
  addToCart,
} from "../data/cart.js";
import { searchFeatureEventListener } from "./shared/searchEventListener.js";
import { searchProductsByCategories } from "./shared/searchPoductsByCategories.js";

hamburgerMenu();

function renderProductsHTML() {
  // search feautre
  searchFeatureEventListener();

  // categories links
  searchProductsByCategories();

  let filteredProducts = [];

  const params = new URLSearchParams(window.location.search);
  const searchKeyWords = params.get("search");

  // search feature
  if (searchKeyWords) {
    filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyWords.toLowerCase()) ||
        product.keywords.some((keyWord) => {
          return keyWord.toLowerCase().includes(searchKeyWords.toLowerCase());
        })
      );
    });
  } else {
    filteredProducts = products;
  }

  // html
  let html = ``;
  filteredProducts.forEach((product) => {
    html += `
    <article class="product-container">
        <div class="product-image-container">
          <img
            src=${product.image}
            alt="Black and Gray Athletic Cotton Socks"
            class="product-image"
            loading="lazy"
          />
        </div>

        <div class="product-title limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            src="images/ratings/rating-${product.getStars()}.png"
            alt="4.5 stars"
            class="product-rating-stars"
          />
          <span class="product-rating-count">${product.rating.count}</span>
        </div>

        <div class="product-price">$${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select class="quantity-selector js-quantity-selector-${product.id}">
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>

        <div class="product-spacer">
        ${product.getExtraInfo()}
        </div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" class="checkmark-icon" alt="" />
          Added
        </div>

        <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">
          <img src="images/icons/iadd-icon.png" class="add-icon" alt="" />
          ADD TO CART
        </button>
      </article>
    `;
  });
  document.querySelector(".js-products-grid").innerHTML = html;
  document.querySelector(".js-cart-quantity").innerHTML =
    `CART(${calculateCartQuantity()})`;

  // add to cart
  document
    .querySelectorAll(".js-add-to-cart-button")
    .forEach((addToCartButton) => {
      let setTimeoutID;
      addToCartButton.addEventListener("click", () => {
        const { productId } = addToCartButton.dataset;

        let quantityChosen = Number(
          document.querySelector(`.js-quantity-selector-${productId}`).value,
        );

        const addedToCartMessage = document.querySelector(
          `.js-added-to-cart-${productId}`,
        );

        addedToCartMessage.classList.add("active");

        clearTimeout(setTimeoutID);

        setTimeoutID = setTimeout(() => {
          addedToCartMessage.classList.remove("active");
        }, 2000);

        addToCart(productId, quantityChosen);

        document.querySelector(".js-cart-quantity").innerHTML =
          `CART(${calculateCartQuantity()})`;
      });
    });
}

export async function renderSabirPage() {
  try {
    await loadProducts();
    renderProductsHTML();
  } catch (error) {
    console.error(`Unexpected error(${error}). Please try again later.`);
  }
}

renderSabirPage();
