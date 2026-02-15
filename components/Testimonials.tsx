export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Aziz delivers high-quality work and approaches problems with strong analytical thinking.",
      name: "Project Supervisor",
      role: "Robotics Lab",
    },
    {
      quote:
        "Reliable, proactive, and technically strong. A valuable team member.",
      name: "Line Manager",
      role: "Swisslog",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <p className="text-zinc-300">“{t.quote}”</p>
          <div className="mt-4">
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-zinc-400">{t.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
