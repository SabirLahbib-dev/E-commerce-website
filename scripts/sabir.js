import { hamburgerMenu } from "./shared/humbergerMenu.js";
import {
  products,
  loadProducts,
  Clothing,
  Products,
} from "../data/products.js";

hamburgerMenu();

function renderProductsHTML() {
  let html = ``;
  products.forEach((product) => {
    html += `
    <article class="product-container">
        <div class="product-image-container">
          <img
            src=${product.image}
            alt="Black and Gray Athletic Cotton Socks"
            class="product-image"
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
          <select class="quantity-selector">
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

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png" class="checkmark-icon" alt="" />
          Added
        </div>

        <button class="add-to-cart-button">
          <img src="images/icons/iadd-icon.png" class="add-icon" alt="" />
          ADD TO CART
        </button>
      </article>
    `;
  });
  document.querySelector(".js-products-grid").innerHTML = html;
}

async function renderSabirPage() {
  await loadProducts();
  renderProductsHTML();
}

renderSabirPage();
