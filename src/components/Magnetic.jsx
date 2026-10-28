import { useRef } from 'react';
import { motion, useSpring } from 'motion/react';

// Nudges its child toward the pointer, so buttons feel physical.
export default function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} className="inline-block" style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.span>
  );
}
