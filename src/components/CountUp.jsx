import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

// Counts up to a number once it scrolls into view.
export default function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    const run = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => run.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{n}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
}
