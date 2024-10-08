import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Logo and description */}
        <div>
          <img src={assets.logo} className='w-32' alt='Company Logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            We are committed to offering the latest in fashion, bringing you
            high-quality, trendy clothing for every occasion. With a focus on
            style, comfort, and affordability, our collections are designed to
            help you express your unique style. Whether you are looking for
            casual wear or something more refined, we have got you covered. Shop
            with confidence and enjoy fast, reliable shipping and exceptional
            customer service.
          </p>
        </div>

        {/* Company links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact information */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-222-345-6789</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        {/* Copyright notice */}
        <p className='py-5 text-sm text-center'>
          Copyright 2024@ parvsharmaa.netlify.app - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
