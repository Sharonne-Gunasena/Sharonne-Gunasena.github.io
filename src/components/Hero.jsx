import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Magnetic from './Magnetic.jsx';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FIRST_HOUR = 8;
const HOURS = 10; // the board runs from 08:00 to 18:00
const BOARD_HEIGHT = 440;
const FADE = 0.06; // how much scroll it takes for a note to land

// Fixed commitments from the timetable.
const CLASSES = [
  { day: 0, start: 9, end: 11, label: 'COMP10070 lecture' },
  { day: 1, start: 13, end: 14, label: 'Tutorial' },
  { day: 2, start: 10, end: 12, label: 'COMP10110 lab' },
  { day: 3, start: 9, end: 10, label: 'Lecture' },
  { day: 4, start: 14, end: 16, label: 'Project lab' },
];

// Study sessions the planner pins to the board, one note at a time as you scroll.
const NOTES = [
  { day: 0, start: 13, end: 14, label: 'Review: proofs', at: 0.12, tilt: -2 },
  { day: 1, start: 9, end: 10, label: 'Flashcards: sorting', at: 0.26, tilt: 1.5 },
  { day: 2, start: 14, end: 15, label: 'Practice: proofs', at: 0.4, tilt: -1 },
  { day: 3, start: 13, end: 14, label: 'Study guide', at: 0.54, tilt: 2 },
  { day: 4, start: 10, end: 11, label: 'Mock questions', at: 0.68, tilt: -1.5 },
];

const TITLE_WORDS = ['Study', 'plans', 'that', 'fit', 'your'];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const wordIn = { hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

const position = ({ start, end }) => ({
  top: `${((start - FIRST_HOUR) / HOURS) * 100}%`,
  height: `${((end - start) / HOURS) * 100}%`,
});

export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setWide(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // On desktop the board stays pinned while you scroll. Elsewhere, or for reduced motion, it shows the finished plan.
  const pinned = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const settled = useMotionValue(1);
  const progress = pinned ? scrollYProgress : settled;

  return (
    <section ref={ref} className={pinned ? 'relative h-[260vh]' : 'relative'}>
      <div className={`${pinned ? 'sticky top-0 h-screen' : 'py-16'} flex items-center`}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <motion.p
              className="font-hand text-2xl text-orange-600"
              initial={{ opacity: 0, rotate: -4 }}
              animate={ready ? { opacity: 1, rotate: -2 } : {}}
              transition={{ duration: 0.6 }}
            >
              meet Alma, my study planner
            </motion.p>

            <motion.h1 variants={stagger} initial="hidden" animate={ready ? 'show' : 'hidden'} className="mt-3 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl">
              {TITLE_WORDS.map((w) => (
                <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-top">
                  <motion.span variants={wordIn} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="relative inline-block overflow-hidden pb-1 align-top">
                <motion.span variants={wordIn} className="inline-block text-orange-600">
                  real week.
                </motion.span>
                <UnderlineScribble ready={ready} />
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-lg text-muted"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Alma fits study sessions into the gaps around your classes and deadlines, then moves them when life gets in the way.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.6 }}>
              <Magnetic>
                <a
                  href="#/alma"
                  className="inline-block rounded-full bg-linear-to-br from-orange-500 to-red-500 px-6 py-3 font-medium text-white no-underline shadow-lg shadow-orange-500/30 hover:from-orange-400 hover:to-red-400"
                >
                  See the case study
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://sharonne-gunasena.github.io/Alma/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-line bg-white px-6 py-3 font-medium text-ink no-underline hover:border-orange-300"
                >
                  Try Alma
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <Board progress={progress} />
        </div>
      </div>
    </section>
  );
}

// A marker stroke that draws itself under "real week."
function UnderlineScribble({ ready }) {
  return (
    <svg className="pointer-events-none absolute -bottom-1 left-0 w-full text-sky-400" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M4 14 C 80 4 200 2 296 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: ready ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.9, ease: 'easeOut' }}
      />
    </svg>
  );
}

function Board({ progress }) {
  const [placed, setPlaced] = useState(0);
  useMotionValueEvent(progress, 'change', (value) => {
    setPlaced(NOTES.filter((n) => value >= n.at).length);
  });

  return (
    <div className="relative rounded-3xl border border-line bg-white p-4 shadow-xl shadow-orange-900/5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-hand text-2xl">this week</p>
        <p className="font-hand text-lg text-muted tabular-nums">notes placed: {placed}/{NOTES.length}</p>
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

              {NOTES.filter((n) => n.day === di).map((n) => (
                <Note key={n.label} progress={progress} at={n.at} tilt={n.tilt} style={position(n)}>
                  {n.label}
                </Note>
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
          <span className="size-3 rounded bg-linear-to-br from-orange-400 to-red-500" /> Study notes
        </span>
      </div>
    </div>
  );
}

// A study session pinned to the board: it lands with a small bounce, slightly tilted, with a strip of tape.
function Note({ progress, at, tilt, style, children }) {
  const opacity = useTransform(progress, [at, at + FADE], [0, 1]);
  const y = useTransform(progress, [at, at + FADE], [-14, 0]);

  return (
    <motion.div
      className="absolute inset-x-1 rounded-lg bg-linear-to-br from-orange-400 to-red-500 px-2 py-1 text-[11px] leading-tight font-medium text-white shadow-md shadow-orange-500/30"
      style={{ ...style, opacity, y, rotate: tilt }}
    >
      <span className="pointer-events-none absolute -top-2 left-1/2 h-3.5 w-10 -translate-x-1/2 -rotate-3 rounded-sm bg-sky-200/80" />
      <span className="block truncate">{children}</span>
    </motion.div>
  );
}
