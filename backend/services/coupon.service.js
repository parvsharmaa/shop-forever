// nth order for generating coupon
const N = 5;

// Helper function to generate coupon code
const generateCouponCode = () => {
  return `DISCOUNT10-${Date.now()}`;
};

// Helper function to validate coupon
const validateCoupon = (user, discountCode) => {
  return (
    user.activeCoupon &&
    user.activeCoupon.code === discountCode &&
    user.activeCoupon.valid
  );
};

export { generateCouponCode, validateCoupon, N };
