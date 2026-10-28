import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';

const SEEN_KEY = 'portfolio-intro-seen';

// The intro plays once per browser session, and never for people who ask for less motion.
export function shouldIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
}

// A pen loop draws itself while the count runs to 100%, then the paper lifts away.
export default function Intro({ onDone }) {
  const draw = useMotionValue(0);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const run = animate(0, 100, {
      duration: 1.8,
      ease: 'easeInOut',
      onUpdate: (v) => {
        draw.set(v / 100);
        setCount(Math.round(v));
      },
      onComplete: () => {
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          /* storage blocked: the intro may replay, which is harmless */
        }
        setLeaving(true);
      },
    });
    return () => run.stop();
  }, [draw]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-paper"
      animate={{ y: leaving ? '-100%' : '0%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onDone()}
    >
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 200 120" className="w-64 text-orange-500" aria-hidden>
          <motion.path
            d="M100 60 C140 10 190 40 170 70 S60 110 40 70 S60 10 100 30 S150 90 120 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={draw}
          />
        </svg>
        <p className="font-hand text-2xl tabular-nums">{count}%</p>
      </div>
    </motion.div>
  );
}
