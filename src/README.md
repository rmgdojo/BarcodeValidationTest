# Royal Mail Barcode Validation Application

A complete React + TypeScript application for validating Royal Mail barcodes, built with SOLID principles and atomic design patterns.

## 🚀 Setup and Run Instructions

### Prerequisites

- [Bun](https://bun.sh) installed (version 1.0+)
- Node.js 18+ (if not using Bun for frontend)

### Installation

1. **Install frontend dependencies:**
   ```bash
   cd frontend
   bun install
   ```

2. **Install backend dependencies:**
   ```bash
   cd ../backend
   bun install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   bun run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   bun run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Running Tests

**Frontend tests:**
```bash
cd frontend
bun run test
```

**Backend tests:**
```bash
cd backend
bun test
```

## 🏗️ Technical Decisions and Architecture

### Architecture Overview

The application follows a clean architecture pattern with clear separation of concerns:

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Bun runtime with TypeScript - can handle more requests per second than Node.js
- **State Management**: Redux Toolkit - can be scaled a separated into a separate module in future
- **Styling**: Tailwind CSS - easy for Design and Development alignment and potential future Tokenised Design System
- **Validation**: Zod for runtime type validation
- **Testing**: Vitest + React Testing Library

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
- Each service, component, and slice has a single, well-defined responsibility
- `ValidationService`: Only handles barcode validation logic
- `ApiService`: Only handles API communication
- Components are focused and reusable

#### Open/Closed Principle (OCP)
- Services implement interfaces (`IValidationService`, `IApiService`)
- Components accept props through well-defined interfaces
- Easy to extend without modifying existing code

#### Liskov Substitution Principle (LSP)
- Components can be substituted with compatible implementations
- Service interfaces ensure substitutability

#### Interface Segregation Principle (ISP)
- Focused interfaces (`ValidationResult`, `HistoryEntry`)
- Components only depend on what they need

#### Dependency Inversion Principle (DIP)
- Components depend on service interfaces, not concrete implementations
- Dependency injection through props and hooks

### Atomic Design Structure

The component architecture follows atomic design principles:

#### Atoms (`components/atoms/`)
- Basic building blocks: `Button`, `Input`, `Label`, `Spinner`, `Icon`, `StatusBadge`
- Highly reusable, no business logic

#### Molecules (`components/molecules/`)
- Composite components: `FormField`, `HistoryItem`, `ValidationStatus`
- Combine atoms to create functional units

#### Organisms (`components/organisms/`)
- Complex components: `BarcodeInputForm`, `ValidationHistoryList`
- Handle business logic and state coordination

#### Templates (`components/templates/`)
- Layout components: `MainLayout`
- Define page structure

#### Pages (`pages/`)
- Top-level page components: `BarcodeValidationPage`
- Integrate organisms and templates

### State Management

- **Redux Toolkit** for global state management
- Two main slices:
  - `validationSlice`: Manages validation history with unique IDs for concurrent operations
  - `uiSlice`: Manages UI state (notifications, loading states)
- Immutable updates using Immer (built into Redux Toolkit)
- Typed hooks (`useAppDispatch`, `useAppSelector`) for type safety

### Validation Flow

1. **Client-side Pre-validation** (immediate):
   - Length check (exactly 13 characters)
   - Prefix validation (A-Z)
   - Serial number validation (0-9)
   - Check digit calculation and validation
   - Country code validation (GB)

2. **API Validation** (async, 1-30s delay):
   - Simulated backend validation
   - Random success/failure (50% chance)
   - Random delay between 1-30 seconds
   - Updates history entry when complete

### Concurrent Validation Handling

- Each validation entry gets a unique ID
- Multiple validations can run simultaneously
- Updates are handled by ID (not index) to prevent race conditions
- History entries are never removed, only updated

### Accessibility Features

- Semantic HTML (`<form>`, `<label>`, `<button>`, `<main>`, `<header>`, `<footer>`)
- ARIA labels and roles for all interactive elements
- Keyboard navigation support (tab order, Enter key submission)
- Screen reader announcements via `aria-live` regions
- Focus management with visible focus indicators
- Skip to main content link
- WCAG AA color contrast compliance

### Royal Mail Branding

- Royal Mail red color scheme (`#C41E3A`)
- Professional typography
- Clean, modern UI with responsive design
- Gradient backgrounds and shadow effects

## 📁 Project Structure

```
BarcodeValidationTest/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/          # Basic UI elements
│   │   │   ├── molecules/       # Composite components
│   │   │   ├── organisms/       # Complex components
│   │   │   └── templates/       # Layout templates
│   │   ├── pages/               # Page components
│   │   ├── store/               # Redux store and slices
│   │   ├── services/            # Business logic services
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   └── test/                # Test setup
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── server.ts            # Bun.serve entry point
│   │   ├── routes/              # API route handlers
│   │   ├── services/            # Business logic
│   │   └── types/               # TypeScript types
│   └── package.json
└── README.md
```

## 🧪 Testing Strategy

- **Unit Tests**: Validation service, Redux reducers, utility functions
- **Component Tests**: Critical UI components (Button, StatusBadge, etc.)
- **Integration Tests**: Validation flow, API service
- **Test Coverage**: Focus on complex logic (check digit algorithm, concurrent validation)

### Running Tests

```bash
# Frontend tests
cd frontend
bun run test

# Watch mode
bun run test --watch

# UI mode
bun run test:ui
```

## ⚠️ Known Limitations and Trade-offs

### Limitations

1. **Backend Validation**: The backend validation is simulated with random outcomes. In production, this would connect to a real Royal Mail API.

2. **ID Generation**: Validation entry IDs are generated client-side. In a production app with a backend, IDs would be generated server-side.

3. **Error Handling**: Basic error handling is implemented. Production app would need more robust error recovery and retry logic.

4. **Testing**: Some edge cases in concurrent validation scenarios could benefit from more comprehensive testing.

### Trade-offs

1. **State Management**: Chose Redux Toolkit over Context API for better DevTools support and predictable state updates, especially for concurrent operations.

2. **Styling**: Used Tailwind CSS for rapid development and consistency. Trade-off is larger CSS bundle size (mitigated by purging unused styles).

3. **Backend**: Used Bun for fast development and TypeScript support. Trade-off is less ecosystem support compared to Node.js (though Bun is compatible with Node.js packages).

## 🚀 What I'd Improve with More Time

1. **Enhanced Testing**:
   - More comprehensive integration tests
   - E2E tests with Playwright or Cypress
   - Performance testing for concurrent validations

2. **Error Handling**:
   - Retry logic for failed API calls
   - Better error messages and recovery options
   - Network error detection and handling

3. **Performance**:
   - Virtual scrolling for large validation history lists
   - Debouncing for input validation
   - Code splitting and lazy loading

4. **Features**:
   - Export validation history to CSV/JSON
   - Filter and search validation history
   - Bulk validation support
   - Dark mode support

5. **Accessibility**:
   - More comprehensive screen reader testing
   - Keyboard shortcuts
   - High contrast mode

6. **Documentation**:
   - Storybook for component documentation
   - API documentation
   - Architecture decision records (ADRs)

## 📊 What I Prioritized and Why

1. **Correct Validation Logic** (Highest Priority)
   - Implemented check digit algorithm correctly
   - Comprehensive validation rules
   - Unit tests for validation logic

2. **Clean Code Structure** (High Priority)
   - SOLID principles throughout
   - Atomic design pattern
   - Separation of concerns

3. **Concurrent Validation Handling** (High Priority)
   - Unique IDs for each validation
   - Proper state updates by ID
   - No race conditions

4. **Basic UI/UX** (Medium Priority)
   - Clean, intuitive interface
   - Royal Mail branding
   - Responsive design

5. **Accessibility** (Medium Priority)
   - ARIA labels and roles
   - Keyboard navigation
   - Screen reader support

6. **Testing** (Medium Priority)
   - Unit tests for critical logic
   - Component tests for key UI elements
   - Redux reducer tests

## 🔧 Build and Deployment

### Production Build

**Frontend:**
```bash
cd frontend
bun run build
```

**Backend:**
```bash
cd backend
bun run build  # If you add a build step
```

### Environment Variables

Create `.env` files for environment-specific configuration:

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:3001
```

**Backend `.env`:**
```
PORT=3001
NODE_ENV=production
# Validation delay in milliseconds (default: 3000 = 1-3 seconds)
# Set to 30000 for full 1-30 second range per requirements
VALIDATION_DELAY_MAX=3000
```

## 📝 License

This project is a test implementation for Royal Mail barcode validation.


example valid bar codes:

1. AA123456785GB
2. AB234567895GB
3. AC345678909GB
4. AD456789015GB
5. AE567890126GB
6. AF678901233GB
7. AG789012341GB
8. AH890123458GB
9. AI901234562GB
10. AJ012345675GB