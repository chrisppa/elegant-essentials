import { products } from "./products.js";

// saving the cart data
export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

// function to add the product to the cart
export function addToCart(productId) {
  // checking if the product has already been added to the cart
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  // getting the quantity from the selectors
  const qtySelected = Number(
    document.querySelector(`.js-input-quantity-${productId}`).value
  );

  if (matchingItem) {
    matchingItem.quantity += qtySelected;
  } else {
    cart.push({
      productId,
      quantity: qtySelected,
    });
  }
}
