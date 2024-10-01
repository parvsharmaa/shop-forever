import { createContext, useState } from 'react';
import { products } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = 'Rs. ';
  const delivery_fee = 10;
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const updateQuantity = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (let [item, quantity] of Object.entries(cartItems)) {
      const product = products.find((product) => product.id === Number(item));
      totalAmount += product.price * quantity;
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
