import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { projects } from '../data/projects.js';

export default function Shelf() {
  // With a single project, give it the whole row instead of leaving empty slots.
  const featured = projects.length === 1;

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 lg:px-10">
      <div>
        <p className="font-hand text-3xl text-orange-600">the shelf</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Things I've built <span className="font-hand text-3xl font-normal text-muted">(so far)</span>
        </h2>
      </div>

      <div className={featured ? 'mt-12' : 'mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
        {projects.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} featured={featured} />
        ))}
      </div>
    </section>
  );
}

// An index card that tilts gently toward the pointer, with a rubber-stamp status.
function TiltCard({ project: p, index, featured }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [3, -3]), { stiffness: 200, damping: 26 });
  const ry = useSpring(useTransform(px, [0, 1], [-3, 3]), { stiffness: 200, damping: 26 });

  const internal = p.href.startsWith('#');

  function onMove(e) {
    if (e.pointerType !== 'mouse') return;
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
      className={`group relative flex flex-col rounded-3xl border border-line bg-card p-5 no-underline shadow-sm transition-shadow hover:shadow-2xl hover:shadow-orange-900/15 ${featured ? 'md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10 md:p-6' : ''}`}
    >
      <span className="absolute top-6 right-6 z-10 -rotate-6 rounded border-2 border-orange-500 bg-card/90 px-2 py-0.5 font-hand text-base tracking-wide text-orange-600 uppercase">
        {p.status}
      </span>

      <div className={`relative flex items-end overflow-hidden rounded-2xl bg-linear-to-br p-5 ${p.accent} ${featured ? 'h-44 md:h-72' : 'h-44'}`}>
        <span aria-hidden className="absolute -right-6 -bottom-10 text-[10rem] leading-none font-semibold text-white/20 select-none md:text-[14rem]">{p.name[0]}</span>
        <span aria-hidden className="font-hand text-xl text-white">0{index + 1} / project</span>
      </div>

      <div>
        <h3 className="mt-6 text-2xl font-semibold text-ink md:mt-0 md:text-3xl">{p.name}</h3>
        <p className="mt-2 text-sm text-muted md:text-base">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-xs text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
