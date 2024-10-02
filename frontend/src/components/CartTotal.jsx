import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = ({ couponApplied }) => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const getCartTotal = () => {
    const cartTotal = getCartAmount();

    if (cartTotal === 0) {
      return 0;
    } else if (couponApplied) {
      return (cartTotal * 0.9 + delivery_fee).toFixed(2);
    } else {
      return (cartTotal + delivery_fee).toFixed(2);
    }
  };

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>
            {currency} {getCartAmount() === 0 ? 0 : delivery_fee}.00
          </p>
        </div>
        <hr />
        {couponApplied && (
          <>
            <div className='flex justify-between'>
              <p>Coupon Discount</p>
              <p>
                {currency} {(getCartAmount() * 0.1).toFixed(2)}
              </p>
            </div>
            <hr />
          </>
        )}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency}
            {getCartTotal()}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
