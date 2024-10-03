// The nth order after which a coupon will be generated
const N = 3; 

// Helper function to generate coupon code
const generateCouponCode = () => {
  return `DISCOUNT10-${Date.now()}`; // Returns a unique coupon code based on the current timestamp
};

// Helper function to validate coupon
const validateCoupon = (user, discountCode) => {
  return (
    user.activeCoupon && // Check if the user has an active coupon
    user.activeCoupon.code === discountCode && // Validate the provided discount code
    user.activeCoupon.valid // Check if the coupon is still valid
  );
};

export { generateCouponCode, validateCoupon, N };
