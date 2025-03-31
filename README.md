# Workout Planner API

## Project Purpose & Overview

The Workout Planner API is a robust backend system that enables users to manage their personal workout routines, track progress, and log completed workout sessions. Built using Node.js, Express, and MongoDB (with Mongoose), the API utilizes Passport with JWT for secure, stateless authentication. Users can register, log in, and create, read, update, and delete their own workout routines and logs—ensuring that all data remains private and user-specific.

## Current Progress

- **Project Setup:**  
  - Repository structure established with separate folders for configuration, controllers, middleware, models, and routes.
  - Core files (`server.js`, `app.js`, `config/db.js`) and environment management via a `.env` file are in place.

- **User Authentication:**  
  - User model implemented with password hashing (using bcryptjs) and password comparison methods.
  - Authentication endpoints (`/api/auth/register` and `/api/auth/login`) are functional using Passport and JWT.
  - Protected routes are set up using an authentication middleware (AuthGuard) ensuring that only authenticated users can access certain endpoints.

- **Workout Management:**  
  - Workout model defined (including user association, name, exercises, and date).
  - CRUD operations for workouts have been implemented in the workout controller.
  - Workouts are tied to the authenticated user, ensuring that each user only accesses their own data.

- **Workout Logs:**  
  - A WorkoutLog model, controller, and routes have been created to allow users to log details of completed workout sessions.
  - Endpoints for managing workout logs (`/api/workout-logs`) are fully operational.


- **Error Handling:**  
  - Global error handling middleware is in place to provide consistent error responses.

## Features

- **User Authentication**  
  - Register new users  
  - Log in existing users and receive a JWT token  
  - Protected routes using Passport JWT strategy

- **Workout Management**  
  - Create, read, update, and delete workout routines  
  - Each workout is associated with the user who created it

- **Workout Log Management**  
  - Log completed workout sessions  
  - CRUD operations on workout logs  
  - Each log references a specific workout

- **Error Handling**  
  - Global error handling middleware returns consistent JSON error responses

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport, Passport-JWT, JSON Web Tokens (JWT)
- **Other Tools:** Nodemon, Morgan (for logging), dotenv (for environment variables)

## Next Steps for Project Completion

- **Enhance Input Validation:**  
  - Add validation middleware to verify incoming request data for user registration, login, workouts, and logs.

- **Improve Documentation and Testing:**  
  - Expand API documentation with detailed examples for each endpoint.
  - Write unit and integration tests for critical functionalities.
  - Thoroughly test endpoints using Postman.

- **Deployment Preparation:**  
  - Prepare the project for deployment on platforms like Heroku or DigitalOcean.
  - Configure production environment variables and settings.

- **Fitness Goals Feature:**  
  Implement a feature that allows users to set and track personal fitness goals (e.g., weight loss, strength gain). This will involve creating a new model, controller, and routes for managing fitness goals, ensuring that each goal is associated with the authenticated user.

- **Personal Records Feature:**  
  Add functionality for users to record and manage their personal records for various exercises (such as maximum weight lifted or fastest time). This feature will require a dedicated model, controller, and routes with strict ownership checks so that users can only modify their own records.

- **Enhanced Input Validation:**  
  Integrate input validation middleware (e.g., using `express-validator`) to ensure all incoming request data is well-formed and valid. This will help prevent invalid data from reaching your controllers, thereby improving the API’s reliability and security.

- **Additional Features:**  
  - Explore advanced features.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/workout-planner-api.git
   cd workout-planner-api

2. **Install dependencies:**

   npm install

3. **Configure environment variables:**
Create a .env file in the root directory (see Environment Variables below).

4.	**Start the server:**
npm run dev

The server should start on the specified port (default is 3000) and connect to your MongoDB database.

**Environment Variables**

Create a .env file in the root of your project and add the following (replace values as needed):

PORT=3000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=yourSuperSecretKey

PORT: Port number where the server will run.
MONGO_URI: MongoDB connection string.
JWT_SECRET: A secret key used to sign JWT tokens. You can generate one using:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# API Endpoints Overview #

## Authentication ##
Register:
POST /api/auth/register

Example Body:
   {
  "username": "sevde",
  "email": "sevde@example.com",
  "password": "sevde123"
   }

Login:
POST /api/auth/login

Example Body:
   {
  "email": "sevde@example.com",
  "password": "sevde123"
   }

## Workouts (Protected Routes) ##

Get All Workouts:
GET /api/workouts
Create a Workout:
POST /api/workouts

Example Body:
   {
  "name": "Leg Day",
  "exercises": [
    { "name": "Squat", "sets": 4, "reps": 10, "restTime": 60 },
    { "name": "Lunges", "sets": 3, "reps": 12, "restTime": 45 }
  ]
   }

Get Single Workout:
GET /api/workouts/:id
Update a Workout:
PUT /api/workouts/:id
Delete a Workout:
DELETE /api/workouts/:id

## Workout Logs (Protected Routes) ##

Get All Workout Logs:
GET /api/workout-logs
Create a Workout Log:
POST /api/workout-logs

Example Body:
   {
  "workout": "workoutObjectIdHere",
  "duration": 45,
  "notes": "Felt strong during today's session."
   }

Get Single Workout Log:
GET /api/workout-logs/:id
Update a Workout Log:
PUT /api/workout-logs/:id
Delete a Workout Log:
DELETE /api/workout-logs/:id