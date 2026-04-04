import React from "react";

const skills = [
  "Python",
  "Machine Learning",
  "Computer Vision",
  "Next.js",
  "React",
  "FastAPI",
  "Elasticsearch",
  "Docker",
  "Linux",
  "Linux",
  "Linux",
  "Linux",
  "Linux",
  "SQL",
  "PHP",
  "HTML",
  "CSS",
];

export default function About() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      {/* Text Section */}
      <div className="flex-1">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-4">
          <p className="text-zinc-300 text-lg">
            Hi, I’m a developer passionate about building impactful digital solutions at the intersection of software engineering and intelligent automation.
          </p>
          <p className="text-zinc-400">
            I currently work as a Working Student IT in Robotics R&D at Swisslog, where I contribute to innovative automation projects and collaborate with talented engineers.
          </p>
          <p className="text-zinc-400">
            For my Bachelor thesis, I integrated YOLO-based object detection into the SweetPicker robotic system, enabling real-time vision and smarter automation for industrial robotics.
          </p>
        </div>
      </div>
      {/* Skills Grid */}
      <div className="flex-1">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 h-full flex flex-col">
          <h3 className="text-zinc-200 text-base font-semibold mb-4 tracking-wide uppercase">
            Key Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-lg bg-zinc-800/60 px-3 py-1 text-zinc-100 text-sm font-medium border border-zinc-700 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}