import { CONTACT_EMAIL, GITHUB_URL } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="mt-24 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 lg:px-10">
        <p className="font-hand text-3xl text-orange-600">thanks for scrolling ↓</p>
        <p aria-hidden className="mt-2 text-[clamp(3rem,15vw,12rem)] leading-none font-semibold tracking-tighter text-ink select-none">
          Sharonne
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pt-8 text-sm text-muted lg:px-10">
        <span>© {new Date().getFullYear()} Sharonne Gunasena · React, Vite, Tailwind, Motion</span>
        <nav aria-label="Contact" className="flex items-center gap-2">
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center px-2 text-ink no-underline hover:text-orange-700">
              Email
            </a>
          )}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center px-2 text-ink no-underline hover:text-orange-700">
            GitHub
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="ml-2 min-h-11 rounded-full border border-line bg-card px-4 py-2 text-ink hover:border-orange-300"
          >
            back to top ↑
          </button>
        </nav>
      </div>
      {/* Privacy, in one line: true as long as the site adds no analytics, cookies or forms. */}
      <p className="mx-auto max-w-6xl px-5 pt-4 pb-8 text-xs text-muted lg:px-10">
        This site uses no cookies, analytics or tracking, and collects no personal data. It's hosted on GitHub Pages, which may log your IP
        address. The Alma demo keeps its sample data in your own browser.
      </p>
    </footer>
  );
}
