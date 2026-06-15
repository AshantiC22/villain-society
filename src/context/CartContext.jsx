import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      // Check if same product and size already in cart
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existing) {
        // Increase quantity if already exists
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // Add new item
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          number: product.number,
          size,
          quantity,
        },
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  // Update quantity
  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart anywhere
export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
