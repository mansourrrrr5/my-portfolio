export default function Experience() {
  const experiences = [
    {
      role: "Working Student IT – Robotics R&D",
      company: "Swisslog",
      period: "2024 – Present",
      description:
        "Working on computer vision pipelines and AI integration for robotic systems.",
    },
    {
      role: "Bachelor Thesis – Object Detection",
      company: "THGA",
      period: "2025",
      description:
        "Integrated a lightweight YOLO model into the SweetPicker robotic system.",
    },
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{exp.role}</h3>
            <span className="text-sm text-zinc-400">{exp.period}</span>
          </div>
          <p className="mt-1 text-zinc-400">{exp.company}</p>
          <p className="mt-3 text-zinc-300">{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
