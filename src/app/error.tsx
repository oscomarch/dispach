'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="max-w-[400px] text-center">
        <h2
          className="text-xl text-text-primary mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Something went wrong
        </h2>
        <p className="text-sm text-text-muted mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
