import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';

const About = () => {
  return (
    <div>
      {/* About Us Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Us Content */}
      <div className='flex flex-col md:flex-row gap-16 my-10'>
        <img
          src={
            'https://imageio.forbes.com/blogs-images/scottdavis/files/2019/10/forever-21.jpg?height=711&width=711&fit=bounds'
          }
          alt='About Us Image'
          className='w-full md:max-w-[450px]'
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we&apos;ve worked tirelessly to curate a
            diverse selection of high-quality products that cater to every taste
            and preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to empower customers with choice, convenience, and
            confidence. We&apos;re dedicated to providing a seamless shopping
            experience that exceeds expectations, from browsing and ordering to
            delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className='py-4 text-2xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Why Choose Us Content */}
      <div className='flex flex-col md:flex-row mb-20 text-sm gap-4'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            We take pride in offering only the highest quality products that
            meet our stringent standards for durability, performance, and value.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>
            Our user-friendly website and mobile app make it easy to browse,
            compare, and purchase products on the go.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Our dedicated team of customer service representatives is available
            around the clock to assist you with any queries or concerns you may
            have.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
