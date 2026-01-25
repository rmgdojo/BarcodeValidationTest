import { afterEach, expect } from 'bun:test';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

/**
 * Test setup for Bun test runner
 * Extends expect with jest-dom matchers and cleans up after each test
 */

// Extend expect with jest-dom matchers for Bun's test runner
// Convert jest-dom matchers to Bun's expected format
const bunMatchers: Record<string, any> = {};
for (const [key, value] of Object.entries(matchers)) {
  if (typeof value === 'function') {
    bunMatchers[key] = value;
  }
}

expect.extend(bunMatchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
