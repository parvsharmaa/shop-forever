const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyT9yFuQurhcil2sFEucUL4af12zjuzOfP7mkEIblWb6VJIQO5rz1_6Uc1GCZBF7BMHE4&usqp=CAU'
          alt=''
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>
          We offer hassle free exchange policy at your doorstep.
        </p>
      </div>

      <div>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJlx1Lz4T3WjXr_gYh3hNI96KZ_MPpHmvF3RMasInfY9zpqYM6lt5tlc4-poOEP1-rpQ&usqp=CAU'
          alt=''
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>7 Days Return policy</p>
        <p className='text-gray-400'>
          We offer 7 days free return policy at your doorstep.
        </p>
      </div>

      <div>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBP171F2P4HS8jgwx71CJIUJoHbEzVzqKHZlyetUBl5f4LfWhgU2siwO2MA3PWkKMuVz4&usqp=CAU'
          alt=''
          className='w-12 m-auto mb-5'
        />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>
          We provide 24/7 Customer Support on both call and chat.
        </p>
      </div>
    </div>
  );
};

export default Policy;
