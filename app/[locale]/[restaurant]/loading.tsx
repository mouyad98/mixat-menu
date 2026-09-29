import TopProgressBar from "@/components/TopProgressBar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <TopProgressBar />
      <svg viewBox="0 0 180 70" className="w-32 h-auto">
        <polygon points="10,10 40,10 25,45" fill="#00B1B7" className="pulse-tri" style={{ animationDelay: "0s" }} />
        <polygon points="70,10 100,10 85,45" fill="#FF8021" className="pulse-tri" style={{ animationDelay: "0.15s" }} />
        <polygon points="130,10 160,10 145,45" fill="#00B1B7" className="pulse-tri" style={{ animationDelay: "0.3s" }} />
      </svg>
      <style>{`
        @keyframes pulseTri {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-6px); }
        }
        .pulse-tri {
          animation: pulseTri 1s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </main>
  );
}
