import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/delivery_options.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);

    // price of products in cart
    productPriceCents += matchingItem.priceCents * cartItem.quantity;

    // shipping costs
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // total before tax
  const totalBeforeTax = productPriceCents + shippingPriceCents;

  // calculating the tax
  const taxCents = totalBeforeTax * 0.1;

  // calculating the order total
  const totalCents = totalBeforeTax + taxCents;

  const totalCartQuantity = updateCartQuantity();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (<span class= "js-cart-payment-quantity">${totalCartQuantity}</span>):</div>
      <div class="payment-summary-money">$${formatCurrency(
        productPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        shippingPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalBeforeTax
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // the total quantity function
  function updateCartQuantity() {
    const totalCartQuantity = calculateCartQuantity();
      return totalCartQuantity;
  }
  
}
