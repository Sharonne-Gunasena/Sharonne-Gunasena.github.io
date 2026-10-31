import { motion, useReducedMotion } from 'motion/react';

// A slow ticker of what I work with. Still for people who ask for less motion.
// The moving copy is hidden from screen readers; a plain list stands in for it.
export default function Marquee({ items }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-[#1f1411] py-5 text-[#fffaf6]">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <motion.div
        aria-hidden
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
