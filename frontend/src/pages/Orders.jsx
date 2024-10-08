import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency, delivery_fee } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(`${backendUrl}/order/userorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        let allOrderItems = [];

        response.data.orders.map((order, index) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            // Calculate per item price split
            item['price'] = (
              (order.couponCode ? item['price'] * 0.9 : item['price']) +
              delivery_fee / order.items.length
            ).toFixed(2);
            // Transforming order number
            item['orderId'] = index + 1;

            allOrderItems.push(item);
          });
        });

        setOrderData(allOrderItems.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => {
          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image} alt='' />
                <div>
                  <p className='text-base font-medium'>
                    Order #{item.orderId} - {item.title}
                  </p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className='mt-1'>
                    {`Date : `}
                    <span className='text-gray-400'>
                      {new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                  <p className='mt-1'>
                    {`Payment Method : `}
                    <span className='text-gray-400'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button className='bg-black text-white border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-700'>
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
