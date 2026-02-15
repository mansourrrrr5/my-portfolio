export default function Approach() {
  const phases = [
    {
      title: "Planning & Research",
      description:
        "Understanding requirements and designing scalable system architecture.",
    },
    {
      title: "Development & Integration",
      description:
        "Building reliable, maintainable, and production-ready solutions.",
    },
    {
      title: "Optimization & Deployment",
      description:
        "Performance tuning, testing, and delivering robust deployments.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {phases.map((phase, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center"
        >
          <h3 className="text-lg font-semibold">{phase.title}</h3>
          <p className="mt-3 text-zinc-300">{phase.description}</p>
        </div>
      ))}
    </div>
  );
}
