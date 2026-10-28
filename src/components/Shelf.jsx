import { comingSoon, projects } from '../data/projects.js';

export default function Shelf() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-orange-600">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Things I've built</h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
        <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-line p-8 text-center text-muted">{comingSoon}</div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const internal = p.href.startsWith('#');
  return (
    <a
      href={p.href}
      {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
      className="group flex flex-col rounded-3xl border border-line bg-white p-6 no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10"
    >
      <div className={`h-32 rounded-2xl bg-linear-to-br ${p.accent}`} />
      <div className="mt-5 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">{p.status}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-xs text-sky-800">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
