export default function Nav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 lg:px-10">
      <a href="#/" className="font-semibold tracking-tight text-ink no-underline">
        Sharonne Gunasena
      </a>
      <nav className="flex items-center gap-5 text-sm text-muted">
        <a href="#/alma" className="no-underline hover:text-ink">
          Alma
        </a>
        <a href="https://github.com/Sharonne-Gunasena" target="_blank" rel="noreferrer" className="no-underline hover:text-ink">
          GitHub
        </a>
      </nav>
    </header>
  );
}
