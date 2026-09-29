import TopProgressBar from "@/components/TopProgressBar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper">
      <TopProgressBar />

      {/* Hero skeleton */}
      <div className="px-6 pt-14 pb-8 flex flex-col items-center gap-3">
        <div className="w-40 h-10 rounded-md bg-ink/10 animate-pulse" />
        <div className="w-28 h-3 rounded bg-ink/10 animate-pulse" />
      </div>

      {/* Search + tabs skeleton */}
      <div className="px-4 pb-3 border-b border-ink/10">
        <div className="max-w-2xl mx-auto">
          <div className="w-full h-9 rounded bg-ink/5 animate-pulse mb-3" />
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-7 w-20 rounded-full bg-ink/10 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Item card skeletons */}
      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="w-32 h-7 rounded bg-ink/10 animate-pulse mb-6" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-ink/10 rounded-lg px-4 py-4 mb-3 flex items-center gap-4"
          >
            <div className="w-10 h-6 rounded bg-ink/10 animate-pulse flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div
                className="h-4 rounded bg-ink/10 animate-pulse"
                style={{ width: `${60 + i * 5}%` }}
              />
              <div
                className="h-3 rounded bg-ink/5 animate-pulse"
                style={{ width: `${80 - i * 5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
