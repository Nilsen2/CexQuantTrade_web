export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-400">The server may be unavailable. Please try again later.</p>
    </div>
  );
}