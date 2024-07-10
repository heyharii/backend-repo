# Backend Repository

This repository contains the backend code for our application, built with Express.js and integrated with Firebase.

## Project Structure

- `src/`
  - `routes/`: API route definitions
  - `controller/`: Request handlers for routes
  - `middleware/`: Custom middleware functions
  - `config/`: Configuration files, including Firebase setup
  - `entities/`: Shared entity definitions (e.g., ApiError)
  - `repository/`: Data access layer for Firestore

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase configuration in `src/config/firebase.ts`
4. Install Firebase CLI: `npm install -g firebase-tools`
5. Login to Firebase: `firebase login`
6. Start the server: `npm start`

## API Endpoints

- `POST /update-user-data`: Updates user data in Firestore
- `GET /fetch-user-data`: Fetches user data from Firestore

Both endpoints require authentication via the `authMiddleware`.

## Error Handling

The application uses a custom `ApiError` class for standardized error responses.

## Authentication

Requests are authenticated using Firebase Authentication. The `authMiddleware` validates the request token before allowing access to protected routes.

## Development

To run the server in development mode with hot reloading:
npm run dev

## Firebase Emulator

To run the Firebase Emulator Suite:

1. Build the project: `npm run build`
2. Start the emulator: `npm run dev:emulator`

This will start the Firebase Emulator for Firestore on port 8080.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY

For local development using the Firebase Emulator, set:
- FIRESTORE_EMULATOR_HOST=localhost:8080

## Security

Firestore security rules are defined in `firestore.rules`. Make sure to review and update these rules as needed to secure your data.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.