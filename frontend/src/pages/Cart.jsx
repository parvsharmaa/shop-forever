import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const item in cartItems) {
      tempData.push({
        id: item,
        quantity: cartItems[item],
      });
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      {/* Cart Title */}
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items List */}
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id.toString() === item.id.toString()
            );
            return (
              <div
                key={index}
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                {/* Product Information */}
                <div className='flex items-start gap-6'>
                  <img
                    className='w-16 sm:w-20'
                    src={productData.image}
                    alt={productData.title}
                  />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>
                      {productData.title}
                    </p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Quantity Input */}
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && Number(value) > 0) {
                      updateQuantity(item.id, Number(value));
                    }
                  }}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type='number'
                  min={1}
                  defaultValue={item.quantity}
                />
                {/* Remove Item Button */}
                <img
                  onClick={() => updateQuantity(item.id, 0)}
                  className='w-10 mr-4 sm:w-12 cursor-pointer'
                  src='https://www.shutterstock.com/image-vector/trash-bin-icon-vector-recycle-600nw-1909485802.jpg'
                  alt='Remove Item'
                />
              </div>
            );
          })
        ) : (
          <div className='p-4 text-md text-gray-400 text-center'>
            Your Cart is Empty.
          </div>
        )}
      </div>

      {/* Cart Total and Checkout Button */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/checkout')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
