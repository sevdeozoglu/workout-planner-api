// Import passport so we can use its JWT authentication middleware
import passport from 'passport';

// Export an AuthGuard middleware that uses Passport's JWT strategy
// The 'session: false' option ensures no session is used (JWT is stateless)
export const AuthGuard = passport.authenticate('jwt', { session: false });