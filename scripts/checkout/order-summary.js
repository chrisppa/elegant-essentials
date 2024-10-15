import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from ".././utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/delivery_options.js";
import dayjs from "https://unpkg.com/dayjs@1.8.8/esm/index.js";
import { renderPaymentSummary } from "./payment-summary.js";

export function renderOrderSummary() {
  updateCartQuantity();
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingItem.id
      }">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${matchingItem.image}"
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">$${formatCurrency(
              matchingItem.priceCents
            )}</div>
            <div class="product-quantity">
              <span class = "qty-text"> Quantity: <span class="quantity-label">${
                cartItem.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                matchingItem.id
              }">
                Update
              </span>

              <!-- code for the update input --> 
              <input type='number' class="quantity-input js-quantity-input-${
                matchingItem.id
              }">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                matchingItem.id
              }">Save</span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                matchingItem.id
              }">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingItem, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // the delivery options
  function deliveryOptionsHtml(matchingItem, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      let priceString =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option" data-product-id = "${
          matchingItem.id
        }" data-delivery-option-id = "${deliveryOption.id}">
          <input
            type="radio" ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}Shipping</div>
          </div>
        </div>
      
      `;
    });

    return html;
  }

  // displaying the order summary on the page
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // deleting an order
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      // remove from cart
      removeFromCart(productId);

      // then remove from page
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    const totalCartQuantity = calculateCartQuantity();

    document.querySelector(".js-checkout-total-cart-quantity").innerHTML =
      totalCartQuantity;
  }

  // updating an order
  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      updateCart(productId, newQuantity);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // updating the delivery option on the page
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
