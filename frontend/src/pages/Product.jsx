import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('S');

  useEffect(() => {
    const fetchProductData = async () => {
      products.map((item) => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image);
          return null;
        }
      });
    };

    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {/* For more images switch add more images and convert it to array */}
            <img
              src={productData.image}
              alt=''
              className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
            />
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt='' className='w-full h-auto' />
          </div>
        </div>
        {/* Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.title}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img
              className='w-24'
              src='https://static.vecteezy.com/system/resources/thumbnails/006/399/042/small/five-stars-customer-product-rating-review-modern-icon-for-apps-and-websites-yellow-five-stars-quality-rating-icon-isolated-on-white-illustration-vector.jpg'
              alt=''
            />
            <p>(364)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            Crafted with premium-quality fabric, this piece offers both comfort
            and style, making it a perfect addition to any wardrobe. The
            breathable material ensures a soft, lightweight feel, ideal for
            all-day wear.
          </p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {['S', 'M', 'L', 'XL'].map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      size === item ? 'border-orange-500' : ''
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery applicable.</p>
            <p>Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (364)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            Crafted with premium-quality fabric, this piece offers both comfort
            and style, making it a perfect addition to any wardrobe. The
            breathable material ensures a soft, lightweight feel, ideal for
            all-day wear.
          </p>
          <p>
            Whether you are dressing up for a casual outing or layering for
            added warmth, this versatile design adapts to any occasion. The
            modern fit complements all body types while maintaining durability
            for long-lasting wear. Easy to care for and suitable for all
            seasons, it is a must-have for the fashion-forward man.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts productId={productId} />
    </div>
  ) : (
    <img
      src='https://b1547017.smushcdn.com/1547017/wp-content/uploads/2018/09/shutterstock_479042983.jpg?size=2160x1727&lossy=1&strip=1&webp=1'
      alt=''
      className='flex items-center justify-center mx-auto h-[45vh]'
    />
  );
};

export default Product;
