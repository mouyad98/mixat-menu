export default function TopProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent overflow-hidden">
      <div className="h-full w-1/3 bg-flame top-loader-bar" />
      <style>{`
        @keyframes topLoaderMove {
          0% { transform: translateX(-100%); }
          60% { transform: translateX(160%); }
          100% { transform: translateX(160%); }
        }
        .top-loader-bar {
          animation: topLoaderMove 1.1s cubic-bezier(0.4,0,0.2,1) infinite;
          background: linear-gradient(90deg, #00B1B7, #FF8021);
        }
      `}</style>
    </div>
  );
}
