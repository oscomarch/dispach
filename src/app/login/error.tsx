'use client';

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] text-center">
        <h2
          className="text-xl text-text-primary mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Login unavailable
        </h2>
        <p className="text-sm text-text-muted mb-2">
          {error.message || 'Something went wrong loading this page.'}
        </p>
        <button
          onClick={reset}
          className="mt-4 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
