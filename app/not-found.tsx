import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold">Page not found</p>
        </div>

        <p className="text-zinc-400">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>

        <Link
          href="/"
          className="inline-block rounded-xl border border-purple-500 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-500/20 transition"
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}
