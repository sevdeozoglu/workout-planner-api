import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Used for password hashing
import { v4 as uuidv4 } from 'uuid'; // For generating unique user IDs

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for each user
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare a candidate password with the stored hash
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;