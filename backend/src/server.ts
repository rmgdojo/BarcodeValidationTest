import { handleValidation } from './routes/validation';

/**
 * Bun HTTP server
 * Handles CORS and routes API requests
 */
Bun.serve({
  port: 3001,
  fetch(request) {
    const url = new URL(request.url);

    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Route: POST /api/validate
    if (url.pathname === '/api/validate' && request.method === 'POST') {
      return handleValidation(request).then((response) => {
        // Add CORS headers to response
        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return new Response(response.body, {
          status: response.status,
          headers,
        });
      });
    }

    // 404 for unknown routes
    return new Response('Not Found', {
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
});

console.log('🚀 Server running on http://localhost:3001');
