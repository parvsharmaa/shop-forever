import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ productId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Find the current product based on productId
      const currentProduct = products.find(
        (product) => product._id.toString() === productId
      );
      // Filter out the current product and get related products
      const relatedProducts = products.filter(
        (product) => product._id !== currentProduct._id
      );
      // Set the first 5 related products
      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, productId]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        {/* Title for related products section */}
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* Map through related products and display them */}
        {related.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.title}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
