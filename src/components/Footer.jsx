export default function Footer() {
  return (
    <footer className="mt-24 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 lg:px-10">
        <p className="font-hand text-3xl text-orange-600">thanks for scrolling ↓</p>
        <p className="mt-2 text-[clamp(3rem,15vw,12rem)] leading-none font-semibold tracking-tighter text-ink select-none">Sharonne</p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted lg:px-10">
        <span>© {new Date().getFullYear()} Sharonne Gunasena · React, Vite, Tailwind, Motion</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          className="min-h-11 rounded-full border border-line bg-card px-4 py-2 text-ink hover:border-orange-300"
        >
          back to top ↑
        </button>
      </div>
    </footer>
  );
}
