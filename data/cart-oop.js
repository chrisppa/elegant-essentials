function Cart(localStorageKey) {
  const cart = {
    // saving the cart data
    cartItems: undefined,

    // loading from local storage
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    // saving to local storage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    // adding product to the cart
    addToCart(productId) {
      // checking if the product has already been added to the cart
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      // getting the quantity from the selectors
      const qtySelected =
        1 ||
        Number(document.querySelector(`.js-input-quantity-${productId}`).value);

      if (matchingItem) {
        matchingItem.quantity += qtySelected;
      } else {
        this.cartItems.push({
          productId,
          quantity: qtySelected,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    // function to remove the product from the cart
    removeFromCart(productId) {
      let newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    // updating the cart quantity
    calculateCartQuantity() {
      let totalCartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        totalCartQuantity += cartItem.quantity;
      });

      return totalCartQuantity;
    },

    // function to update the cart quantity using the update link
    updateCart(productId, newQuantity) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity = newQuantity;
      }

      this.saveToStorage();
    },

    // function to update the delivery option in the cart
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("business-cart");

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
