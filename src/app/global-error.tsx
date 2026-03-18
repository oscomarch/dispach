'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF8F5', fontFamily: 'Inter, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <div style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '1.25rem',
              color: '#1A1A1A',
              marginBottom: '0.75rem',
              fontFamily: 'Georgia, serif',
            }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#9B978F', marginBottom: '1.5rem' }}>
              The application encountered an error. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.625rem 1.25rem',
                backgroundColor: '#E8612D',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
