# Consltr Client Application

The frontend React application for the Consltr SaaS platform, built with React 19, TypeScript, and Vite.

## 🏗 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React + FontAwesome
- **State Management**: React Context API

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   └── common/         # Shared components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route components
│   │   ├── auth/          # Authentication pages
│   │   └── marketing/     # Marketing pages
│   ├── services/          # API service layers
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                 # Static assets
└── dist/                  # Production build output
```

## 🛠 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open application**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally
- `npm run tailwind:init` - Initialize Tailwind CSS

### Environment Configuration

Create a `.env.local` file for local development:

```bash
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Consltr
```

## 🎨 UI Components

The application uses a custom component library built with Tailwind CSS:

### Core Components
- `Button` - Interactive button component
- `Input` - Form input component  
- `Card` - Container component with variants
- `AlertDialog` - Modal dialog component

### Layout Components
- `AppLayout` - Main application layout
- `MarketingLayout` - Landing page layout
- `Header` - Application header
- `NavBar` - Navigation component

### Usage Example

```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/Card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## 🔐 Authentication

The app uses session-based authentication with CSRF protection:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <Button onClick={() => login(email, password)}>
          Login
        </Button>
      )}
    </div>
  );
}
```

## 🛣 Routing

Protected routes require authentication:

```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## 🎯 Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript coverage
- **Modern React**: Uses React 19 with concurrent features
- **Secure**: CSRF token handling and secure API communication
- **Performant**: Vite for fast development and optimized builds
- **Accessible**: ARIA-compliant components

## 🧪 Testing

```bash
# Run tests (when test suite is added)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration  
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## 📖 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Module resolution errors**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Clear TypeScript build cache
   rm -rf tsconfig.tsbuildinfo
   ```

---

**Last Updated**: January 2025
```
