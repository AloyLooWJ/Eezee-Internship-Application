import { createContext, useState } from 'react';

// Create context object to allow cart data to persist across pages
export const CartContext = createContext({
  cartData: [],
  updateCartData: () => {},
});

// Set initial cart as empty array. Update cart whenever an item is added.
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const updateCartData = (newCartData) => {
    setCartData(newCartData);
  };

  return (
    <CartContext.Provider value={{ cartData, updateCartData }}>
      {children}
    </CartContext.Provider>
  );
};
