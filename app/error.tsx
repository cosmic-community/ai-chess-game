'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center max-w-md mx-auto p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-accent hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}