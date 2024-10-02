import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = 'Rs. ';
  const delivery_fee = 10;
  const backendUrl = 'http://localhost:8080/api';

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    // Now if we're logged in, update to cart to database too
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/add`,
          { itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error('Failed to update cart. Please try again later.');
      }
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    // Now if we're logged in, update to cart to database too
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/update`,
          { itemId, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error('Failed to update cart. Please try again later.');
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (let [item, quantity] of Object.entries(cartItems)) {
      const product = products.find((product) => product._id === item);
      totalAmount += product.price * quantity;
    }
    return totalAmount;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/cart/get`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cart);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
