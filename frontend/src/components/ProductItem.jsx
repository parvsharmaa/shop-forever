import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden'>
        {/* Image with hover effect */}
        <img
          className='hover:scale-110 transition easy-in-out'
          src={image}
          alt=''
        />
      </div>
      {/* Product name */}
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      {/* Product price with currency */}
      <p className='front-medium text-sm'>
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
