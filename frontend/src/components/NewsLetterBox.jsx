const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className='text-center py-10'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now and get 20% off
      </p>
      <p className='text-gray-400 mt-3'>
        Sign up for our newsletter to receive exclusive offers, updates, and new
        products.
      </p>
      <form
        onClick={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          className='w-full sm:flex-1 outline-none'
          type='email'
          placeholder='Enter your Email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-sm px-10 py-4'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
