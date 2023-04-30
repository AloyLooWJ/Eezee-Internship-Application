import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartData: [],
  updateCartData: () => {},
});

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
