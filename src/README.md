# 📦 Barcode Validation App

A React + TypeScript application for validating barcodes with client-side rules and simulated server validation.  
Built using **Vite** for fast development and **Jest** for unit testing.

---

## 🛠️ Tech Stack

- ⚛️ **React 18**
- 🟦 **TypeScript**
- ⚡ **Vite**
- 🧪 **Jest**
- 🧹 **ESLint**

---

## 🚀 Setup & Run Instructions

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install Dependencies
```bash
npm install
```

### Run the App Locally
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 🧪 Running Tests

### Run All Tests
```bash
npx jest
```

### List Discovered Tests
```bash
npx jest --listTests
```

### Run Specific Test Suites
```bash
# Hook tests only
npx jest src/hooks

# Utility tests only
npx jest src/utils

# Component tests only
npx jest src/components
```

### Run Lint Checks
```bash
npm run lint
```

---

## 🗂️ Project Structure
```
src/
├── components/
│   ├── BarcodeForm/
│   ├── Header/
│   ├── Footer/
│   ├── Table/
│   └── Toaster/
├── hooks/
│   └── useBarcodeValidating.tsx
├── utils/
│   └── barcode.ts
├── services/
│   └── mockApi.ts
├── images/
├── test/
├── types.ts
├── styles.css
├── App.tsx
└── main.tsx
```

---

## 🧠 Technical Decisions & Rationale

### ⚛️ React + TypeScript

- **Strong type safety** across the entire application
- **Clear contracts** between components, hooks, and utilities
- **Safer refactoring** and better IDE support

### ⚡ Vite

- **Fast development server** with instant startup
- **Instant HMR** (Hot Module Replacement)
- **Modern ESM-based tooling** for optimal performance

### 🎣 Custom Hook (`useBarcodeValidating`)

All barcode validation, async processing, and state management are encapsulated inside a custom hook.

**Why this approach:**
- ✅ Clear separation of concerns
- ✅ Presentational components remain simple and focused
- ✅ Business logic is easy to unit test

### 🔄 Concurrent Validation Support

Multiple barcode validations can run concurrently.

**Design choice:**
- No global loading state
- Each barcode tracks its own lifecycle (`Validating` → `Valid` / `Invalid`)
- Mirrors real-world parcel tracking behavior

### 🔔 Toast Notifications

A non-blocking toast notification system is used to provide immediate feedback for async validation results.

- Success toasts are shown when a barcode is validated successfully
- Error toasts are shown when server-side validation fails
- Toasts do not block user interaction or prevent concurrent submissions

### 📝 Form UX & Validation Behaviour

- The submit button is **disabled when the input is empty**
- Prevents unnecessary validation attempts
- **Basic responsiveness** for mobile and desktop

---

## ♿ Accessibility Considerations

- ✅ All form controls use proper **semantic HTML** elements (`<form>`, `<label>`, `<input>`, `<button>`)
- ✅ Inputs are associated with labels using `htmlFor`, ensuring **screen reader compatibility**
- ✅ The form supports **full keyboard accessibility**:
  - Users can tab to the input field and submit button
  - Pressing **Enter** submits the form when the input is focused
- ✅ Disabled states are used appropriately to prevent invalid submissions
- ✅ Visual feedback is accompanied by **text** (e.g. status messages), not colour alone

---

## 🧪 Jest for Testing

**Unit tests cover:**
- ✅ Custom hooks
- ✅ Utility functions
- ✅ BarcodeForm component

Tests focus on **observable behavior**, not internal implementation details.

---

## ⚠️ Known Limitations / Trade-offs

- ⚠️ Mock API returns random success or failure
- ⚠️ No persistence (history resets on page reload)
- ⚠️ Styling kept intentionally minimal
- ⚠️ No internationalization support

---

## 🔮 Improvements With More Time

- 🎯 **Deterministic mock API** for predictable testing
- 🎨 **Adopting a UI design system** (e.g. Tailwind or MUI)
- 💾 **Persist tracked history** using localStorage or a backend
- 🔁 **Retry actions** for failed validations
- 📊 **Table virtualization** for large datasets
- 🧪 **End-to-end testing** with Playwright or Cypress and more unit tests
- 🎣 **Further splitting of hooks** for finer-grained responsibilities
- 🐳 **Docker support** for consistent local and CI environments

---


## 👤 Author

**Jeena James**

---

## 🙏 Acknowledgments

Built as a technical assessment for Royal Mail Group.