import { products } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

/******the products html to be displayed on the webpage******/
updateCartQuantity();
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `

  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-input-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-text-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${
            product.id
          }">
            Add to Cart
          </button>
        </div>

  `;
});

// function to update the cart quantity
function updateCartQuantity() {
  const totalCartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerText = totalCartQuantity;
}

/******displaying the products on the webpage
 ******/
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// saving the previous timout IDs as an array
const previousTimeoutIds = {};
/******selecting all the add to cart buttons to add events******/
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    // displaying the added message on top of the add to cart btn
    document
      .querySelector(`.js-added-text-${productId}`)
      .classList.add("added-text-visible");

    const previousTimeoutId = previousTimeoutIds[productId];

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      document
        .querySelector(`.js-added-text-${productId}`)
        .classList.remove("added-text-visible");
    }, 2000);

    previousTimeoutIds[productId] = timeoutId;

    //add product to the cart
    addToCart(productId);

    // calculating the total cart quantity
    updateCartQuantity();
  });
});
