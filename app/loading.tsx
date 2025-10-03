export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-white mb-4" />
        <p className="text-white text-xl">Loading Chess Game...</p>
      </div>
    </div>
  );
}