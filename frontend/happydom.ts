import { GlobalRegistrator } from '@happy-dom/global-registrator';

/**
 * Preload script for Bun test runner
 * Registers happy-dom globals (document, window, etc.) for DOM testing
 */
GlobalRegistrator.register();
