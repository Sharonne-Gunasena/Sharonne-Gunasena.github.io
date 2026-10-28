import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// A small ring that follows the pointer and swells over links and buttons.
// Only shown on devices with a fine pointer, so touch screens are unaffected.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40 });
  const sy = useSpring(y, { stiffness: 600, damping: 40 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => setHover(Boolean(e.target.closest('a, button')));
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] -mt-3 -ml-3 size-6 rounded-full border-2 border-orange-500 mix-blend-multiply"
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 2.2 : 1, backgroundColor: hover ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0)' }}
      transition={{ duration: 0.2 }}
    />
  );
}
