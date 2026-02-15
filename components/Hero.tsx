"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-between bg-grid">

      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 bg-blue-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 bg-purple-600/30 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-400">
            Hi there! Let’s build together!
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            I'm{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aziz
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            I’m a passionate Software Engineer focused on building
            impactful digital systems and AI-driven applications.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800 transition"
            >
              Git
            </a>
            <a
              href="#"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800 transition"
            >
              Tw
            </a>
            <a
              href="#"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800 transition"
            >
              In
            </a>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl border border-purple-500 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500/10 transition">
              Grab my resume
            </button>

            <button className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition">
              Check out my work →
            </button>
          </div>
        </div>

                <div className="relative flex justify-center items-center">

                {/* Blue glow background */}
                <div className="absolute h-[420px] w-[420px] rounded-full 
                                bg-blue-500/30 blur-[120px]" />

                {/* Purple subtle accent */}
                <div className="absolute top-10 h-[350px] w-[350px] rounded-full 
                                bg-purple-500/20 blur-[140px]" />

                {/* Bottom fade mask */}
                <div className="absolute bottom-0 h-32 w-full 
                                bg-gradient-to-t from-zinc-950 to-transparent" />

                {/* Image */}
                <Image
                    src="/Untitled.jpeg"
                    alt="Aziz Avatar"
                    width={350}
                    height={350}
                    className="relative z-10 object-contain"
                />
                </div>


      </div>
    </section>
  );
}
