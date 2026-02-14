# Online Delivery App - Frontend

A modern, responsive React application for an online food delivery service built with React, Tailwind CSS, React Router DOM, and more.

## 🚀 Tech Stack

- **Frontend Framework**: React 18.2
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.20
- **Build Tool**: Vite 5.0
- **State Management**: Zustand 4.4
- **HTTP Client**: Axios 1.6
- **UI Icons**: Lucide React 0.294
- **Notifications**: React Hot Toast 2.4
- **Authentication**: Google OAuth (@react-oauth/google)
- **Code Quality**: ESLint with React plugins

## 📁 Project Structure

```
ui/frontend/
│
├── public/                    # Static assets
│
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.jsx         # Button component
│   │   ├── Input.jsx          # Input component
│   │   ├── Alert.jsx          # Alert/notification component
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   └── index.js           # Component exports
│   │
│   ├── pages/                # Page components
│   │   ├── LoginPage.jsx      # Login page with email/password & Google OAuth
│   │   ├── SignUpPage.jsx     # Registration page with role selection
│   │   ├── HomePage.jsx       # Dashboard/home page
│   │   └── index.js           # Page exports
│   │
│   ├── contexts/             # State management
│   │   └── authStore.js      # Zustand auth store
│   │
│   ├── services/             # API communication
│   │   └── authService.js    # Authentication API calls
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useAuth.js        # Authentication hooks
│   │
│   ├── utils/                # Utility functions
│   │   └── validators.js     # Form validation utilities
│   │
│   ├── styles/               # CSS & Tailwind
│   │   └── index.css         # Global styles
│   │
│   ├── assets/               # Media & resources
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── App.jsx               # Main app component with routing
│   └── main.jsx              # React entry point
│
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
├── eslintrc.json             # ESLint configuration
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── index.html                # HTML entry point
└── README.md                 # This file
```

## 📦 Installation

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher

### Step 1: Navigate to Frontend Directory

```bash
cd ui/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APP_NAME=Online Delivery
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Generates optimized production build in `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

### Fix Lint Issues

```bash
npm run lint:fix
```

## 🔌 Available Pages

### 1. **Login Page** (`/login`)
- Email and password authentication
- Google OAuth login option
- Remember me functionality
- Link to sign up page
- Forgot password option
- Input validation with error messages

### 2. **Sign Up Page** (`/signup`)
- User registration form
- Fields: Name, Email, Phone, Role, Password, Confirm Password
- Role selection: Customer, Rider, Restaurant Owner
- Google OAuth sign up option
- Terms & Conditions checkbox
- Terms of Service and Privacy Policy links

### 3. **Home Page** (`/`) - Protected
- Welcome message with user information
- Quick action links for browsing restaurants
- Featured restaurants grid (with rating, delivery time)
- User account information display
- Edit profile button
- Logout functionality
- Footer with links

## 🔐 Authentication Flow

### Features
- ✅ Email/Password authentication
- ✅ Google OAuth integration (Sign in & Sign up)
- ✅ JWT token-based sessions
- ✅ Automatic token refresh
- ✅ Protected routes (require authentication)
- ✅ Persistent login (tokens stored in localStorage)
- ✅ Automatic logout on token expiration

### Auth Store (Zustand)

```javascript
import { useAuth } from './contexts/authStore';

// Usage in components
const { user, isAuthenticated, login, register, logout } = useAuth();
```

## 🎨 Tailwind CSS

### Custom Colors

```css
primary: #0ea5e9 (Sky Blue)
secondary: #a855f7 (Purple)
success: #22c55e (Green)
warning: #fbbf24 (Amber)
danger: #ef4444 (Red)
```

### Utility Classes

```html
<!-- Buttons -->
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>
<button class="btn-danger">Danger Button</button>

<!-- Inputs -->
<input class="input" type="text" />
<input class="input input-error" type="text" />

<!-- Cards -->
<div class="card">Card Content</div>
<div class="card-shadow">Card with Shadow</div>

<!-- Alerts -->
<div class="alert alert-success">Success Message</div>
<div class="alert alert-error">Error Message</div>
<div class="alert alert-warning">Warning Message</div>
<div class="alert alert-info">Info Message</div>
```

## 🧩 Components

### Button Component

```jsx
import { Button } from './components';

<Button
  variant="primary"    // primary, secondary, outline, ghost, danger
  size="md"            // sm, md, lg
  isLoading={false}
  fullWidth={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Input Component

```jsx
import { Input } from './components';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email}
  onChange={handleChange}
  showPasswordToggle={true}  // For password fields
/>
```

### Alert Component

```jsx
import { Alert } from './components';

<Alert
  type="success"    // success, error, warning, info
  title="Success"
  message="Operation completed"
  onClose={() => {}}
/>
```

## 🛡️ Protected Routes

```jsx
import { ProtectedRoute } from './components';

<Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />
</Routes>
```

## 🔗 API Integration

### Auth Service

```javascript
import { authService } from './services/authService';

// Register
await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  phone: '1234567890',
  role: 'customer'
});

// Login
await authService.login('john@example.com', 'SecurePass123');

// Google Login
await authService.googleLogin(googleToken);

// Get Current User
await authService.getCurrentUser();

// Logout
await authService.logout();

// Refresh Token
await authService.refreshToken();
```

## 📝 Form Validation

```javascript
import { validateForm, validateEmail, validatePassword } from './utils/validators';

// Validate entire form
const errors = validateForm(formData, [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true, minLength: 8 },
  { name: 'name', label: 'Name', required: true, minLength: 2 },
]);

// Individual validators
validateEmail('test@example.com');    // true/false
validatePassword('SecurePass123');     // true/false
```

## 🎯 Routing Structure

```
/              → HomePage (protected)
/login         → LoginPage (public)
/signup        → SignUpPage (public)
/*             → Redirects to /
```

## 🔔 Notifications

```javascript
import toast from 'react-hot-toast';

toast.success('Success message');
toast.error('Error message');
toast.loading('Loading...');
toast.custom((t) => <div>Custom Toast</div>);
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.js
export default defineConfig({
  server: {
    port: 3000  // Change to a different port
  }
})
```

### API Connection Issues

1. Verify backend is running on `http://localhost:5001`
2. Check `VITE_API_BASE_URL` in `.env`
3. Ensure CORS is enabled on backend

### Build Issues

```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist
npm run build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)

## 📄 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5001/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-google-client-id` |
| `VITE_APP_NAME` | App display name | `Online Delivery` |

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review component examples in page files
3. Check environment configuration in `.env.example`

## 📝 License

This project is part of the Online Delivery App platform.

---

**Status**: Frontend is ready for development and testing! 🎉

*Last Updated: 2024*
