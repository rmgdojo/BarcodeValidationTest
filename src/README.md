
# Royal Mail Barcode Validation Test

A lightweight web application for validating Royal Mail barcodes.

## Primary Tech Stack

- Typescript
- React
- Next.js
- Redux

## Features

- Barcode validation
- Support for multiple concurrent validations

## Installation

```bash
# Clone the repository
git clone [git@github.com:IfyNdu/BarcodeValidationTest.git]

# Change directory
cd BarcodeValidationTest/src

# Install dependencies
npm install
```

## Running the application

```bash
# Start the development server
npm run dev
```

## Test

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch
```

## Technical decisions and rationale

### State management

Redux was used to manage global application state. This ensures predictable state updates and prevents unnecessary component re-renders when unrelated state changes occur.

By moving state management entirely out of React components, the UI remains focused on presentation, reducing clutter and overall component complexity.

### Validation

Input validation and checksum calculations were implemented outside of React components. This maintains a clear separation of concerns and significantly simplifies unit testing of business logic.

### Network requests

Barcode validation requests were handled within Redux middleware, which is the conventional location for managing asynchronous behaviour. Although network calls were mocked, this approach:

1. Moves business logic away from the UI, keeping components decoupled from application logic
2. Ensures React components have a single responsibility i.e rendering data

### Aborting duplicate requests

For performance reasons, duplicate validation requests are aborted using the native `AbortController` API. While not fully implemented (as real network calls were not made), this approach helps prevent race conditions when validating the same barcode multiple times.

### Next.js

Next.js was selected for the following reasons:

- Server-side rendering to improve initial load performance and SEO
- Support for React Server Components

### shadcn/ui

shadcn/ui was selected to provide a set of accessible, well-structured base UI components out of the box. Its minimal and unopinionated design reduced the time spent on custom styling, allowing greater focus on delivering the core functional requirements of the application.

### Testing with Jest

- `React Testing Library` in conjunction with `jest` was used to test behaviour from the user’s perspective, rather than testing implementation details. This results in more resilient and maintainable tests.
- Redux middleware was tested in isolation to verify internal behaviour and business logic, including request handling, validation flow, and edge-case scenarios
- Shared utility functions were unit tested to validate checksum calculations, barcode parsing, and input validation logic

### Store setup abstraction

As recommended in the Redux documentation, React components and the Redux store should be tested together.

To support this, store creation was abstracted so the same configuration can be reused across both development and test environments.

## Structure overview

```
BarcodeValidationTest/
├── src/             # Source code
│   ├── app/         # App router 
│   ├── components/  # Shared complex react components (organisms)
│   ├── middleware/  # Redux middleware
│   ├── public/      # Static assets (e.g. images)
│   ├── services/    # Asynchronous operations (ideally server actions)
│   ├── store/       # Redux store configuration (reducers, action, etc.)
│   ├── styles/      # Global CSS styles
│   ├── types/       # Shared type definitions
│   ├── ui/          # Reusable UI components (atoms and molecules)
│   ├── utils/       # Shared utility functions
│   ├── package.json # Project configuration and dependencies
│   └── README.md    # Project documentation
└── README.md        # Project instructions
```

## Known limitations / trade-offs

- Validation results are randomised due to the absence of a real backend service. As there is no persistent storage, previously validated barcodes must be reprocessed when the page is reloaded.
- Network requests cannot be fully aborted or timed out in a realistic manner, as no actual HTTP requests are performed within the application.
- It is not possible to accurately simulate aborted network requests within server actions, as browser-only APIs (such as AbortController) cannot be referenced or executed in a server environment.

## What you'd improve with more time and rationale

1. Extract interactive logic from `barcode-validator.tsx` into a dedicated client component, allowing more of the application to be rendered on the server for improved performance and a smaller client bundle.
2. Implement a lightweight custom server that responds as required. Using real network requests via `fetch` or `axios` would allow proper request cancellation based on timeouts or duplicate submissions.
3. Implement list virtualisation (windowing) where large datasets are displayed. Virtualisation limits rendering to only the data currently visible to the user. Most third-party libraries (for example, `AG-Grid` and `react-virtuoso`) recycle DOM nodes as the user scrolls, keeping the DOM lightweight and ensuring smooth, responsive user interactions.
4. Introduce a search capability to help users efficiently filter large datasets. The search logic would operate directly on the Redux store rather than querying rendered HTML elements, ensuring all barcodes are considered before displaying results.
5. Implement **E2E** testing using tools such as Puppeteer, Playwright, or Cypress to validate complete user workflows and ensure system reliability
6. Introduce retry and backoff strategies such as exponential backoff when handling invalid barcode submissions thereby improving resilience and fault tolerance.

## Area of priority

1. Priority was given to delivering a fully functional barcode validation flow over advanced UI styling, ensuring correctness and reliability of core functionality.

## Accessibility

Accessibility was considered throughout the application to ensure an inclusive and usable experience for all users.

- shadcn/ui is built on Radix UI, which provides accessible primitives and enforces correct semantic behaviour by default.
- Additional ARIA attributes, such as `aria-invalid`, were applied to form elements (for example, `Field` and `Input`) to clearly communicate validation errors, including invalid barcodes.
- The `Input` component includes a clear visual indicator to denote focus state, improving usability for keyboard and low-vision users.
- The validation history container was assigned the `list` role, with each entry provided with a corresponding `listitem` role to ensure correct semantic structure.
- Full keyboard navigation is supported across all interactive elements, including input fields and buttons, in line with accessibility guidelines.
- The tab order follows a logical progression, moving from the `Input` field to the **Validate** button and finally to the sample barcode buttons.
- All buttons are operable using the keyboard by tabbing to the element and activating it via the **Enter** key.
- Screen reader accessibility was manually tested using the VoiceOver application on macOS.
