# Workout Planner API

## Project Purpose & Overview

The Workout Planner API is a secure and user-focused backend system built with Node.js, Express, and MongoDB. It allows users to manage their personal workout routines, track progress, and log completed sessions. Authenticated users can perform CRUD operations on workouts, logs, and fitness goals. The API supports JWT-based authentication and features user-specific data access, summary dashboards, and filtered workout search.

## Live Deployment

[View on Vercel](https://your-vercel-deployment-url.vercel.app)

## Features

### User Authentication
- Register and login using email & password
- Passwords securely hashed with bcryptjs
- JWT-based authentication with Passport.js
- Protected routes using `AuthGuard` middleware

### Workout Management
- Create, read, update, delete workouts
- Each workout is user-specific
- Workouts include structured `exercises` array (sets, reps, rest time)

### Workout Log Management
- Users can log sessions linked to a workout
- Each log records duration, notes, and references a workout
- Full CRUD support

### Fitness Goals
- Create, view, update and delete personal fitness goals
- Track progress with `isCompleted` and `targetDate` fields

### Dashboard Summary
- `/api/dashboard` returns:
  - Total workouts
  - Total logs
  - Total fitness goals
  - Recent entries in each category

### Workout Summary
- `/api/workout-logs/summary`
  - Aggregates data per workout:
    - Workout name
    - Number of sessions
    - Total duration

### Workout Search
- `/api/workouts/search?q=arm`
  - Search for workouts by name (case-insensitive keyword search)

### Error Handling
- Global error handler returns consistent JSON responses


## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Passport, bcryptjs
- **Tools:** Nodemon, Morgan, dotenv

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sevdeozoglu/workout-planner-api.git
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

Method	                   Endpoint	                      Description
POST	                 /api/auth/register	               Register user
POST	                /api/auth/login	                 Login & get token
GET	                 /api/auth/me	                     Get logged-in user

## Workouts (Protected Routes) ##

Method	                Endpoint	                       Description
GET	                  /api/workouts	                   Get all workouts
POST	               /api/workouts	                  Create new workout
GET	                /api/workouts/:id	                Get single workout
PUT	                /api/workouts/:id	                 Update workout
DELETE	            /api/workouts/:id	                 Delete workout
GET	                /api/workouts/search?q=arm	       Search by name

## Workout Logs (Protected Routes) ##

Method	                Endpoint	                      Description
GET	                 /api/workout-logs	                Get all logs
POST	               /api/workout-logs	                Create new log
GET	                 /api/workout-logs/:id	            Get single log
PUT	                 /api/workout-logs/:id	             Update a log
DELETE	             /api/workout-logs/:id	             Delete a log
GET                	/api/workout-logs/summary	          Workout stats (count + time)

## Fitness Goals ##

Method	               Endpoint	                          Description
GET	                 /api/fitness-goals	                 Get all goals
POST	               /api/fitness-goals	                Create new goal
GET	                 /api/fitness-goals/:id	            Get single goal
PUT	                 /api/fitness-goals/:id	              Update goal
DELETE	             /api/fitness-goals/:id	              Delete goal

## Dashboard ##

Method	               Endpoint	                          Description
GET	                  /api/dashboard	             Get total counts + recent items

## Postman Collection ##

	All endpoints have been tested in Postman.

  Includes:

	•	Authorization headers
	•	Sample request bodies
	•	Export available as .json file

  Final Notes:

	•	All features are scoped to the authenticated user.
	•	All input is validated and errors are handled cleanly.
	•	The API is deployed and live on Vercel.
	•	Ready for production.

  Developed by Sevde Ozoglu
	•	MS in Web & Application Development