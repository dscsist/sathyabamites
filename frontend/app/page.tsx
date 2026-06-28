import Link from "next/link";

export default function Home() {
  return (
    <main className="dashboard-shell grid min-h-screen place-items-center p-4">
      <section className="glass-panel neon-border w-full max-w-md rounded-[1.25rem] p-6 text-center">
        <div className="brand-mark mx-auto grid h-14 w-14 place-items-center rounded-xl text-lg font-black text-white">
          S
        </div>
        <h1 className="mt-5 text-2xl font-bold text-white">Sathyabamites</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">You are signed out of the dashboard session.</p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-violet-500"
        >
          Open Dashboard
        </Link>
      </section>
    </main>
  );
}
