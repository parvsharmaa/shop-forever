import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Object, default: {} },
    activeCoupon: {
      code: { type: String },
      valid: { type: Boolean },
    },
  },
  { minimize: false }
);

const User = mongoose.model('User', userSchema);

export default User;
