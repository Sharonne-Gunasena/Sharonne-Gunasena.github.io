import { motion, useReducedMotion } from 'motion/react';

// A slow ticker of things I care about. Still for people who ask for less motion.
export default function Marquee({ items }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5 text-paper" aria-hidden>
      <motion.div
        className="flex w-max whitespace-nowrap text-2xl font-semibold tracking-tight"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 pr-10">
            {item}
            <span className="text-orange-400">✶</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
