# Barcode Validation App

A React + TypeScript application for validating barcodes with client-side rules and simulated server validation.  
Built using **Vite** for fast development and **Jest** for unit testing.

---

## 📦 Tech Stack

- ⚛️ React 18
- 🟦 TypeScript
- ⚡ Vite
- 🧪 Jest
- 🧹 ESLint

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install dependencies
npm install

### Run the app locally
npm run dev

### The app will be available at:
http://localhost:5173

## 🧪 Running Tests

### Run all tests
npx jest

### List discovered tests
npx jest --listTests
### Run only hook tests
npx jest src/hooks
### Run only utility tests
npx jest src/utils
### Run only components tests
npx jest src/components

### Run lint checks
npm run lint

## 🗂️ Project Structure

src/
├── components/
│   ├── BarcodeForm
│   ├── Header
│   ├── Footer
│   ├── Table
│   └── Toaster
│
├── hooks/
│   └── useBarcodeValidating.tsx
│
├── utils/
│   └── barcode.ts
│
├── services/
│   └── mockApi.ts
│
├── images/
├── test/
│
├── types.ts
├── styles.css
├── App.tsx
└── main.tsx

### 🧠 Technical Decisions & Rationale
## React + TypeScript

- Strong type safety

- Clear contracts between components, hooks, and utilities

- Safer refactoring and better IDE support

## Vite

- Fast development server

- Instant HMR (Hot Module Replacement)

- Modern ESM-based tooling

### Custom Hook (useBarcodeValidating)

All barcode validation, async processing, and state management are encapsulated inside a custom hook.

## Why this approach:

- Clear separation of concerns

- Presentational components remain simple and focused

- Business logic is easy to unit test

### Concurrent Validation Support

Multiple barcode validations can run concurrently.

## Design choice:

- No global loading state

- Each barcode tracks its own lifecycle (Validating → Valid / Invalid)

- Mirrors real-world parcel tracking behavior

### Form UX & Validation Behaviour

- The submit button is disabled when the input is empty

- Prevents unnecessary validation attempts

- Basic Responsiveness

### ♿ Accessibility Considerations

- All form controls use proper semantic HTML elements (`<form>`, `<label>`, `<input>`, `<button>`)

- Inputs are associated with labels using `htmlFor`, ensuring screen reader compatibility

- The form supports **full keyboard accessibility**:
  - Users can tab to the input field and submit button
  - Pressing **Enter** submits the form when the input is focused

- Disabled states are used appropriately to prevent invalid submissions

- Visual feedback is accompanied by text (e.g. status messages), not colour alone

### 🧪 Jest for Testing

## Unit tests cover:

- Custom hooks

- Utility functions

- BarcodeForm component

- Tests focus on observable behavior, not internal implementation details


### ⚠️ Known Limitations / Trade-offs

- Mock API returns random success or failure

- No persistence (history resets on page reload)

- Styling kept intentionally minimal

- No internationalisation support


### 🔮 Improvements With More Time

- Deterministic mock API for predictable testing

- Adopting a UI design system (e.g. Tailwind or MUI)

- Persist tracked history using localStorage or a backend

- Retry actions for failed validations

- Table virtualisation for large datasets

- End-to-end testing with Playwright or Cypress and more Unit tests as well

- Further splitting of hooks for finer-grained responsibilities

- Docker support for consistent local and CI environments
