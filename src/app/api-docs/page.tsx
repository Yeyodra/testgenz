'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-custom.css';

// Import SwaggerUI secara dynamic untuk menghindari SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Roboto, sans-serif'
    }}>
      Loading API Documentation...
    </div>
  ),
});

/**
 * Halaman API Documentation
 * Simple and clean
 * Note: React StrictMode warnings dari swagger-ui-react diabaikan karena ini adalah issue dari library
 */
export default function ApiDocsPage() {
  return <SwaggerUI url="/api/docs" />;
}

