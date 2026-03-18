'use client';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4">
      <div className="max-w-[400px] text-center">
        <h2
          className="text-xl text-text-primary mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Something went wrong
        </h2>
        <p className="text-sm text-text-muted mb-2">
          {error.message || 'An error occurred loading the dashboard.'}
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
          >
            Try again
          </button>
          <a
            href="/login"
            className="px-5 py-2.5 border border-border-default text-sm font-medium text-text-secondary rounded-lg hover:bg-bg-hover transition-all"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
