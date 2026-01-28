# Royal Mail Barcode Validation

A React application for validating Royal Mail barcodes with real-time feedback and validation history.

## Setup and Run Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
npm run lint
```

## Technical Decisions

### Build Tool: Vite

Chose Vite over Create React App/Webpack/Next.js for:
- Faster development server startup with native ES modules
- Better TypeScript support out of the box
- Smaller bundle sizes with Rollup
- Active maintenance and modern defaults
- Next.js was considered but is overkill for a single-page app with no routing or SSR needs

### Testing: Vitest

Selected Vitest because:
- Native ESM support matches Vite's architecture
- Compatible with Jest APIs (easy migration)
- Faster execution than Jest

### Styling

- **Tailwind CSS 4 over styled-components/Material UI** - Utility-first CSS for rapid UI development without context switching
- Smaller bundle size than component libraries like Material UI.
- Royal Mail brand colors configured as custom colors (`rm-red`, `rm-dark-red`)

### State Management

- **React useState/useCallback** - Local component state is sufficient for this app's complexity
- No external state library needed; keeps bundle size small and reduces complexity
- `useCallback` with functional updates handles concurrent async operations safely


## Structure Overview

```
src/
├── components/
│   ├── index.ts              # Barrel export
│   ├── BarcodeInput.tsx      # Form input with error/success messages
│   ├── ValidationHistory.tsx # List of validation attempts
│   └── StatusIndicator.tsx   # Visual status icons (spinner/check/error)
├── validation/
│   ├── index.ts              # Barrel export
│   ├── barcodeValidation.ts  # Core validation logic & check digit algorithm
│   ├── barcodeValidation.test.ts # Unit tests
│   └── mockApi.ts            # Simulated async API validation
├── App.tsx                   # Main app component, state management
├── types.ts                  # Shared TypeScript interfaces
├── main.tsx                  # React entry point
└── index.css                 # Tailwind imports & custom styles
```

### Key Files

| File | Purpose |
|------|---------|
| `barcodeValidation.ts` | Check digit algorithm, format validation, error messages |
| `App.tsx` | Orchestrates validation flow, manages entries state |
| `BarcodeInput.tsx` | Controlled input, form submission, message display |
| `ValidationHistory.tsx` | Renders list of past validations with status |
| `mockApi.ts` | Simulates backend with random success/failure and delay |

## Notes on Requirements

The requirements document lists `ZZ999999990GB` as a valid test barcode. This contains a typo - the correct check digit for serial `99999999` is `5`, not `0`. The valid barcode is `ZZ999999995GB`.

Calculation: serial `99999999` → weighted sum = 352 → 11 - (352 % 11) = 11 - 0 = 11 → special case 11 becomes `5`.

## Known Limitations / Trade-offs

1. **No persistence** - Validation history is lost on page refresh (intentional per requirements - session-only)

2. **No duplicate detection** - Same barcode can be submitted multiple times, creating duplicate entries

3. **No error boundaries** - Unhandled errors could crash the entire app

4. **Return boolean from onSubmit** - Instead of using `useEffect` to clear the input on success (which triggers ESLint warnings about setState in effects), `onSubmit` returns a boolean so the child can clear input immediately

5. **Constant lookup objects** - `STATUS_TEXT` and `BORDER_COLOR` are defined outside components to avoid recreation on every render

## What I'd Improve With More Time

### High Priority

1. **Implement Accessibility best practices** - Proper semantic HTML, Keyboard navigation (tab order, form submission with Enter key), ARIA labels for icons and status indicators, Screen reader announcements for validation results, Sufficient color contrast, Focus indicators
2. **Error boundaries** - Graceful error handling with user-friendly recovery
3. **Improve UI polishing and responsiveness**

### Medium Priority

4. **More comprehensive tests** - Component tests with React Testing Library, integration tests

### Nice to Have

5. **Persistence option** - LocalStorage toggle for keeping history across sessions
6. **Batch validation** - Paste multiple barcodes at once
7. **Export history** - Download validation results as CSV
8. **Dark mode** - Theme toggle

### What I Prioritised

1. **Correct check digit algorithm** - Core business logic must be accurate
2. **Clean separation of concerns** - Validation logic isolated and testable
3. **Proper async handling** - Concurrent validations update correct entries
4. **Type safety** - Full TypeScript coverage prevents runtime errors
5. **Code quality** - No ESLint warnings, no deprecated APIs, clean patterns

## Test Coverage

Tests cover the critical validation logic:

- Check digit calculation with all edge cases (result 10 → 0, result 11 → 5)
- Full barcode validation with specific error messages
- Input normalization (lowercase, whitespace handling)
- Invalid input rejection

Run `npm test` to execute the test suite.