const faces = [
  {
    label: "React",
    description: "Fast interactive interfaces with reusable components.",
    transform: "rotateY(0deg) translateZ(130px)",
  },
  {
    label: "Next.js",
    description: "Server-rendered pages and modern routing for high performance.",
    transform: "rotateY(90deg) translateZ(130px)",
  },
  {
    label: "TypeScript",
    description: "Strong typing for safer code and better developer experience.",
    transform: "rotateY(180deg) translateZ(130px)",
  },
  {
    label: "Node.js",
    description: "Backend services and APIs built for real production workloads.",
    transform: "rotateY(-90deg) translateZ(130px)",
  },
];

export default function HeroAnimation() {
  return (
    <div className="relative mx-auto w-full max-w-[28rem] perspective-1200">
      <div className="relative h-[28rem] w-full rounded-[2rem] border border-slate-200/10 bg-slate-950/85 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_25%)]" />
        <div className="relative h-full w-full [transform-style:preserve-3d] animate-hero-rotate">
          {faces.map((face) => (
            <div
              key={face.label}
              className="absolute inset-0 flex items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/10 p-6 text-center text-white shadow-2xl backdrop-blur-xl"
              style={{ transform: face.transform }}
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200 font-semibold mb-4">
                  {face.label}
                </p>
                <p className="text-sm leading-6 text-slate-100">{face.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10 blur-2xl" />
      </div>
    </div>
  );
}
