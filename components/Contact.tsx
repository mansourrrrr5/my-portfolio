"use client";

export default function Contact() {
  const email = "aziz@email.com";

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    alert("Email copied!");
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <p className="text-zinc-300">
        Reach out and let’s build something together.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={copy}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
        >
          Copy my Email
        </button>

        <a
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900"
          href={`mailto:${email}`}
        >
          Send Email
        </a>
      </div>
    </div>
  );
}
