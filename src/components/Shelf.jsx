import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { comingSoon, projects } from '../data/projects.js';

export default function Shelf() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 lg:px-10">
      <div>
        <p className="font-hand text-2xl text-orange-600">the shelf</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Things I've built <span className="font-hand text-2xl font-normal text-muted">(so far)</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} />
        ))}
        <div className="flex min-h-72 items-center justify-center rounded-3xl border-2 border-dashed border-line p-8 text-center">
          <p className="font-hand text-2xl text-muted">{comingSoon}</p>
        </div>
      </div>
    </section>
  );
}

// An index card that tilts toward the pointer, with a rubber-stamp status.
function TiltCard({ project: p, index }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  const internal = p.href.startsWith('#');

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.a
      href={p.href}
      {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex flex-col rounded-3xl border border-line bg-white p-5 no-underline shadow-sm transition-shadow hover:shadow-2xl hover:shadow-orange-900/15"
    >
      <span className="absolute top-6 right-6 z-10 -rotate-6 rounded border-2 border-orange-500 bg-white/90 px-2 py-0.5 font-hand text-sm tracking-wide text-orange-600 uppercase">
        {p.status}
      </span>

      <div className={`relative flex h-44 items-end overflow-hidden rounded-2xl bg-linear-to-br p-5 ${p.accent}`}>
        <span className="absolute -right-6 -bottom-10 text-[10rem] leading-none font-semibold text-white/20 select-none">{p.name[0]}</span>
        <span className="font-hand text-lg text-white/90">0{index + 1} / project</span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-ink">{p.name}</h3>
      <p className="mt-2 text-sm text-muted">{p.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-xs text-sky-800">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
