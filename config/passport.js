// Import the necessary modules from passport-jwt and dotenv
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Ensure this path matches your folder structure

// Load environment variables from your .env file
dotenv.config();

// Define options for JWT extraction and validation
const options = {
  // Extract the JWT from the Authorization header as a Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Use the secret key stored in the environment variable for verification
  secretOrKey: process.env.JWT_SECRET,
};

// Export a function that configures Passport to use the JWT strategy
export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        // Look for the user in the database based on the id from the token's payload
        const user = await User.findOne({ user_id: jwt_payload.id });
        // If the user is found, pass the user object to done
        if (user) {
          return done(null, user);
        }
        // If not found, pass false
        return done(null, false);
      } catch (error) {
        // If there's an error, pass it to done
        return done(error, false);
      }
    })
  );
};