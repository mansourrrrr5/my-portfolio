export default function Projects() {
  const projects = [
    {
      title: "SweetPicker Object Detection",
      description:
        "Real-time object detection integrated into robotic picking pipeline.",
    },
    {
      title: "KPI Dashboard",
      description:
        "Operational dashboard with Elasticsearch and log analytics.",
    },
    {
      title: "ItemPiQ Support Agent",
      description:
        "AI-powered assistant with WebSocket streaming and role-based access.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-600 hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-3 text-zinc-300">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
