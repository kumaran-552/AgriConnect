# Dependencies Guide

## Core Dependencies

### React & TypeScript
- **react** (^19.2.4): Core React library
- **react-dom** (^19.2.4): React DOM rendering
- **typescript** (^4.9.5): TypeScript language support
- **@types/react** & **@types/react-dom**: TypeScript definitions for React

### Routing
- **react-router-dom** (^7.13.0): Client-side routing
  - Used for navigation between pages
  - Provides `BrowserRouter`, `Route`, `Link`, `Navigate` components

### Firebase
- **firebase** (^12.9.0): Firebase SDK
  - Authentication: User login/registration
  - Firestore: NoSQL database
  - Storage: Image and file storage
  - Real-time listeners for live updates

### HTTP Client
- **axios** (^1.13.5): Promise-based HTTP client
  - API requests to backend
  - Request/response interceptors
  - Automatic token injection

### Data Fetching & Caching
- **@tanstack/react-query** (^5.90.21): Data fetching and state management
  - Server state management
  - Automatic caching
  - Background refetching
  - Optimistic updates

## Testing Libraries

- **@testing-library/react** (^16.3.2): React component testing
- **@testing-library/jest-dom** (^6.9.1): Custom Jest matchers
- **@testing-library/user-event** (^13.5.0): User interaction simulation
- **jest**: Test runner (included with react-scripts)

## Development Tools

### Code Quality
- **eslint**: JavaScript/TypeScript linting
- **prettier** (^3.8.1): Code formatting
- **eslint-config-prettier** (^10.1.8): Disable ESLint rules that conflict with Prettier
- **eslint-plugin-prettier** (^5.5.5): Run Prettier as ESLint rule

### Build Tools
- **react-scripts** (5.0.1): Create React App build scripts
  - Webpack configuration
  - Babel transpilation
  - Development server
  - Production build optimization

## Usage Examples

### React Router
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

### Firebase Authentication
```typescript
import { auth } from '@services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

await signInWithEmailAndPassword(auth, email, password);
```

### Axios API Calls
```typescript
import api from '@services/api';

const response = await api.get('/diseases');
const data = await api.post('/products', productData);
```

### React Query
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['diseases'],
  queryFn: () => api.get('/diseases').then(res => res.data)
});

const mutation = useMutation({
  mutationFn: (newProduct) => api.post('/products', newProduct)
});
```

## Version Notes

- React 19 is the latest version with improved performance
- React Router v7 uses the new data router API
- Firebase v12 includes modular SDK for better tree-shaking
- React Query v5 (TanStack Query) has improved TypeScript support

## Future Dependencies

Consider adding these as features are implemented:

- **react-hook-form**: Form state management
- **zod**: Schema validation
- **date-fns**: Date manipulation
- **react-toastify**: Toast notifications
- **framer-motion**: Animations
- **tailwindcss**: Utility-first CSS (if not using custom CSS)
