# Frontend Project Structure

## Directory Overview

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   ├── favicon.ico        # Favicon
│   └── manifest.json      # PWA manifest
│
├── src/                   # Source code
│   ├── components/        # React components
│   │   └── .gitkeep
│   │
│   ├── hooks/             # Custom React hooks
│   │   └── .gitkeep
│   │
│   ├── services/          # API and Firebase services
│   │   ├── api.ts         # Axios instance with interceptors
│   │   └── firebase.ts    # Firebase configuration
│   │
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Common types (UserProfile, Location, etc.)
│   │
│   ├── utils/             # Utility functions
│   │   ├── format.ts      # Formatting utilities (price, date, phone)
│   │   └── validation.ts  # Validation utilities (email, phone, password)
│   │
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.tsx          # Application entry point
│   └── index.css          # Global styles
│
├── .env.example           # Environment variables template
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Key Files

### Configuration Files

- **tsconfig.json**: TypeScript compiler configuration with path aliases
- **.prettierrc**: Code formatting rules
- **package.json**: Project dependencies and npm scripts

### Service Files

- **services/firebase.ts**: Firebase initialization (Auth, Firestore, Storage)
- **services/api.ts**: Axios instance with authentication and error handling

### Type Definitions

- **types/index.ts**: Common TypeScript interfaces and types

### Utilities

- **utils/validation.ts**: Input validation functions
- **utils/format.ts**: Data formatting functions

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { UserProfile } from '@types/index';
import api from '@services/api';
import { validateEmail } from '@utils/validation';
```

Available aliases:
- `@components/*` → `src/components/*`
- `@services/*` → `src/services/*`
- `@hooks/*` → `src/hooks/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`

## Next Steps

As you implement features, organize code as follows:

### Components
```
components/
├── auth/
│   ├── LoginComponent.tsx
│   ├── RegisterComponent.tsx
│   └── AuthGuard.tsx
├── disease/
│   ├── DiseaseSearchComponent.tsx
│   └── DiseaseDetailComponent.tsx
└── common/
    ├── ImageUploadComponent.tsx
    └── LoadingSpinner.tsx
```

### Hooks
```
hooks/
├── useAuth.ts
├── useFirestore.ts
└── useImageUpload.ts
```

### Services
```
services/
├── api.ts
├── firebase.ts
├── authService.ts
├── diseaseService.ts
└── marketplaceService.ts
```

## Development Workflow

1. **Start development server**: `npm start`
2. **Run tests**: `npm test`
3. **Format code**: `npm run format`
4. **Lint code**: `npm run lint`
5. **Build for production**: `npm run build`
