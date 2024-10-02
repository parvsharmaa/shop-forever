import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { IoIosArrowDropdown } from 'react-icons/io';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='flex items-center font-medium py-5 justify-between'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt='' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collections' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <FaSearch className='w-5 cursor-pointer' />
        <div className='group relative'>
          <FaUser
            onClick={() => (token ? null : navigate('/login'))}
            className='w-5 cursor-pointer'
          />
          {/* Dropdown Menu */}
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p
                  onClick={() => navigate('/orders')}
                  className=' cursor-pointer hover:text-black'
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className=' cursor-pointer hover:text-black'
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to='/cart' className='relative'>
          <FaShoppingCart className='w-5  min-w-5' />
          <p className='absolute right-[-6px] top-[-10px] w-4 text-center leading-4 bg-slate-200 text-black aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>
        <FiMenu
          onClick={() => setVisible(true)}
          className='w-5 cursor-pointer sm:hidden'
        />
      </div>
      {/* Sidebar Menu for smaller screens*/}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <IoIosArrowDropdown className='h-6 w-6 rotate-90' />
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to='/'
            className='py-2 pl-6 border'
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to='/collection'
            className='py-2 pl-6 border'
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to='/about'
            className='py-2 pl-6 border'
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
