export default function OrbAnimation() {
  return (
    <div className="relative mx-auto flex h-[26rem] w-[26rem] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-300/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-52 w-52 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-95 shadow-[0_0_80px_rgba(56,189,248,0.25)] animate-float" />
      </div>
      <div className="absolute inset-0 animate-orbit">
        <div className="absolute left-1/2 top-1/2 h-72 w-[1px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/25" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.4)]" />
    </div>
  );
}
