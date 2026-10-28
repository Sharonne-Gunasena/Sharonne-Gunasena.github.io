import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FIRST_HOUR = 8;
const HOURS = 10; // the board runs from 08:00 to 18:00
const BOARD_HEIGHT = 440;
const FADE = 0.06; // how much scroll it takes for a study block to fade in

// Fixed commitments from the timetable.
const CLASSES = [
  { day: 0, start: 9, end: 11, label: 'COMP10070 lecture' },
  { day: 1, start: 13, end: 14, label: 'Tutorial' },
  { day: 2, start: 10, end: 12, label: 'COMP10110 lab' },
  { day: 3, start: 9, end: 10, label: 'Lecture' },
  { day: 4, start: 14, end: 16, label: 'Project lab' },
];

// Study sessions the planner places into the gaps, one by one as you scroll.
const STUDY = [
  { day: 0, start: 13, end: 14, label: 'Review: proofs', at: 0.12 },
  { day: 1, start: 9, end: 10, label: 'Flashcards: sorting', at: 0.26 },
  { day: 2, start: 14, end: 15, label: 'Practice: proofs', at: 0.4 },
  { day: 3, start: 13, end: 14, label: 'Study guide', at: 0.54 },
  { day: 4, start: 10, end: 11, label: 'Mock questions', at: 0.68 },
];

const position = ({ start, end }) => ({
  top: `${((start - FIRST_HOUR) / HOURS) * 100}%`,
  height: `${((end - start) / HOURS) * 100}%`,
});

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setWide(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // The board is pinned while you scroll on desktop. Everywhere else, or for
  // reduced motion, it shows the finished plan straight away.
  const pinned = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const settled = useMotionValue(1);
  const progress = pinned ? scrollYProgress : settled;

  return (
    <section ref={ref} className={pinned ? 'relative h-[260vh]' : 'relative'}>
      <div className={`${pinned ? 'sticky top-0 h-screen' : 'py-16'} flex items-center`}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold text-orange-600">Alma · study planner</p>
            <h1 className="mt-4 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">Study plans that fit your real week.</h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Alma fits study sessions into the gaps around your classes and deadlines, then moves them when life gets in the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#/alma"
                className="rounded-full bg-linear-to-br from-orange-500 to-red-500 px-5 py-2.5 font-medium text-white no-underline shadow-lg shadow-orange-500/30 hover:from-orange-400 hover:to-red-400"
              >
                See the case study
              </a>
              <a
                href="https://sharonne-gunasena.github.io/Alma/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line bg-white px-5 py-2.5 font-medium text-ink no-underline hover:border-orange-300"
              >
                Try Alma
              </a>
            </div>
          </div>

          <Board progress={progress} />
        </div>
      </div>
    </section>
  );
}

function Board({ progress }) {
  const [placed, setPlaced] = useState(0);
  useMotionValueEvent(progress, 'change', (value) => {
    setPlaced(STUDY.filter((s) => value >= s.at).length);
  });

  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-xl shadow-orange-900/5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">This week</p>
        <p className="text-xs text-muted tabular-nums">Study blocks placed: {placed} of {STUDY.length}</p>
      </div>

      <div className="flex">
        <div className="relative w-10 shrink-0 text-[11px] text-muted" style={{ height: BOARD_HEIGHT }}>
          {Array.from({ length: HOURS }, (_, i) => (
            <span key={i} className="absolute -translate-y-1/2" style={{ top: `${(i / HOURS) * 100}%` }}>
              {String(FIRST_HOUR + i).padStart(2, '0')}
            </span>
          ))}
        </div>

        {DAYS.map((day, di) => (
          <div key={day} className="relative flex-1 border-l border-line">
            <p className="absolute -top-6 left-0 right-0 text-center text-xs font-medium text-muted">{day}</p>
            <div className="relative" style={{ height: BOARD_HEIGHT }}>
              {Array.from({ length: HOURS }, (_, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-line/70" style={{ top: `${(i / HOURS) * 100}%` }} />
              ))}

              {CLASSES.filter((c) => c.day === di).map((c) => (
                <div
                  key={c.label + c.start}
                  className="absolute inset-x-1 overflow-hidden rounded-lg border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] leading-tight font-medium text-sky-900"
                  style={position(c)}
                >
                  {c.label}
                </div>
              ))}

              {STUDY.filter((s) => s.day === di).map((s) => (
                <PlacedBlock key={s.label} progress={progress} at={s.at} style={position(s)}>
                  {s.label}
                </PlacedBlock>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded bg-sky-100 ring-1 ring-sky-300" /> Classes
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded bg-linear-to-br from-orange-400 to-red-500" /> Study sessions
        </span>
      </div>
    </div>
  );
}

function PlacedBlock({ progress, at, style, children }) {
  const opacity = useTransform(progress, [at, at + FADE], [0, 1]);
  const y = useTransform(progress, [at, at + FADE], [8, 0]);

  return (
    <motion.div
      className="absolute inset-x-1 overflow-hidden rounded-lg bg-linear-to-br from-orange-400 to-red-500 px-2 py-1 text-[11px] leading-tight font-medium text-white shadow-md shadow-orange-500/30"
      style={{ ...style, opacity, y }}
    >
      {children}
    </motion.div>
  );
}
