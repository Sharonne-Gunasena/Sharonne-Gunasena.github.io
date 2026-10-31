// The bar spans the full width so content never scrolls past its edges;
// a soft fade underneath replaces a hard divider.
export default function Nav() {
  return (
    <>
      {/* Skip link for keyboard users. It focuses <main> directly, because a #main href would change the hash route. */}
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only z-50 rounded-full bg-card px-4 py-2 text-sm font-medium text-ink shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-paper/80 after:to-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-10">
        <a href="#/" className="flex items-center gap-3 no-underline">
          <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-orange-700 to-red-600 font-hand text-xl font-semibold text-white">SG</span>
          <span className="hidden font-semibold tracking-tight text-ink sm:inline">Sharonne Gunasena</span>
        </a>
        <nav className="flex items-center gap-2 text-sm">
          <NavLink href="#/alma">Alma</NavLink>
          <NavLink href="https://github.com/Sharonne-Gunasena" external>
            GitHub
          </NavLink>
        </nav>
      </div>
    </header>
    </>
  );
}

// py-3 px-2 gives a 44px touch target without changing how the link looks.
function NavLink({ href, external, children }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="relative px-2 py-3 text-muted no-underline transition-colors after:absolute after:inset-x-2 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform hover:text-ink hover:after:scale-x-100"
    >
      {children}
    </a>
  );
}
