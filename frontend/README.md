# Smart Agri Support - Frontend

React.js frontend application for the Smart Agri Support Web Application.

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Firebase SDK** for authentication, database, and storage
- **Axios** for HTTP requests
- **React Query** for data fetching and caching
- **Jest** and **React Testing Library** for testing
- **ESLint** and **Prettier** for code quality

## Project Structure

```
src/
├── components/     # Reusable React components
├── hooks/          # Custom React hooks
├── services/       # API and Firebase services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── index.tsx       # Application entry point
```

## Available Scripts

### Development

```bash
npm start           # Start development server
npm test            # Run tests in watch mode
npm run build       # Build for production
```

### Code Quality

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Fix linting errors automatically
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Testing

- Unit tests: `npm test`
- Test coverage: `npm test -- --coverage`

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Code Style

This project uses ESLint and Prettier for consistent code formatting. Run `npm run format` before committing changes.
