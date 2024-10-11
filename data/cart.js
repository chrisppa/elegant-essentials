// saving the cart data
export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1',
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2',
  },
];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

// function to remove the product from the cart
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

// updating the cart quantity
export function calculateCartQuantity() {
  let totalCartQuantity = 0;

  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });

  return totalCartQuantity;
}

// function to update the cart quantity using the update link
export function updateCart(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if  (matchingItem) {
    matchingItem.quantity = newQuantity;
  }

  saveToStorage();
}
