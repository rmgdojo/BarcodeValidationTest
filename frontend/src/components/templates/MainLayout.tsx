import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout template component
 * Provides the main page structure with Royal Mail branding
 * Follows Single Responsibility Principle - handles layout structure
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-royal-mail-red focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <header className="bg-royal-mail-red text-white shadow-lg" role="banner">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Royal Mail Barcode Validator</h1>
          <p className="mt-2 text-sm sm:text-base text-royal-mail-light-red">
            Validate Royal Mail barcodes instantly
          </p>
        </div>
      </header>
      <main id="main-content" className="container mx-auto px-4 py-8" role="main">
        {children}
      </main>
      <footer className="bg-gray-800 text-white mt-12 py-4" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Royal Mail Barcode Validation System</p>
        </div>
      </footer>
    </div>
  );
}
