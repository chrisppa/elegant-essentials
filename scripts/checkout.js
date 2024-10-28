import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/order-summary.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
// import "../data/cart-class.js";
//import "../data/backend-practice.js";

async function loadCheckoutPage() {
  try {
    await loadProductsFetch();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log("unexpected error. Please try again");
  }
}

loadCheckoutPage();
/*
Promise.all([loadProductsFetch()]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
